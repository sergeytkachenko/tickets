<?php
namespace Multiple\Frontend\Controllers;
use Phalcon\Mvc\View;
use ServiceItem;
use ServiceItemImages;
use ServiceItemVideos;
use Services;

class RoomController extends ControllerBase
{
    public function indexAction () {
        $this->checkUser();
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
        $this->view->items = ServiceItem::find(array(
            "conditions" => "user_id = ?1",
            "bind"       => array(1 => $this->session->get("user")->id),
            "order" => "date_post DESC"
        ));

    }

    /**
     * Добавление обьявления
     */
    public function addAction () {
        $this->checkUser();
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
        $this->view->services = Services::find();
        $this->view->title = "Добавление обьявления";
        $this->view->serviceItem = new ServiceItem();
    }

    public function editAction ($id) {
        $this->checkUser();
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
        $this->view->services = Services::find();
        $this->view->title = "Редактирование обьявления";
        $this->view->serviceItem = ServiceItem::findFirst(intval($id));

    }

    public function saveAction () {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
        $errors = array();
        $userId = $this->session->get("user")->id;
        if(!$userId) {
            $errors[] = "Время сессии истекло. Войти в личный кабинет снова";
        }

        if($this->request->isPost() and $userId) {
            $serviceItemId = intval($this->request->get("serviceItemId"));

            $images = $this->request->get("photos");
            $logo = trim($this->request->get("logo"));
            $logo = ($logo and !empty($logo)) ? $logo : "/img/empty.jpg";
            $title = $this->request->get("title");
            $price = $this->request->get("price");
            $placeType = $this->request->get("place_type");
            if(!is_numeric($price)) {
                $errors[] = "Поле цена, должно содержать только цифры";

            }

            $service_id = $this->request->get("service_id");
            $cityId = $this->request->get("city_id");
            $description = $this->request->get("description");

            $email = $this->request->get("email");
            $phone = $this->request->get("phone");
            $youtube_src = $this->request->get("youtube_src");

            $serviceItem = $serviceItemId? ServiceItem::findFirst($serviceItemId) : new ServiceItem();
            $serviceItem->title = $title;

            $serviceItem->price = $price;
            $serviceItem->email = $email;
            $serviceItem->phone = $phone;
            $serviceItem->description = $description;
            $serviceItem->short_description = $description;
            $serviceItem->service_id = $service_id;
            $serviceItem->logo_src = $logo;
            $serviceItem->date_post = $serviceItemId?  $serviceItem->date_post : date("Y-m-d H:i:s");
            $serviceItem->user_id = $userId;
            $serviceItem->city_id = $cityId;
            $serviceItem->is_vip = $placeType;
            $serviceItem->is_published = $serviceItemId? $serviceItem->is_published : 0;

            $serviceItem->ServiceItemImages->delete();
            $serviceItem->ServiceItemVideos->delete();

            $serviceItem->save();

            $id = $serviceItem->id;
            if($id and $serviceItem->getMessages() === array()) {
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

    public function balanceAction () {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
        // 1.
        // Оплата заданной суммы с выбором валюты на сайте мерчанта
        // Payment of the set sum with a choice of currency on merchant site

        // регистрационная информация (логин, пароль #1)
        // registration info (login, password #1)
        $mrh_login = "sogroop";
        $mrh_pass1 = "Prisoner31";

        // номер заказа
        // number of order
        $inv_id = 0;

        // описание заказа
        // order description
        $inv_desc = "ROBOKASSA Advanced User Guide";

        // сумма заказа
        // sum of order
        $out_summ = "1000";

        // тип товара
        // code of goods
        $shp_item = 1;

        // предлагаемая валюта платежа
        // default payment e-currency
        $in_curr = "";

        // язык
        // language
        $culture = "ru";

        // кодировка
        // encoding
        $encoding = "utf-8";

        // формирование подписи
        // generate signature
        $crc  = md5("$mrh_login:$out_summ:$inv_id:$mrh_pass1:Shp_item=$shp_item");

        $paymentBtn = "<script language=JavaScript ".
            "src='https://auth.robokassa.ru/Merchant/PaymentForm/FormFLS.js?".
            "MrchLogin=$mrh_login&OutSum=$out_summ&InvId=$inv_id&IncCurrLabel=$in_curr".
            "&Desc=$inv_desc&SignatureValue=$crc&Shp_item=$shp_item".
            "&Culture=$culture&Encoding=$encoding'></script>";

        $this->view->setVar("paymentBtn", $paymentBtn);
    }
}

