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
     * @var integer
     */
    public $representation_id;

    /**
     *
     * @var string
     */
    public $date;


    public function initialize()
    {
        $this->hasMany('id', 'EventSeats', 'event_id', array('alias' => 'EventSeats'));
        $this->hasMany('id', 'EventPrices', 'event_id', array('alias' => 'EventPrices'));
        $this->belongsTo('representation_id', 'Representations', 'id', array('alias' => 'Representation'));

    }

    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'id' => 'id', 
            'representation_id' => 'representation_id', 
            'date' => 'date'
        );
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'events';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Events[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Events
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}
