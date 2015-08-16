<?php
namespace Multiple\Frontend\Controllers;

use EventSeats;
use LiqPay;
use Orders;
use Phalcon\Mvc\View;

class OrderController extends ControllerBase
{
    public function previewAction ($eventId) {
        $totalSum = 0;
        $eventSeats = $this->getSelfEventsSeats($eventId);

        foreach($eventSeats as $eventSeat) {
            $totalSum += $eventSeat->price;
            $eventSeat->last_reservation = new \DateTime(); // 15 минут для покупки билета
            $eventSeat->last_reservation = $eventSeat->last_reservation->format('Y-m-d H:i:s');
            $eventSeat->save();
        }

        $this->view->setVar('eventSeats', $eventSeats);
        $this->view->setVar('totalSum', $totalSum);
        $this->view->setVar('eventId', $eventId);

    }

    // сюда должно редиректить после успешной оплаты
    public function paymentAction ($eventId) {
        if (!$this->request->isPost()) {
            die('Вы попали на страницу ошибочным образом');
        }

        $name = $this->request->get('name');
        $email = $this->request->get('email');
        $phone = $this->request->get('phone');
        $uidArray = array();
        $totalSum = 0;

        if(!empty($name) and !empty($email) and !empty($phone)) {
            $eventSeats = $this->getSelfEventsSeats($eventId);
            foreach($eventSeats as $eventSeat) {
                $uid = LiqPay::gen_uuid();
                array_push($uidArray, $uid);
                $totalSum += $eventSeat->price;

                $order = new Orders();
                $order->assign(array(
                    "events_seat_id" => $eventSeat->id,
                    "user_name" => $name,
                    "user_email" => $email,
                    "user_phone" => $phone,
                    "date" => date("Y-m-d H:i:s"),
                    "uid" => $uid
                ));
                if($order->save()) {
                    $this->view->setVar('success', true);
                    $this->view->setVar('email', $email);
                    $this->view->setVar('name', $name);
                }
            }
        }
        $liqpay = new LiqPay($this->publicKey, $this->privateKey);
        $serverUrl = 'http://'.$_SERVER['HTTP_HOST'].'/order/serverSuccess/?uidList=' . implode(",", $uidArray);
        $resultUrl = 'http://'.$_SERVER['HTTP_HOST'].'/order/success/';
        $html = $liqpay->cnb_form(array(
            'version' => 3,
            'public_key' => $this->publicKey,
            'amount' => $totalSum,
            'currency' => 'UAH',
            'order_id' => md5(http_build_query($uidArray)), // уникальное ID покупки
            'result_url' => $resultUrl,
            'server_url' => $serverUrl,
            'language' => 'ru',
            'sandbox' => 1,
            'description' => 'Покупка билета на представление в цирке'
        ));

        $this->view->setVar('html', $html);
    }

    public function serverSuccessAction() {
        // server success
        $uidList = $this->request->get('uidList');
        $uidList = explode(",", $uidList);

        $email = null;
        foreach($uidList as $uid) {
            $order = Orders::findFirst(array(
                'uid = :uid:',
                'bind' => array('uid'=> $uid)
            ));
            $order->success = 1;
            $order->save();

            $eventSeat = EventSeats::findFirst($order->events_seat_id);
            $eventSeat->is_purchased = 1;
            $eventSeat->save();

            $email = $order->user_email;
        }

        $mail = $this->getDI()->get('mail');
        $mail->send($email, 'Покупка билетов онлайн', 'order', array(
            'email' => $email,
            'datetime' => date("Y-m-d H:i:s"),
            'orders' => Orders::find()->filter(function ($item) use($uidList) {
                if (in_array($item->uid, $uidList)) {
                    return $item;
                }
            })
        ));
    }

    public function successAction() {
       // client success
    }

    private function getSelfEventsSeats ($eventId) {
        $minDate = new \DateTime('-'.ControllerBase::RESERVATION_TIME.' minute');
        return EventSeats::find(array(
            "is_purchased = 0 AND event_id = :eventId:
                AND (last_reservation > :minDate: AND last_reservation_session_id = :sessionId:)",
            "bind" => array (
                "eventId" => $eventId,
                "minDate" => $minDate->format("Y-m-d H:i:s"),
                "sessionId" => session_id()
            )
        ));
    }

}

