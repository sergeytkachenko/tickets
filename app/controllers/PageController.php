<?php

use Phalcon\Mvc\View;

class PageController extends ControllerBase
{

    public function viewAction($id=null) {
        $this->view->setTemplateAfter('layouts/page.phtml');
        $this->view->data  = Pages::findFirst($id);
    }

}

