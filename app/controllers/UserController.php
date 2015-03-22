<?php

use Phalcon\Mvc\View;

class UserController extends ControllerBase
{
    public function indexAction () {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
    }

    public function loginAction() {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
        $errors = array();
        if($this->request->isPost()) {
            $email = $this->request->get("email");
            $password = $this->request->get("password");

            $user = Users::findFirst(array(
               "conditions" => "email = ?1",
               "bind"       => array(1 => $email)
            ));

            $security = new \Phalcon\Security();
            if($user and $security->checkHash($password, $user->password)) {
               $this->session->set("user", $user);
               $response = new \Phalcon\Http\Response();
               return $response->redirect("/room");
            }
            $errors[] = "Не верный логин или пароль";
        }


        $this->view->email = @$email;
        $this->view->errors = $errors;
    }

    public function registerAction () {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);

        $request = new Phalcon\Http\Request();
        $errors = array();
        if($request->isPost()) {
            $email = $request->get("email");
            $password = $request->get("password");
            $password2 = $request->get("password2");
            $igree = $request->get("igree");

            if($password !== $password2) {
                $errors[] = "Пароли не совпадают";
            }

            if($igree !== "on") {
                $errors[] = "Необходимо принять условия портала";
            }
            if(Users::findFirst(array(
                "conditions" => "email = ?1",
                "bind"       => array(1 => $email)
            ))) {
                $errors[] = "Пользователь с таким email, уже зарегистрирован в системе";
            }

            if($errors===array()) {
                $user = new Users();
                $security = new \Phalcon\Security();

                $user->email = $email;
                $user->password = $security->hash($password);

                if($user->save() == false) {
                    $errors[] = "Не удалось сохраниить данного пользователя, пробуйте позже.";
                } else {
                    $response = new \Phalcon\Http\Response();
                    $user = Users::findFirst(array(
                        "conditions" => "email = ?1",
                        "bind"       => array(1 => $email)
                    ));
                    $this->session->set("user", $user);

                    return $response->redirect("/room");
                }
            }
        }
        $this->view->email = @$email;
        $this->view->password = @$password;
        $this->view->password2 = @$password2;
        $this->view->igree = @$igree;

        $this->view->errors = $errors;
    }

    public function exitAction () {
        $this->session->set("user", null);
        $response = new \Phalcon\Http\Response();

        return $response->redirect("/user/login");
    }

}

