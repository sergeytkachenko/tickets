<?php

class Seats extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $id;

    /**
     *
     * @var string
     */
    public $title;
    public function initialize()
    {
        $this->hasMany('id', 'EventSeats', 'seat_id', array('alias' => 'EventSeats'));
        $this->hasMany('id', 'Orders', 'seat_id', array('alias' => 'Orders'));
    }

}
