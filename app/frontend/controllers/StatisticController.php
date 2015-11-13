<?php
namespace Multiple\Frontend\Controllers;

use Config;
use Events;
use EventSeats;
use LiqPay;
use OrderHistory;
use Orders;
use Phalcon\Exception;
use Phalcon\Mvc\Model\Query\Builder;
use Phalcon\Mvc\View;
use Representations;

class StatisticController extends ControllerBase
{
	/**
	 * @param $eventId
	 */
	public function purchasedAction ($eventId=null) {
		if(!$this->session->get('user')) {
			$this->response->redirect("/user/login");
		}
		$eventId = $eventId? $eventId : 1;
		$event = Events::findFirst($eventId);
		$representation = Events::findFirst($event->representation_id);
		$query = Events::query()
			->columns(array(
				'r.title',
				'Events.date',
				'ep.price',
				'o.user_name',
				'o.user_email',
				'o.user_phone',
				'o.date as date_buy',
				's.title as seat_title'
			))
			->where('Events.id = :eventId: AND es.is_purchased = 1 AND o.success = 1')
			->join('EventSeats', 'es.event_id = Events.id', 'es')
			->join('Seats', 's.id = es.seat_id', 's')
			->join('Orders', 'o.events_seat_id = es.id', 'o')
			->join('Representations', 'r.id = Events.representation_id', 'r')
			->join('EventPrices', 'ep.representation_id = r.id AND ep.seat_color_id = s.seat_color_id', 'ep')
			->orderBy('o.user_email DESC')
			->bind(array(
				'eventId' => $eventId
			));
		$data = $query->execute();
		$this->view->setVar('purchasedList', $data->toArray());
		$this->view->setVar('event', Events::findFirst($eventId));
		$this->view->setVar('representation', $representation);
		$this->view->setVar('representations', Representations::find());
		$this->view->setVar('events', Events::findByRepresentationId($representation->id));
	}

	public function getEventsAction($representationId) {
		$this->setJsonResponse();
		return Events::findByRepresentationId($representationId)->toArray();
	}
}

