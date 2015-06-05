<?php

class Orders extends \Phalcon\Mvc\Model
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
    public $events_seat_id;

    /**
     *
     * @var string
     */
    public $user_name;

    /**
     *
     * @var string
     */
    public $user_email;

    /**
     *
     * @var string
     */
    public $user_phone;

    /**
     *
     * @var string
     */
    public $date;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->belongsTo('events_seat_id', 'EventSeats', 'id', array('alias' => 'EventSeats'));
    }

    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'id' => 'id', 
            'events_seat_id' => 'events_seat_id', 
            'user_name' => 'user_name', 
            'user_email' => 'user_email', 
            'user_phone' => 'user_phone', 
            'date' => 'date'
        );
    }

}
