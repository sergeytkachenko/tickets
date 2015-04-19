<?php

use Phalcon\Mvc\Model\Validator\Email as Email;

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
     * @var string
     */
    public $email;

    /**
     *
     * @var string
     */
    public $phone;

    /**
     *
     * @var integer
     */
    public $city_id;

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

    public function initialize()
    {
        $this->hasMany('id', 'ServiceItemComments', 'service_item_id', array('alias' => 'ServiceItemComments'));
        $this->hasMany('id', 'ServiceItemImages', 'service_item_id', array('alias' => 'ServiceItemImages'));
        $this->hasMany('id', 'ServiceItemVideos', 'service_item_id', array('alias' => 'ServiceItemVideos'));
        $this->belongsTo('service_id', 'Services', 'id', array('alias' => 'Services'));
        $this->belongsTo('city_id', 'Cities', 'id', array('alias' => 'Cities'));
        $this->belongsTo('user_id', 'Users', 'id', array('alias' => 'Users'));
    }

    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'id' => 'id', 
            'title' => 'title', 
            'logo_src' => 'logo_src', 
            'short_description' => 'short_description', 
            'description' => 'description', 
            'date_post' => 'date_post', 
            'price' => 'price', 
            'email' => 'email', 
            'phone' => 'phone', 
            'city_id' => 'city_id', 
            'service_id' => 'service_id', 
            'user_id' => 'user_id', 
            'is_vip' => 'is_vip', 
            'is_published' => 'is_published'
        );
    }

}
