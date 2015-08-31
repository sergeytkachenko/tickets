<?php

class EventPrices extends \Phalcon\Mvc\Model
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
    public $price;

    /**
     *
     * @var integer
     */
    public $event_id;

    /**
     *
     * @var integer
     */
    public $seat_color_id;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->belongsTo('event_id', 'Events', 'id', array('alias' => 'Events'));
        $this->belongsTo('seat_color_id', 'SeatColors', 'id', array('alias' => 'SeatColors'));
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'event_prices';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return EventPrices[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return EventPrices
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}
