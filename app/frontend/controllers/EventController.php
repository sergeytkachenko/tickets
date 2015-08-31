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

    /**
     * @param $eventId
     * @return mixed
     */
    public function getEventPricesAction ($eventId) {
        $this->setJsonResponse();

        $event = Events::findFirst($eventId);

        $eventPrices =  EventPrices::find(array(
            'representation_id = :representationId:',
            'bind' => array(
                'representationId' => $event->Representation->id
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

