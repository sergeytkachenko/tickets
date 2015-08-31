<?php
namespace Multiple\Frontend\Controllers;

use EventSeats;
use Phalcon\Mvc\View;

class MapsController extends ControllerBase
{

    public function viewAction () {
        $this->view->setRenderLevel(View::LEVEL_ACTION_VIEW);
        $this->view->map = file_get_contents(PUBLIC_PATH. '/map.map');
    }

    /**
     * @param $eventId
     * @return array
     */
    public function availableSeatsAction ($eventId) {
        $this->setJsonResponse();

        $minDate = new \DateTime('-'.ControllerBase::RESERVATION_TIME.' minute');
        $eventSeatsFree = EventSeats::find(array(
            "is_purchased = 0 AND event_id = :eventId:
                AND (
                    last_reservation IS NULL
                    OR last_reservation < :minDate:
                    OR last_reservation_session_id = :sessionId:
                )",
            "bind" => array (
                "eventId" => $eventId,
                "minDate" => $minDate->format("Y-m-d H:i:s"),
                "sessionId" => session_id()
            )
        ));

        $eventSeatsBusy = EventSeats::find(array(
            "event_id = :eventId:
                AND ((
                    last_reservation IS NOT NULL
                    AND last_reservation_session_id != :sessionId:
                    AND last_reservation > :minDate:
                ) OR is_purchased = 1)",
            "bind" => array (
                "eventId" => $eventId,
                "minDate" => $minDate->format("Y-m-d H:i:s"),
                "sessionId" => session_id()
            )
        ));
        $seats = array();
        foreach($eventSeatsFree as $eventSeat) {
            array_push($seats, array(
                "id" => $eventSeat->seat_id,
                "price" => $eventSeat->getPrice(),
                "title" => $eventSeat->Seats->title.", (".$eventSeat->getPrice()." грн.)",
                "free" => true
            ));
        }
        foreach($eventSeatsBusy as $eventSeat) {
            array_push($seats, array(
                "id" => $eventSeat->seat_id,
                "price" => $eventSeat->getPrice(),
                "title" => $eventSeat->Seats->title.", (".$eventSeat->getPrice()." грн.)",
                "free" => false
            ));
        }
        return array(
            "seats" => $seats,
            "success" => true
        );
    }


    public function getSelfPurchasedAction ($eventId) {
        $this->setJsonResponse();

        $minDate = new \DateTime('-'.ControllerBase::RESERVATION_TIME.' minute');
        $eventSeatsPurchased = EventSeats::find(array(
            "is_purchased = 0 AND event_id = :eventId:
                AND (last_reservation > :minDate: AND last_reservation_session_id = :sessionId:)",
            "bind" => array (
                "eventId" => $eventId,
                "minDate" => $minDate->format("Y-m-d H:i:s"),
                "sessionId" => session_id()
            )
        ));
        $seats = array();
        foreach($eventSeatsPurchased as $eventSeat) {
            array_push($seats, array(
                "id" => $eventSeat->seat_id
            ));
        }

        return array(
            "seats" => $seats,
            "success" => true
        );
    }

}

