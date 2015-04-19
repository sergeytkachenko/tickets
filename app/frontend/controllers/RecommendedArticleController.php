<?php
namespace Multiple\Frontend\Controllers;
use RecommendedArticle;
use Phalcon\Mvc\View;

class RecommendedArticleController extends ControllerBase
{

    public function viewAction($id=null) {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
        $this->view->data  = RecommendedArticle::findFirst($id);

        $this->br->add($this->view->data->title, "recommended-article/view/".$this->view->data->id);
    }

}

