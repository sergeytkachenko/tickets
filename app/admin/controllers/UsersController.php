<?php
namespace Multiple\Admin\Controllers;

use Users;

class UsersController extends ControllerBase {

    public function getListAction() {
        $this->setJson();
        $data = Users::find()->toArray();

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


        $data = Users::findFirst($id)->dump();

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
            $item = new Users();
            $item->assign($data);
            $item->save();
        } else {
            $item = Users::findFirst($id);
            $item->save($data);
        }

        return array(
            "success" => true
        );
    }

    public function deleteAction () {
        $this->setJson();
        $id = $this->request->get('id');

        if (!isset($id)) {
            require_once 'Lib/Exception/Controller.php';
            throw new Exception('Id is required');
        }
        $user = Users::findFirst($id);
        $user->delete();

        return array(
            "success" => true
        );
    }
}

