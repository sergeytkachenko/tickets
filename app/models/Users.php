<?php

use Phalcon\Mvc\Model\Validator\Email as Email;

class Users extends \Phalcon\Mvc\Model
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
    public $email;

    /**
     *
     * @var string
     */
    public $password;

    /**
     *
     * @var string
     */
    public $phone;

    /**
     *
     * @var integer
     */
    public $status_id;

    /**
     *
     * @var string
     */
    public $code_validate;

    /**
     *
     * @var integer
     */
    public $user_group_id;

    /**
     *
     * @var integer
     */
    public $balance;

    /**
     *
     * @var integer
     */
    public $tariff_plan_id;

    /**
     *
     * @var integer
     */
    public $binding_ip;

    /**
     *
     * @var string
     */
    public $date_register;

    /**
     *
     * @var integer
     */
    public $is_new;

    /**
     *
     * @var integer
     */
    public $newsletter;
    public function validation()
    {
        $this->validate(
            new Email(
                array(
                    'field'    => 'email',
                    'required' => true,
                )
            )
        );
        if ($this->validationHasFailed() == true) {
            return false;
        }
    }
    public function initialize()
    {
        $this->hasMany('id', 'Messages', 'user_sender_id', array('alias' => 'MessagesSender'));
        $this->hasMany('id', 'Messages', 'user_recipient_id', array('alias' => 'MessagesRecipient'));
        $this->hasMany('id', 'ServiceItem', 'user_id', array('alias' => 'ServiceItem'));
        $this->belongsTo('user_group_id', 'UserGroup', 'id', array('alias' => 'UserGroup'));
    }
 
    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'id' => 'id', 
            'email' => 'email', 
            'password' => 'password', 
            'phone' => 'phone', 
            'status_id' => 'status_id', 
            'code_validate' => 'code_validate', 
            'user_group_id' => 'user_group_id', 
            'balance' => 'balance', 
            'tariff_plan_id' => 'tariff_plan_id', 
            'binding_ip' => 'binding_ip', 
            'date_register' => 'date_register', 
            'is_new' => 'is_new', 
            'newsletter' => 'newsletter'
        );
    }

}
