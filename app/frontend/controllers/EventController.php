<?php
namespace Multiple\Frontend\Controllers;

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
}

