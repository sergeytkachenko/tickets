<?php

namespace Multiple\Admin;

use Phalcon\DiInterface,
    Phalcon\Loader,
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
                'Multiple\Admin\Controllers' => '../app/admin/controllers/',
            )
        );

        $loader->register();
    }

    public function registerServices(DiInterface $di = null)
    {
        // Регистрация диспетчера
        $di->set('dispatcher', function() {
            $dispatcher = new Dispatcher();
            $dispatcher->setDefaultNamespace("Multiple\Admin\Controllers");
            return $dispatcher;
        });

        // Регистрация компонента представлений
        $di->set('view', function() {
            $view = new View();
            $view->setViewsDir('../app/admin/views/');
            return $view;
        });
    }

}