<?php

class Events extends \Phalcon\Mvc\Model
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

    /**
     *
     * @var string
     */
    public $date;
    public function initialize()
    {
        $this->hasMany('id', 'EventSeats', 'event_id', array('alias' => 'EventSeats'));
    }

}
