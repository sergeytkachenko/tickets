<?php
@session_start();

/**
 * This class provides authentification with Carbon Platform
 *
 */
class Moxiecode_CarbonPlatformAuthenticator extends Moxiecode_ManagerPlugin {
	/**
     * Auth key name for TinyMCE FileManager
     *
     */
    const AUTH_KEY = 'mcFileManager.auth.isLoggedIn';    
    const PATH_KEY = 'mcFileManager.auth.rootpath';

	function Moxiecode_CarbonPlatformAuthenticator() {
	}

	function onAuthenticate(&$man) {
	    $config =& $man->getConfig();
	    
	    // Checking auth
	    if (!isset($_SESSION[self::AUTH_KEY])) {
	        return false;
	    }
	    
	    // Checking path
	    if (!isset($_SESSION[self::PATH_KEY])) {
	        return false;
	    }
	    $config['filesystem.path'] = @$_SESSION['mcFileManager.auth.rootpath'];
	    $config['filesystem.rootpath'] = @$_SESSION['mcFileManager.auth.rootpath'];

	    // File proxy prefix
	    $config['preview.urlprefix'] = '{proto}://{host}/file/get-fm';
	    
		return true;
	}
}

// Add plugin to MCManager
$man->registerPlugin("CarbonPlatformAuthenticator", new Moxiecode_CarbonPlatformAuthenticator());
?>