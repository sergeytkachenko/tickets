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
        $this->setJsonResponse();

        $data = ServiceItem::findFirst($serviceItemId)->ServiceItemImages->toArray();

        return $data;
    }

    public function deleteAction($serviceItemId) {
        $this->setJsonResponse();

        $this->view->setRenderLevel(View::LEVEL_NO_RENDER);
        $serviceItem = ServiceItem::findFirst($serviceItemId);
        $serviceItem->ServiceItemImages->delete();
        $serviceItem->ServiceItemVideos->delete();
        $serviceItem->ServiceItemComments->delete();
        $serviceItem->delete();


        return array(
            "success" => true
        );
    }

    public function removeFromPlacementAction ($serviceItemId) {
        $this->setJsonResponse();

        $this->view->setRenderLevel(View::LEVEL_NO_RENDER);
        $serviceItem = ServiceItem::findFirst($serviceItemId);
        $serviceItem->is_published = 0;
        $serviceItem->save();

        return array(
            "success" => true
        );
    }

    public function placementAction ($serviceItemId) {
        $this->setJsonResponse();

        $this->view->setRenderLevel(View::LEVEL_NO_RENDER);
        $serviceItem = ServiceItem::findFirst($serviceItemId);
        $serviceItem->is_published = 1;
        $serviceItem->save();

        return array(
            "success" => true
        );
    }

    public function getServiceItemAction ($serviceItemId) {
        $this->setJsonResponse();

        $this->view->setRenderLevel(View::LEVEL_NO_RENDER);
        $serviceItem = ServiceItem::findFirst($serviceItemId);

        return array(
            "success" => true,
            "serviceItem" => $serviceItem
        );
    }

    public function upAction ($serviceItemId) { // поднятие анкеты
        $this->setJsonResponse();

        $serviceItem = ServiceItem::findFirst($serviceItemId);
        $serviceItem->datePost = date('now');
        $serviceItem->save();

        return array(
            "success" => true,
            "msg" => "Обьявление успешно обновлено!"
        );
    }
}

