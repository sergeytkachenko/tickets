<?php

class ServiceItem extends \Phalcon\Mvc\Model
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
    public $logo_src;

    /**
     *
     * @var string
     */
    public $short_description;

    /**
     *
     * @var string
     */
    public $description;

    /**
     *
     * @var string
     */
    public $date_post;

    /**
     *
     * @var integer
     */
    public $price;

    /**
     *
     * @var integer
     */
    public $service_id;

    /**
     *
     * @var integer
     */
    public $user_id;

    /**
     *
     * @var integer
     */
    public $is_vip;

    /**
     *
     * @var integer
     */
    public $is_published;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->hasMany('id', 'Service_item_comments', 'service_item_id', array('alias' => 'Service_item_comments'));
        $this->hasMany('id', 'Service_item_images', 'service_item_id', array('alias' => 'Service_item_images'));
        $this->hasMany('id', 'Service_item_videos', 'service_item_id', array('alias' => 'Service_item_videos'));
        $this->belongsTo('service_id', 'Services', 'id', array('alias' => 'Services'));
        $this->belongsTo('user_id', 'Users', 'id', array('alias' => 'Users'));
        $this->hasMany('id', 'ServiceItemComments', 'service_item_id', NULL);
        $this->hasMany('id', 'ServiceItemImages', 'service_item_id', NULL);
        $this->hasMany('id', 'ServiceItemVideos', 'service_item_id', NULL);
        $this->belongsTo('service_id', 'Services', 'id', NULL);
        $this->belongsTo('user_id', 'Users', 'id', NULL);
    }

}
