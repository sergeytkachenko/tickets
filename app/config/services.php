<?php

use Phalcon\DI\FactoryDefault;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Url as UrlResolver;
use Phalcon\Db\Adapter\Pdo\Mysql as DbAdapter;
use Phalcon\Mvc\View\Engine\Volt as VoltEngine;
use Phalcon\Mvc\Model\Metadata\Memory as MetaDataAdapter;
use Phalcon\Session\Adapter\Files as SessionAdapter;

/**
 * The FactoryDefault Dependency Injector automatically register the right services providing a full stack framework
 */
$di = new FactoryDefault();

/**
 * The URL component is used to generate all kind of urls in the application
 */
$di->set('url', function () use ($config) {
    $url = new UrlResolver();
    $url->setBaseUri($config->application->baseUri);

    return $url;
}, true);

/**
 * Setting up the view component
 */
$di->set('view', function () use ($config) {

    $view = new View();

    //$view->setViewsDir($config->application->viewsDir);

    $view->registerEngines(array(
        '.volt' => function ($view, $di) use ($config) {

            $volt = new VoltEngine($view, $di);

            $volt->setOptions(array(
                'compiledPath' => $config->application->cacheDir,
                'compiledSeparator' => '_',
                'stat' => true,
                'compileAlways' => true
            ));

            $compiler = $volt->getCompiler();

            $compiler->addFunction('trim_to_dot',
                function($resolvedArgs, $exprArgs) use ($compiler) {
                    $string= $compiler->expression($exprArgs[0]['expr']);
                    $secondArgument = $compiler->expression($exprArgs[1]['expr']);
                    return 'trim_to_dot('.$string.','.$secondArgument.')';
                });
            $compiler->addFunction('substr',
                function($resolvedArgs, $exprArgs) use ($compiler) {
                    $string= $compiler->expression($exprArgs[0]['expr']);
                    $secondArgument = $compiler->expression($exprArgs[1]['expr']);
                    return 'substr('.$string.', 0, '.$secondArgument.')';
                });

            $compiler->addFunction('display_when',
                function($resolvedArgs, $exprArgs) use ($compiler) {
                    $string = $compiler->expression($exprArgs[0]['expr']);
                    return '\DateFormat::displayWhen("'.$string.'")';
                });
            // количество обьявлений в текущем городе и категории
            $compiler->addFunction('count_service_item',
                function($resolvedArgs, $exprArgs) use ($compiler) {
                    $serviceId = $compiler->expression($exprArgs[0]['expr']);
                    $cityId = $compiler->expression($exprArgs[1]['expr']);
                    return '\ServiceItem::count("is_published = 1 AND city_id = '.$cityId.' AND service_id = '.$serviceId.'")';
                });
            return $volt;
        },
        '.phtml' => 'Phalcon\Mvc\View\Engine\Php'
    ));

    return $view;
}, true);

/**
 * Database connection is created based in the parameters defined in the configuration file
 */
$di->set('db', function () use ($config) {
    return new DbAdapter(array(
        'host' => $config->database->host,
        'username' => $config->database->username,
        'password' => $config->database->password,
        'dbname' => $config->database->dbname,
        "charset" => $config->database->charset
    ));
});

/**
 * If the configuration specify the use of metadata adapter use it or use memory otherwise
 */
$di->set('modelsMetadata', function () {
    return new MetaDataAdapter();
});

/**
 * Start the session the first time some component request the session service
 */
$di->set('session', function () {
    $session = new SessionAdapter();
    $session->start();

    return $session;
});

// Специфичные роуты для модуля
$di->set('router', function () {

    $router = new \Phalcon\Mvc\Router();

    $router->setDefaultModule("frontend");

    $router->add("/adm", array(
        'module'     => 'admin',
        'controller' => "index",
        'action'     => "index",
    ));

    $router->add("/admin/:controller/:action(\.json)?", array(
        'module'     => 'admin',
        'controller' => 1,
        'action'     => 2,
    ));

    return $router;
});
