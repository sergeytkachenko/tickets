<?php

class Config extends \Phalcon\Mvc\Model
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
    public $key;

    /**
     *
     * @var string
     */
    public $value;
    public function columnMap()
    {
        return array(
            'id' => 'id', 
            'key' => 'key', 
            'value' => 'value'
        );
    }

}
