<?

namespace Multiple\Admin\Controllers;
use Phalcon\Mvc\Controller;

class ControllerBase extends Controller {

    public function initialize() {
        $user = $this->session->get("user");
        if(!$user or $user->user_group_id < 3) {
            $this->response->redirect('/user/login');
        }
    }

    protected $_isJsonResponse = false;

    // Call this func to set json response enabled
    public function setJson() {
        $this->view->disable();

        $this->_isJsonResponse = true;
        $this->response->setContentType('application/json', 'UTF-8');
    }

    // After route executed event
    public function afterExecuteRoute(\Phalcon\Mvc\Dispatcher $dispatcher) {
        if ($this->_isJsonResponse) {
            $data = $dispatcher->getReturnedValue();
            if (is_array($data)) {
                $data = json_encode($data);
            }
            $this->response->setContent($data);
            $this->response->send();
        }
    }
}
