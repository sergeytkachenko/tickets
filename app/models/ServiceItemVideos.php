<?php

class ServiceItemVideos extends \Phalcon\Mvc\Model
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
    public $service_item_id;

    /**
     *
     * @var string
     */
    public $youtube_src;

    /**
     *
     * @var integer
     */
    public $height;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->belongsTo('service_item_id', 'Service_item', 'id', array('alias' => 'Service_item'));
        $this->belongsTo('service_item_id', 'ServiceItem', 'id', NULL);
    }

}
