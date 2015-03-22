<?php

use Phalcon\Mvc\View;

class ServiceItemController extends ControllerBase
{

    public function listAction($serviceId=null) {
        $this->view->items  = ServiceItem::find("service_id = $serviceId and is_published=1");
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
    }

    public function viewAction($id=null) {
        $this->view->item  = ServiceItem::findFirst("id = $id");
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
    }

}

