<?php
namespace Multiple\Frontend\Controllers;

class IndexController extends ControllerBase
{

    public function indexAction() {
        $this->response->redirect('/event/list');
    }

}

