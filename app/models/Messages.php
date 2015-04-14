<?php

class Messages extends \Phalcon\Mvc\Model
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
    public $user_sender_id;

    /**
     *
     * @var integer
     */
    public $user_recipient_id;

    /**
     *
     * @var string
     */
    public $subject;

    /**
     *
     * @var string
     */
    public $text;

    /**
     *
     * @var string
     */
    public $date;

    /**
     *
     * @var integer
     */
    public $is_unread;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->belongsTo('user_sender_id', 'Users', 'id', array('alias' => 'UsersSender'));
        $this->belongsTo('user_recipient_id', 'Users', 'id', array('alias' => 'UsersRecipient'));
    }

}
