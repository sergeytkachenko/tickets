<?php

class Services extends \Phalcon\Mvc\Model
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
    public $img_src;

    /**
     *
     * @var integer
     */
    public $parent_id;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->hasMany('id', 'ServiceItem', 'service_id', array('alias' => 'ServiceItem'));
    }

}
