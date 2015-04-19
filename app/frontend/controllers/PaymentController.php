<?php
namespace Multiple\Frontend\Controllers;
use Pages;
use Phalcon\Mvc\View;

class PaymentController extends ControllerBase
{

    public function successAction($id=null) {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
    }

    public function errorAction($id=null) {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
    }
}

