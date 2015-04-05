<?php

use Phalcon\Mvc\Controller;

class ControllerBase extends Controller {
    public function initialize() {
        $request = new Phalcon\Http\Request();
        $cityId = $request->get("city_id");
        if($cityId) {
            $this->session->set("city_id", $cityId);
        } else if(!$this->session->get("city_id")) {
            $this->session->set("city_id", 1);
        }

        $this->view->cities = Cities::find();
        foreach($this->view->cities as $city) {
            if($this->session->get("city_id") == $city->id) {
                $this->view->currentCity = $city;
            }
        }

        $this->view->user = $this->session->get("user");

        $this->view->maxCountVideo = Config::findFirst("name = 'max-count-video'")->value;
        $this->view->maxLengthDescription = Config::findFirst("name = 'max-length-description'")->value;
        $this->view->adminUserId = Config::findFirst("name = 'admin-user-id'")->value;
    }

}
