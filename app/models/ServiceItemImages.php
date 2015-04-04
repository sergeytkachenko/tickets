<?php

class ServiceItemImages extends \Phalcon\Mvc\Model
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
    public $img_src;

    /**
     *
     * @var integer
     */
    public $service_item_id;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->belongsTo('service_item_id', 'Service_item', 'id', array('alias' => 'Service_item'));
    }

}
