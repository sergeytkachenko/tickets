<?

namespace Multiple\Frontend\Controllers;
use Phalcon\Mvc\View;
class ErrorController extends ControllerBase
{

    public function notFoundAction() {
        $this->view->setRenderLevel(View::LEVEL_LAYOUT);
    }

}

