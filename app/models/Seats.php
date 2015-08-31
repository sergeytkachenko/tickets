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
    public $alias;

    /**
     *
     * @var string
     */
    public $title;

    /**
     *
     * @var integer
     */
    public $seat_color_id;


    public function initialize()
    {
        $this->hasMany('id', 'EventSeats', 'seat_id', array('alias' => 'EventSeats'));
        $this->hasMany('id', 'Orders', 'seat_id', array('alias' => 'Orders'));
        $this->belongsTo('seat_color_id', 'SeatColors', 'id', array('alias' => 'SeatColor'));
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Seats[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Seats
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'seats';
    }

}
