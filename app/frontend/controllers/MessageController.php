<?php
namespace Multiple\Frontend\Controllers;
use Messages;
use Phalcon\Mvc\View;
use Phalcon\Paginator\Adapter\Model;

class MessageController extends ControllerBase
{

    public function inboxAction () {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
        $user = $this->session->get("user");

        $currentPage =  $this->request->getQuery('page', 'int'); // GET

        $masseges = Messages::find("user_recipient_id = ".intval($user->id));
        $paginator = new Model(
            array(
                "data" => $masseges,
                "limit"=> 15,
                "page" => $currentPage
            )
        );

        $this->view->page = $paginator->getPaginate();

    }

    public function sendAction () {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
        $user = $this->session->get("user");

        $currentPage =  $this->request->getQuery('page', 'int'); // GET

        $masseges = Messages::find("user_sender_id = ".intval($user->id));
        $paginator = new Model(
            array(
                "data" => $masseges,
                "limit"=> 15,
                "page" => $currentPage
            )
        );

        $this->view->page = $paginator->getPaginate();
    }

    public function writeAction () {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
        $errors = array();
        if($this->request->isPost()) {
            $subject = $this->request->get("subject");
            $text = $this->request->get("text");

            if(empty($subject) or empty($text)) {
                $errors[] = "Вы не заполнили тему или текст письма";
            }

            if($errors===array()) {
                $msg = new Messages();
                $msg->save(array(
                    "user_sender_id" => $this->session->get("user")->id,
                    "user_recipient_id" => 1,
                    "subject" => $subject,
                    "text" => $text,
                    "date" => date("Y-m-d H:i:s"),
                    "is_unread" => 1,
                ));
            }
            $this->view->isPost = true;
        } else {
            $this->view->isPost = false;
        }

        $this->view->subject = $this->request->get("subject");
        $this->view->text = $this->request->get("text");
        $this->view->errors = $errors;
    }

    public function readAction ($massageId) {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
        $user = $this->session->get("user");
        $massage = Messages::findFirst(
            "(id = ".intval($massageId)
            .") AND (user_sender_id = ".$user->id." OR user_recipient_id = ".$user->id.")"
        );
        $massage->save(array("is_unread" => 0));
        $this->view->massage = $massage;
    }

    public function deleteAction ($massageId) {

        $user = $this->session->get("user");
        $massage = Messages::findFirst(
            "(id = ".intval($massageId)
            .") AND (user_sender_id = ".$user->id." OR user_recipient_id = ".$user->id.")"
        );

        $massage->delete();
        return $this->response->redirect("/message/inbox");
    }
}

