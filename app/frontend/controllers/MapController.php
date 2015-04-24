<?php
namespace Multiple\Frontend\Controllers;

use Phalcon\Mvc\View;

class MapController extends ControllerBase
{

    public function viewAction () {
        $this->view->setRenderLevel(View::LEVEL_ACTION_VIEW);
        $this->view->map = \Config::findFirst("key='map'");
    }

    public function availableSeatsAction () {
        $this->setJsonResponse();

        $seats = array( // список всех доступных мест на сцене
            array("id" => 12, "price" => 200, "title" => "Название места", "free" => true),
            array("id" => 13, "price" => 200, "title" => "Название места", "free" => false),
            array("id" => 13, "price" => 200, "title" => "Название места", "free" => false),
            array("id" => 15, "price" => 200, "title" => "Название места", "free" => false),
            array("id" => 17, "price" => 200, "title" => "Название места", "free" => false),
            array("id" => 20, "price" => 200, "title" => "Название места", "free" => true),
            array("id" => 884, "price" => 200, "title" => "Название места", "free" => false),
            array("id" => 200, "price" => 200, "title" => "Название места", "free" => false),
            array("id" => 155, "price" => 200, "title" => "Название места", "free" => false),
            array("id" => 14, "price" => 250, "title" => "Название места", "free" => true)
        );

        return array(
            "seats" => $seats,
            "success" => true
        );
    }

}

