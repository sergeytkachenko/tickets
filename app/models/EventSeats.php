<?php

class EventSeats extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $id;

    /**
     *
     * @var integer
     */
    public $seat_id;

    /**
     *
     * @var integer
     */
    public $price;

    /**
     *
     * @var integer
     */
    public $event_id;

    /**
     *
     * @var string
     */
    public $last_reservation;

    /**
     *
     * @var string
     */
    public $last_reservation_session_id;

    /**
     *
     * @var integer
     */
    public $is_purchased;
    public function initialize()
    {
        $this->belongsTo('event_id', 'Events', 'id', array('alias' => 'Events'));
        $this->belongsTo('seat_id', 'Seats', 'id', array('alias' => 'Seats'));
    }

}
