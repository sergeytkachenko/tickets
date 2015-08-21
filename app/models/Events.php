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

}
