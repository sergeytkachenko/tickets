<?php
namespace Multiple\Frontend\Controllers;
use Pages;
use Phalcon\Mvc\View;

class PageController extends ControllerBase
{

    public function viewAction($id=null) {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
        $this->view->data  = Pages::findFirst($id);

        $this->br->add($this->view->data->title, "page/view/".$this->view->data->id);
    }

}

