<?php

namespace Multiple\Frontend;

use Phalcon\DiInterface;
use Phalcon\Loader,
    Phalcon\Mvc\Dispatcher,
    Phalcon\Mvc\View,
    Phalcon\Mvc\ModuleDefinitionInterface;

class Module implements ModuleDefinitionInterface
{

    public function registerAutoloaders(DiInterface $di = null)
    {

        $loader = new Loader();

        $loader->registerNamespaces(
            array(
                'Multiple\Frontend\Controllers' => '../app/frontend/controllers/',
            )
        );

        $loader->register();
    }


    public function registerServices(DiInterface $di)
    {
        // Регистрация диспетчера
        $di->set('dispatcher', function() {
            $dispatcher = new Dispatcher();
            $dispatcher->setDefaultNamespace("Multiple\Frontend\Controllers");
            return $dispatcher;
        });

        // Регистрация компонента представлений
        $view = $di->get("view");
        $view->setViewsDir('../app/frontend/views/');
        $di->set('view', $view);
    }

}