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

    public function getPhotosAction ($serviceItemId) {
        $this->view->setRenderLevel(View::LEVEL_NO_RENDER);
        $data = ServiceItem::findFirst($serviceItemId)->ServiceItemImages->toArray();
        $this->response->setContentType('application/json', 'UTF-8');
        echo json_encode($data);
    }

    public function deleteAction($serviceItemId) {
        $this->view->setRenderLevel(View::LEVEL_NO_RENDER);
        $serviceItem = ServiceItem::findFirst($serviceItemId);
        $serviceItem->ServiceItemImages->delete();
        $serviceItem->ServiceItemVideos->delete();
        $serviceItem->ServiceItemComments->delete();
        $serviceItem->delete();

        $this->response->setContentType('application/json', 'UTF-8');
        echo json_encode(array(
            "success" => true
        ));
    }

    public function removeFromPlacementAction ($serviceItemId) {
        $this->view->setRenderLevel(View::LEVEL_NO_RENDER);
        $serviceItem = ServiceItem::findFirst($serviceItemId);
        $serviceItem->is_published = 0;
        $serviceItem->save();
        $this->response->setContentType('application/json', 'UTF-8');
        echo json_encode(array(
            "success" => true
        ));
    }

    public function placementAction ($serviceItemId) {
        $this->view->setRenderLevel(View::LEVEL_NO_RENDER);
        $serviceItem = ServiceItem::findFirst($serviceItemId);
        $serviceItem->is_published = 1;
        $serviceItem->save();
        $this->response->setContentType('application/json', 'UTF-8');
        echo json_encode(array(
            "success" => true
        ));
    }
}

