<?php
namespace Multiple\Frontend\Controllers;

use Services;

class IndexController extends ControllerBase
{

    public function indexAction() {
        $this->view->services = Services::find("is_index_page=1");
        $this->view->setVar("recommendedArticles", \RecommendedArticle::find("is_active =1 "));
    }

}

