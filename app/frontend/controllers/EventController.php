<?php
namespace Multiple\Frontend\Controllers;

use Events;

class EventController extends ControllerBase {

    public function listAction() {
        $events = Events::find();
        $this->view->setVar('events', $events);
    }

    public function viewAction($eventId) {
        $event = Events::findFirst($eventId);
        $this->view->setVar('event', $event);
    }
}

