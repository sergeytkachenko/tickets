<?php

return new \Phalcon\Config(array(
    'database' => array(
        'adapter'     => 'Mysql',
        'host'        => 'localhost',
        'username'    => 'root',
        'password'    => '1665017',
        'dbname'      => 'tickets',
        'charset'     => 'utf8',
    ),
    'application' => array(
        'controllersDir' => __DIR__ . '/../../app/controllers/',
        'modelsDir'      => __DIR__ . '/../../app/models/',
        'viewsDir'       => __DIR__ . '/../../app/views/',
        'pluginsDir'     => __DIR__ . '/../../app/plugins/',
        'libraryDir'     => __DIR__ . '/../../app/library/',
        'cacheDir'       => __DIR__ . '/../../app/cache/',
        'baseUri'        => '',
        'publicUrl' => 'http://circus.org.ua'
    ),
    'mail' => array(
        'fromName' => 'Покупка билетов circus.org.ua',
        'fromEmail' => 'dima.borovyk@gmail.com',
        'smtp' => array(
            'server'	=> 'smtp.gmail.com',
            'port' 		=> 465,
            'security' => 'ssl',
            'username' => 'dima.borovyk@gmail.com',
            'password' => '1dborovyk1',
        )
    ),
));
