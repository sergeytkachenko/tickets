<?php

class Representations extends \Phalcon\Mvc\Model
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
    public $description;

    /**
     *
     * @var string
     */
    public $img;

    /**
     *
     * @var boolean
     */
    public $is_active;

    public function initialize()
    {
        $this->hasMany('id', 'Events', 'representation_id', array('alias' => 'Events'));

    }

    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'id' => 'id', 
            'title' => 'title', 
            'description' => 'description', 
            'img' => 'img',
            'is_active' => 'is_active'
        );
    }

    public function getNearestEvent () {
        $event = Events::findFirst(array(
            'representation_id = :representationId: AND NOW() <= date',
            'bind' => array(
                'representationId' => $this->id
            ),
            'order' => 'date'
        ));

        return $event;
    }

}
