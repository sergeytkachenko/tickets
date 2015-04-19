<?php
namespace Multiple\Frontend\Controllers;

use Services;

class IndexController extends ControllerBase
{

    public function indexAction() {
        $this->view->services = Services::find("is_index_page=1");
    }

}

