<?

class Loader {

    /**
     * Almacena cada ruta sobre la que hay que buscar clases indicando 
     * si la búsqueda debe ser recursiva (1) o no (0) 
     * [[path,recursive{0,1}]] 
     */ 
    var $_paths  = null; 
    public $_realPuth;
    /** 
     * Patrón que deben cumplir los archivos para considerarse como clases 
     */ 
    var $_patternClassName = ""; 

    /** 
     * Matriz con las clases encontradas, se guarda como clave el nombre 
     * del archivo (NO el de la clase almacenada en el archivo) y como  
     * valor el del path donde está ubicada 
     */ 
    var $_classes = null; 

    /** 
     * Tiempo en segundos de validez de la información obtenida 
     */ 
    var $_expirationTime = 3600; 

    /** 
     * Nombre del archivo donde guardar la información de caché 
     */ 
    var $_cacheFileName = ""; 


    /** 
     * Constructor de la clase 
     *  
     * @param $paths 
     * @param $pattern 
     * @param $cache_name 
     * @param $cache_folder 
     */ 
    function ClassLoader($exp=3600, $cache_name='classLoader.dat', $cache_folder='/cache', $pattern='\.js$') 
    { 
        $this->_expirationTime   = $exp; 
        $this->_cacheFileName    = realpath($cache_folder).'/'.$cache_name; 
        $this->_patternClassName = $pattern; 
    } 

    /** 
    * Añade un path 
    * @param string $path ruta completa desde la raíz del sistema 
    * @param bool $recursive (1|0) que indica si hay que buscar clases  
    *        de manera recursiva en el path 
    */ 
    function addPath($path, $recursive=1) 
    { 

        if(preg_match("/\/$/",$path)) $path = substr(PUBLIC_PATH.$path,0,-1); 

        if(!file_exists(PUBLIC_PATH.$path)) 
            trigger_error("No existe el path indicado: [$path]", E_USER_ERROR); 
        else 
            $this->_paths[] = array(realpath(PUBLIC_PATH.$path), $recursive); 
            $this->_realPuth = $path;
    } 

    /** 
    * Pone en marcha el cargador de clases, para lo cual se buscan las clases  
    * disponibles o se recuperan de caché 
    */ 
    function start() 
    { 
        if(!$this->_getCachedData()){ 
            $this->_rebuildClassesInfo(); 
            $this->_setCachedData(); 
        } 
    } 

    /** 
    * Busca clases en las ubicaciones que se han indicado 
    */ 
    function _rebuildClassesInfo() 
    { 
        $this->_classes = array(); 

        foreach($this->_paths as $path_info){ 
            $this->_searchDir($path_info[0], $path_info[1]); 
        } 
    } 

    /** 
    * Función recursiva, que dado un directorio busca en él y en todos sus hijos (si así se indica)  
    * archivos que cumplan con el patrón indicado, almacenando cada coincidencia en la matriz de clases 
    */ 
    function _searchDir($directory, $recursive=1){ 

        if ($id_dir = @opendir($directory)){ 
            while (false !== ($file = readdir($id_dir))){ 
               if ($file != "." && $file != ".."){ 
                   if($recursive && is_dir($directory.'/'.$file)){ 
                       $this->_searchDir($directory.'/'.$file, $recursive); 
                   } 
                   else{ 
                        if(preg_match("/".$this->_patternClassName."/", $file)) { 
                            if(isset($this->_classes[$file]) && $this->_classes[$file] != ''){ 
                                trigger_error("Se ha encontrado un archivo de clase " 
                                                ."duplicada [$directory/$file]: ".$this->_data[$file],  
                                                E_USER_ERROR); 
                            }     
                            else 
                                $this->_classes[$file] = $this->_realPuth.'/'.$file; 
                        } 
                   } 
               } 
            } 
            closedir($id_dir); 
        } 
    } 
    
    public function printFiles($type="script"){
        if(count($this->_classes) == 0){
            return;
        }
        switch($type){
            case "script":
            foreach($this->_classes as $path) {
                echo "<script src='$path'></script> \n";
            }
            break;
        }
    }

    /** 
    * Devuelve el path del archivo de clase indicada 
    */ 
    function getPathForClass($cln){ 
        return $this->_data[$cln]; 
    } 
     
    /** 
    * Incluye el archivo necesario para tener disponibles la clase/s que contiene 
    */ 
    function includeClass($cln){ 
        if(!isset($this->_classes[$cln]) || $this->_classes[$cln]==''){ 
            trigger_error("La clase indicada no está definida: ".$cln); 
        } 
        else{ 
            include_once($this->_classes[$cln]); 
        } 
    } 
     
    /** 
    * se realiza la inclusión de todas las clases encontradas 
    */ 
    function includeAllClasses(){ 
        foreach($this->_classes as $name => $path) 
            include_once($path); 
    } 

    /** 
    * Comprueba si hay información en caché y si es válida, en cuyo caso la carga 
    * y devuelve true, eoc devuelve false 
    */ 
    function _getCachedData() 
    { 
        if( ! file_exists($this->_cacheFileName) 
             || (filemtime($this->_cacheFileName) < time()-$this->_expirationTime) ){ 
                return false; 
        } 

        $fp = fopen($this->_cacheFileName, 'r'); 
        $this->_classes = unserialize(fread($fp, filesize($this->_cacheFileName))); 
        fclose($fp); 

        return true; 
    } 

    /** 
    * Almacena la información de clases en caché para no tener que realizar 
    * la búsqueda de clases en cada petición de páginas 
    */ 
    function _setCachedData() 
    { 
//        if($fp = fopen($this->_cacheFileName, 'w')){ 
//            flock($fp, LOCK_EX); 
//            fwrite($fp,serialize($this->_classes)); 
//            flock($fp, LOCK_UN); 
//            fclose($fp); 
//        } 
    } 
}
