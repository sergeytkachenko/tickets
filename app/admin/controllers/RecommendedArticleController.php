<?php
namespace Multiple\Admin\Controllers;

use RecommendedArticle;

class RecommendedArticleController extends ControllerBase {

    public function getListAction() {
        $this->setJson();
        $data = RecommendedArticle::find()->toArray();

        return array(
            'data' => $data,
            'totalCount' => count($data),
        );
    }

    public function getOneAction() {
        $this->setJson();
        $id = $this->request->get('id');

        if (!$id) {
            require_once 'Lib/Exception/Controller.php';
            throw new Exception('Id or lenguage_id is required');
        }


        $data = RecommendedArticle::findFirst($id)->dump();

        return $data;
    }

    public function saveAction() {
        $this->setJson();
        $id = $this->request->get('id');

        if (!isset($id)) {
            require_once 'Lib/Exception/Controller.php';
            throw new Exception('Id is required');
        }

        $data = $this->request->getPost();
        if($id == "new") {
            unset($data['id']);
            $item = new RecommendedArticle();
            $item->assign($data);
            $item->save();
        } else {
            $item = RecommendedArticle::findFirst($id);
            $item->save($data);
        }

        return array(
            "success" => true
        );
    }
}

