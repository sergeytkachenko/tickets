<?php
namespace Multiple\Frontend\Controllers;

use Events;
use Representations;

class RepresentationController extends ControllerBase {

    public function listAction() {
        $representations = Representations::find('is_active = 1');
        $this->view->setVar('representations', $representations);
    }

    public function viewAction($representationId) {
        $events = Events::find(array(
            'representation_id = :representationId: AND date >= NOW()',
            'bind' => array(
                'representationId' => $representationId
            )
        ));
        $this->view->setVar('representation', Representations::findFirst($representationId));
        $this->view->setVar('events', $events);
    }
}

