<?

try {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    define('PUBLIC_PATH', realpath(dirname(__FILE__)));

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

    $application->registerModules(
        array(
            'frontend' => array(
                'className' => 'Multiple\Frontend\Module',
                'path'      => '../app/frontend/Module.php',
            ),
            'admin'  => array(
                'className' => 'Multiple\Admin\Module',
                'path'      => '../app/admin/Module.php',
            )
        )
    );

    echo $application->handle()->getContent();

} catch (\Exception $e) {
    echo $e->getMessage();
}
