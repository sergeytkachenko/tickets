<?php

use Phalcon\Mvc\View;

class RoomController extends ControllerBase
{
    public function indexAction () {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
        $this->view->items = ServiceItem::find(array(
            "conditions" => "user_id = ?1",
            "bind"       => array(1 => $this->session->get("user")->id)
        ));

    }

    /**
     * Добавление обьявления
     */
    public function addAction () {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
        $this->view->services = Services::find();
    }

    public function saveAction () {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
        $errors = array();
        $userId = $this->session->get("user")->id;
        if(!$userId) {
            $errors[] = "Время сессии истекло. Войти в личный кабинет снова";
        }

        if($this->request->isGet() and $userId) {
            $images = $this->request->get("photos");
            $logo = trim($this->request->get("logo"));
            $logo = ($logo and !empty($logo)) ? $logo : "/img/empty.jpg";
            $title = $this->request->get("title");
            $price = $this->request->get("price");
            if(!is_numeric($price)) {
                $errors[] = "Поле цена, должно содержать только цифры";
            }
            $service_id = $this->request->get("service_id");
            $description = $this->request->get("description");
            $email = $this->request->get("email");
            $phone = $this->request->get("phone");
            $youtube_src = $this->request->get("youtube_src");

            $serviceItem = new ServiceItem();
            $serviceItem->title = $title;

            $serviceItem->price = $price;
            $serviceItem->description = $description;
            $serviceItem->short_description = $description;
            $serviceItem->service_id = $service_id;
            $serviceItem->logo_src = $logo;
            $serviceItem->date_post = date("Y-m-d H:i:s");
            $serviceItem->user_id = $userId;
            $serviceItem->save();

            $id = $serviceItem->id;
            if($id) {
                // save images
                $images = explode(",", $images);
                foreach($images as $image) {
                    if(empty($image)) {continue;}
                    $serviceItemImage = new ServiceItemImages();
                    $serviceItemImage->img_src = $image;
                    $serviceItemImage->service_item_id  = $id;
                    if(!$serviceItemImage->save()) {
                        $errors[] = "Не удалось сохранить фото ".$image;
                    }
                }

                // save youtube
                if($youtube_src and !empty($youtube_src)) {
                    $serviceItemVideo = new ServiceItemVideos();
                    $serviceItemVideo->service_item_id = $id;
                    $serviceItemVideo->youtube_src = $youtube_src;
                    $serviceItemVideo->height = 315;

                    if(!$serviceItemVideo->save()) {
                        $errors[] = "Не удалось сохранить видео ";
                    }
                }
            } else {
                //$errors [] = "Не удалось сохранить в данный момент, попробуйте  позже";
                foreach ($serviceItem->getMessages() as $msg) {
                    $errors[] = $msg->getMessage();
                };
            }
        }

        $this->view->errors = $errors;
    }

    public function inboxAction () {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
    }

    public function sendAction () {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
    }

    public function writeAction () {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
    }
}

