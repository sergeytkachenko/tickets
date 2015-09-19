<?php
namespace Multiple\Frontend\Controllers;

class IndexController extends ControllerBase
{
    public function indexAction() {
	    $this->response->redirect('/representation/list');
    }

	public function testAction () {
		$data = '{"payment_id":71802179,"transaction_id":71802179,"status":"sandbox","version":3,"type":"buy","public_key":"i4733924068","acq_id":414963,"order_id":"913d61c6618d687a6946150a69779a60","liqpay_order_id":"327324u1442609915831926","description":"Покупка билета на представление в цирке","sender_phone":"380971665017","amount":180.0,"currency":"UAH","sender_commission":0.0,"receiver_commission":4.95,"agent_commission":0.0,"amount_debit":180.0,"amount_credit":180.0,"commission_debit":0.0,"commission_credit":4.95,"currency_debit":"UAH","currency_credit":"UAH","sender_bonus":0.0,"amount_bonus":0.0}';
		$signature = 'MtIv41a3Xs+HSZmwpo8CIu8qbWQ=';

	}
}

