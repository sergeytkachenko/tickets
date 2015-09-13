<?

namespace Multiple\Frontend\Controllers;

use Cities;
use Config;
use Menu;
use Phalcon\Mvc\Controller;

class ControllerBase extends Controller
{

	public $br = null;

	public $publicKey = 'i4733924068';
	public $privateKey = null;

	const RESERVATION_TIME = 15; // in minutes

	public function initialize()
	{
		$this->privateKey = Config::findFirst('key="privatekey"')->value;
		$this->br = new \Breadcrumbs();
		$this->view->setVar('user', $this->session->get('user'));
	}


	protected $_isJsonResponse = false;

	// Call this func to set json response enabled
	public function setJsonResponse()
	{
		$this->view->disable();

		$this->_isJsonResponse = true;
		$this->response->setContentType('application/json', 'UTF-8');
	}

	// After route executed event
	public function afterExecuteRoute(\Phalcon\Mvc\Dispatcher $dispatcher)
	{
		if ($this->_isJsonResponse) {
			$data = $dispatcher->getReturnedValue();
			if (is_array($data)) {
				$data = json_encode($data);
			}
			$this->response->setContent($data);
			$this->response->send();
		}

		$this->view->setVar("br", $this->br->generate()); // added breadcrumb in view
	}

	/**
	 * redirect if user is null
	 */
	public function checkUser()
	{
		if (!$this->session->get("user")) {
			$this->response->redirect('/user/login');
		}
	}
}
