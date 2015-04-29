<?php
namespace Multiple\Frontend\Controllers;

use EventSeats;
use Phalcon\Mvc\View;

class ReservationController extends ControllerBase
{
    // резервация места
    public function seatAction ($seatId) {
        $this->setJsonResponse();

        $eventId = $this->request->get("eventId");
        $minDate = new \DateTime('-'.ControllerBase::RESERVATION_TIME.' minute');
        $eventSeat = EventSeats::findFirst(array(
            "event_id = :eventId: AND seat_id = :seatId: AND is_purchased = 0
                AND (
                    (last_reservation > :minDate: AND last_reservation_session_id = :sessionId:)
                    OR last_reservation IS NULL
                )",
            "bind" => array (
                "eventId" => $eventId,
                "seatId" => $seatId,
                "minDate" => $minDate->format("Y-m-d H:i:s"),
                "sessionId" => session_id()
             )
        ));

        if(!$eventSeat) {
            return array(
                "success" => true,
                "error" => "Извините, данное место уже зарезервировано..."
            );
        }

        $eventSeat->last_reservation = date("Y-m-d H:i:s");
        $eventSeat->last_reservation_session_id = session_id();

        if($eventSeat->save()) {
            return array(
                "success" => true,
                "msg" => "Резервация произошла успешно"
            );
        } else {
            return array(
                "success" => true,
                "error" => implode(",", $eventSeat->getMessages())
            );
        }
    }

    // отмена резервации
    public function seatClearAction ($seatId) {
        $this->setJsonResponse();

        $eventId = $this->request->get("eventId");
        $eventSeat = EventSeats::findFirst(array(
            "event_id = :eventId:
             AND seat_id = :seatId:
             AND last_reservation_session_id = :sessionId:
             AND is_purchased = 0",
            "bind" => array (
                "eventId" => $eventId,
                "seatId" => $seatId,
                "sessionId" => session_id()
            )
        ));

        if(!$eventSeat) {
            return array(
                "success" => true,
                "error" => "нет такой резервации"
            );
        }

        $eventSeat->last_reservation = null;
        $eventSeat->last_reservation_session_id = null;
        $eventSeat->save();

        return array(
            "success" => true,
            "msg" => "резервация места № ".$seatId." отменена"
        );
    }

    // отмена резервации
    public function checkAction ($eventId) {
        $this->setJsonResponse();

        $idList = $this->request->get("idList");
        $minDate = new \DateTime('-'.ControllerBase::RESERVATION_TIME.' minute');
        $eventSeats = EventSeats::find(array(
            "seat_id IN (".$idList.")
                AND (
                    (last_reservation BETWEEN :minDate: AND :date: AND last_reservation_session_id = :sessionId:)
                    OR last_reservation IS NULL
                )
                AND is_purchased = 0
                AND event_id = :eventId:

            ",
            "bind" => array (
                'date' => date("Y-m-d H:i:s"),
                'minDate'=> $minDate->format("Y-m-d H:i:s"),
                "sessionId" => session_id(),
                "eventId" => $eventId
            )
        ));

        $idList = explode(",", $idList);
        if(count($eventSeats->toArray()) !== count($idList)) {
            foreach($eventSeats as $eventSeat) {
                unset($idList[$eventSeat->seat_id]);
            }

            return array(
                "success" => true,
                "error" => "Места ".implode(",", $idList)." были приобретены ранее..."
            );
        }

        return array(
            "success" => true,
            "msg" => "Все ок, сейчас будет перенаправление на страницу оплаты билетов..."
        );
    }

    // если есть резервация которой больше 15 минут, то обновляем ему страницу
    public function timeoutAction ($eventId) {
        $this->setJsonResponse();

        $minDate = new \DateTime('-'.ControllerBase::RESERVATION_TIME.' minute');
        $eventSeats = EventSeats::find(array(
            "event_id = :eventId: AND is_purchased = 0
                AND (
                    last_reservation < :minDate: AND last_reservation_session_id = :sessionId:
                )",
            "bind" => array (
                "eventId" => $eventId,
                "minDate" => $minDate->format("Y-m-d H:i:s"),
                "sessionId" => session_id()
            )
        ));
        if(count($eventSeats->toArray())) {
            foreach ($eventSeats as $eventSeat) {
                $eventSeat->last_reservation = null;
                $eventSeat->last_reservation_session_id = null;
                $eventSeat->save();
            }
            return array(
                "success" => true,
                "msg" => "Время ожидания истекло, сейчас будет перезагружена страница...",
                "href" => "/",
                "isTimeout" => true
            );
        }
    }
}

