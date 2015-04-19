<?php
namespace Multiple\Frontend\Controllers;
use News;
use Phalcon\Mvc\View;

class NewsController extends ControllerBase
{

    public function viewAction($id=null) {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
        $this->view->data  = News::findFirst($id);

        $this->br->add("Новости", "news");
        $this->br->add($this->view->data->title, "news/view/".$this->view->data->id);
    }

    public function indexAction() {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
        $news = News::find(array(
            "order" => "date_create DESC"
        ));
        $this->view->setVar("news", $news);

        $this->br->add("Новости", "news");
    }
}

