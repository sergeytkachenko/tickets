<?php

use Phalcon\Mvc\View;

class FileController extends ControllerBase {

    public function saveAction () {
        $this->setJsonResponse();

        if($this->request->isPost()) {
            $target_dir = PUBLIC_PATH."/files/";
            $uploader =  new FileUploader($_FILES['file']);
            $uploader->file_max_size = 1024 * 1024 * PHOTO_MAX; // 1024*1024 = 1MB
            $uploader->allowed = array('image/*');
            if ($uploader->uploaded) {
                $uploader->file_new_name_body = md5($_FILES["file"]["name"].time());
                $uploader->Process($target_dir);
                if ($uploader->processed) {
                    $newName = $uploader->file_dst_name;
                    return array(
                        'success' => true,
                        'msg' => "Файл $newName успешно загружен!"
                    );
                } else {
                    return array(
                        'success' => false,
                        'msg' => $uploader->error
                    );
                }
            }
        }

        return array('success' => true);
    }
}

