<?php
namespace Multiple\Frontend\Controllers;

use Phalcon\Mvc\View;

class ReservationController extends ControllerBase
{
    // резервация места
    public function seatAction ($id) {
        $this->setJsonResponse();

        return array(
            "success" => false,
            "error" => "oops.."
        );
    }

}

