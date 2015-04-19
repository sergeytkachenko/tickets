<?php
namespace Multiple\Admin\Controllers;

use News;

class NewsController extends ControllerBase {

    public function getListAction() {
        $this->setJson();
        $data = News::find()->toArray();

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


        $data = News::findFirst($id)->dump();

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
        unset($data['id']);
        $data['date_create'] = date("Y-m-d H:i:s");
        if($id == "new") {
            $item = new News();
            $item->assign($data);
            $item->save();
        } else {
            $item = News::findFirst($id);
            $item->save($data);
        }

        return array(
            "success" => true,
            "errors" => $item->getMessages(),
            "data" => $data
        );
    }
}

