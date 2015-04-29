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
    public $seat_id;

    /**
     *
     * @var string
     */
    public $user;

    /**
     *
     * @var string
     */
    public $date;
    public function initialize()
    {
        $this->belongsTo('seat_id', 'Seats', 'id', array('alias' => 'Seats'));
    }

}
