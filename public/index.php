<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    define('PUBLIC_PATH', realpath(dirname(__FILE__)));
    date_default_timezone_set('Europe/Kiev');//or change to whatever timezone you want
    /**
     * Read the configuration
     */

    $config = include __DIR__ . "/../app/config/config.php";

    /**
     * Read auto-loader
     */
    include __DIR__ . "/../app/config/loader.php";

    require_once __DIR__ . "/../app/config/define.php";
    /**
     * Read services
     */
    include __DIR__ . "/../app/config/services.php";

    include __DIR__ . "/../app/config/debug.php";

    /**
     * Handle the request
     */
    $application = new \Phalcon\Mvc\Application($di);

    echo $application->handle()->getContent();

} catch (\Exception $e) {
    echo $e->getMessage();
}
