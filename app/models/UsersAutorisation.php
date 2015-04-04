<?php

class UsersAutorisation extends \Phalcon\Mvc\Model
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
    public $user_id;

    /**
     *
     * @var string
     */
    public $session_id;

    /**
     *
     * @var string
     */
    public $hash;

    /**
     *
     * @var string
     */
    public $last_ip;

    /**
     *
     * @var string
     */
    public $useragent;

    /**
     *
     * @var string
     */
    public $last_login;

}
