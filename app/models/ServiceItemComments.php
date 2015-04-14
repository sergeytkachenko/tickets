<?php

use Phalcon\Mvc\Model\Validator\Email as Email;

class ServiceItemComments extends \Phalcon\Mvc\Model
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
    public $user_name;

    /**
     *
     * @var string
     */
    public $email;

    /**
     *
     * @var string
     */
    public $comment;

    /**
     *
     * @var string
     */
    public $date_comment;

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
        $this->belongsTo('service_item_id', 'Service_item', 'id', array('alias' => 'Service_item'));
    }

}
