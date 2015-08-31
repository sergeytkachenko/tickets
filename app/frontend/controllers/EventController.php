<?php
namespace Multiple\Frontend\Controllers;

use EventPrices;
use Events;
use SeatColorsPrice;

class EventController extends ControllerBase {

    public function listAction() {
        $events = Events::find();
        $this->view->setVar('events', $events);
    }

    /**
     * @param $eventId
     */
    public function viewAction($eventId) {
        $event = Events::findFirst($eventId);
        $colors = SeatColorsPrice::find(array(
            'representation_id = :representationId:',
            'bind' => array(
                'representationId' => $event->Representation->id
            )
        ));
        $this->view->setVar('event', $event);
        $this->view->setVar('colors', $colors);
    }

    public function getEventPricesAction ($eventId) {
        $this->setJsonResponse();

        $eventPrices =  EventPrices::find(array(
            'event_id = :eventId:',
            'bind' => array(
                'eventId' => $eventId
            )
        ));

        return $eventPrices->filter(function ($eventPrice) {
            $hex = $eventPrice->SeatColors->hex;
            $eventPrice = $eventPrice->toArray();
            $eventPrice['hex'] = $hex;

            return $eventPrice;
        });
    }
}

