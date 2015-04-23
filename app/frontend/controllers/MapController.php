<?php
namespace Multiple\Frontend\Controllers;

use Phalcon\Mvc\View;

class MapController extends ControllerBase
{

    public function viewAction () {
        $this->view->setRenderLevel(View::LEVEL_ACTION_VIEW);
        $this->view->map = \Config::findFirst("key='map'");
    }

}

