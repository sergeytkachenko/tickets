<?php
namespace Multiple\Frontend\Controllers;

use Config;
use EventSeats;
use LiqPay;
use OrderHistory;
use Orders;
use Phalcon\Mvc\View;

class OrderController extends ControllerBase
{
	public function previewAction($eventId)
	{
		$totalSum = 0;
		$eventSeats = $this->getSelfEventsSeats($eventId);

		foreach ($eventSeats as $eventSeat) {
			$totalSum += $eventSeat->price;
			$eventSeat->last_reservation = new \DateTime(); // 15 минут для покупки билета
			$eventSeat->last_reservation = $eventSeat->last_reservation->format('Y-m-d H:i:s');
			$eventSeat->save();
		}

		$this->view->setVar('eventSeats', $eventSeats);
		$this->view->setVar('totalSum', $totalSum);
		$this->view->setVar('eventId', $eventId);

	}

	public function prePaymentPaymasterAction($eventId)
	{
		$user = $this->session->get('user');
		if (!$user) {
			return;
		}

		$name = $user->name;
		$email = $user->email;
		$uidArray = array();

		$eventSeats = $this->getSelfEventsSeats($eventId);
		if (!$eventSeats) {
			die('Нет выбраных мест, или сессия истекла');
		}
		foreach ($eventSeats as $eventSeat) {
			$uid = LiqPay::gen_uuid();
			array_push($uidArray, $uid);
			$order = Orders::findFirst(array(
				'events_seat_id = :eventSeatId:',
				'bind' => array(
					'eventSeatId' => $eventSeat->id
				)
			));
			$order = $order ? $order : new Orders();
			$order->assign(array(
				"events_seat_id" => $eventSeat->id,
				"user_name" => $name,
				"user_email" => $email,
				"user_phone" => null,
				"date" => date("Y-m-d H:i:s"),
				"uid" => $uid,
				"success" => 1
			));

			if ($order->save()) {

			} else {
				debug($order->getMessages());
			}
		}
		$this->response->redirect("/order/paymentPaymaster/" . implode(",", $uidArray));
	}

	public function paymentPaymasterAction($uids)
	{
		$user = $this->session->get('user');
		if (!$user) {
			return;
		};
		$uidList = explode(",", $uids);
		$orders = array();
		foreach ($uidList as $uid) {
			$order = Orders::findFirst(array(
				'uid = :uid: AND success = 1',
				'bind' => array(
					'uid' => $uid
				)
			));
			if (!$order) {
				continue;
			}
			$order->assign(array(
				"success" => true
			));

			if ($order->save()) {
				$orders[] = $order;
				$eventSeat = EventSeats::findFirst($order->events_seat_id);
				$eventSeat->last_reservation = NULL;
				$eventSeat->last_reservation_session_id = NULL;
				$eventSeat->is_purchased = 1;
				$eventSeat->save();

			} else {
				debug($order->getMessages());
			}
		}

		$orderHistory = OrderHistory::findFirst(array(
			"uids = :uids: AND user_id = :userId:",
			'bind' => array(
				'uids' => $uids,
				'userId' => $user->id
			)
		));
		$orderHistory = $orderHistory ? $orderHistory : new OrderHistory();
		if (!$orderHistory->save(array(
			'datetime' => date('Y-m-d H:i:s'),
			'uids' => $uids,
			'user_id' => $user->id
		))
		) {
			debug($orderHistory->getMessages());
		}
		$this->view->setVar('orders', $orders);
	}

	public function historyAction()
	{
		$user = $this->session->get('user');
		if (!$user) {
			return;
		};

		$orderHistories = OrderHistory::find(array(
			"user_id = :userId:",
			'bind' => array(
				'userId' => $user->id
			)
		));

		$this->view->setVar('orderHistories', $orderHistories);
	}

	// сюда должно редиректить после успешной оплаты
	public function paymentAction($eventId)
	{
		if (!$this->request->isPost()) {
			die('Вы попали на страницу ошибочным образом');
		}

		$name = $this->request->get('name');
		$email = $this->request->get('email');
		$phone = $this->request->get('phone');
		$uidArray = array();
		$totalSum = 0;

		if (!empty($name) and !empty($email) and !empty($phone)) {
			$eventSeats = $this->getSelfEventsSeats($eventId);
			foreach ($eventSeats as $eventSeat) {
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
				if ($order->save()) {
					$this->view->setVar('success', true);
					$this->view->setVar('email', $email);
					$this->view->setVar('name', $name);
				}
			}
		}

		// Генерируем кнопку
		$liqpay = new LiqPay($this->publicKey, $this->privateKey);
		$serverUrl = 'http://' . $_SERVER['HTTP_HOST'] . '/order/serverSuccess/?uidList=' . implode(",", $uidArray);
		$resultUrl = 'http://' . $_SERVER['HTTP_HOST'] . '/order/success/';
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

	public function serverSuccessAction()
	{
		// server success
		$uidList = $this->request->get('uidList');
		$uidList = explode(",", $uidList);

		$email = null;
		foreach ($uidList as $uid) {
			$order = Orders::findFirst(array(
				'uid = :uid:',
				'bind' => array('uid' => $uid)
			));
			$order->success = 1;
			$order->save();

			$eventSeat = EventSeats::findFirst($order->events_seat_id);
			$eventSeat->last_reservation = NULL;
			$eventSeat->last_reservation_session_id = NULL;
			$eventSeat->is_purchased = 1;
			$eventSeat->save();

			$email = $order->user_email;
		}

		$configEmail = @Config::findFirst('key="email"')->value;
		$emails = array($email, $configEmail);
		$mail = $this->getDI()->get('mail');
		$mail->send($emails, 'Покупка билетов онлайн', 'order', array(
			'email' => $email,
			'datetime' => date("Y-m-d H:i:s"),
			'orders' => Orders::find()->filter(function ($item) use ($uidList) {
				if (in_array($item->uid, $uidList)) {
					return $item;
				}
			})
		));
	}

	public function successAction()
	{
		// client success
	}

	public function printAction($uid)
	{
		$this->view->setRenderLevel(View::LEVEL_ACTION_VIEW);
		$order = Orders::findFirst(array(
			'uid = :uid: AND success = 1',
			'bind' => array(
				'uid' => $uid
			)
		));
		if (!$order) {
			$this->view->setVar('error', 'Билет ' . $uid . ' не найден...');
			return;
		}
		$eventSeats = EventSeats::findFirst($order->events_seat_id);
		$event = $eventSeats->Events;
		$seat = $eventSeats->Seats;

		$this->view->setVar('event', $event);
		$this->view->setVar('seat', $seat);
		$this->view->setVar('order', $order);

	}

	public function printByUidAction()
	{

	}

	public function cancelAction()
	{
		$uid = $this->request->get("uid");
		if (!$uid) {
			return;
		}
		$order = Orders::findFirst(array(
			'uid = :uid: AND success = 1',
			'bind' => array(
				'uid' => $uid
			)
		));
		if (!$order) {
			$this->view->setVar('error', 'Билет ' . $uid . ' не найден в системе!');
			return;
		}
		$eventSeat = $order->EventSeats;
		$eventSeat->is_purchased = 0;
		$eventSeat->save();
		$order->success = 0;
		$order->save();

		$this->view->setVar('success', 'Билет ' . $uid . ' успешно отменен!');
	}

	private function getSelfEventsSeats($eventId)
	{
		$minDate = new \DateTime('-' . ControllerBase::RESERVATION_TIME . ' minute');
		return EventSeats::find(array(
			"is_purchased = 0 AND event_id = :eventId:
                AND (last_reservation > :minDate: AND last_reservation_session_id = :sessionId:)",
			"bind" => array(
				"eventId" => $eventId,
				"minDate" => $minDate->format("Y-m-d H:i:s"),
				"sessionId" => session_id()
			)
		));
	}

}

