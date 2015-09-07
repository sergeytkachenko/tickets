<?php
namespace Multiple\Frontend\Controllers;
use Pages;
use Phalcon\Exception;
use Phalcon\Mvc\View;

class PageController extends ControllerBase
{

    public function viewAction($id=null) {
        $page = Pages::findFirst($id);
       if(!$page) {
        throw new Exception('page not found');
       }
        $this->view->data  = $page;
    }

}

