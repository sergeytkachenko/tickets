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
    public $name;

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
     * @var integer
     */
    public $user_group_id;

    /**
     * Validations and business logic
     */
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

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->hasMany('id', 'Orders', 'user_id', array('alias' => 'Orders'));
        $this->belongsTo('dealer', 'Dealers', 'id', array('alias' => 'Dealers'));
        $this->belongsTo('group_id', 'User_groups', 'id', array('alias' => 'User_groups'));
        $this->belongsTo('user_group_id', 'User_group', 'id', array('alias' => 'User_group'));
    }

    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'id' => 'id', 
            'name' => 'name', 
            'email' => 'email', 
            'password' => 'password', 
            'user_group_id' => 'user_group_id'
        );
    }

}
