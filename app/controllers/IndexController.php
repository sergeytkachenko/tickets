<?php

class IndexController extends ControllerBase
{

    public function indexAction() {
        $this->view->services = Services::find();
    }

}

