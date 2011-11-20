<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
    protected function _initSessionStart(){        
        Zend_Session::start();
    }
    protected function _initTimezone()
    {
        date_default_timezone_set('America/Bogota');
    }
    protected function _initAutoloader() {
        $autoloader = Zend_Loader_Autoloader::getInstance();
//        $autoloader->registerNamespace('My_')->setFallbackAutoloader(true);
 
        $resourceAutoloader = new Zend_Loader_Autoloader_Resource(
        array(
                'basePath' => APPLICATION_PATH,
                'namespace' => '',
                'resourceTypes' => array(
                  'form' => array('path' => 'forms/', 'namespace' => 'Form'),
                  'model' => array('path' => 'models/', 'namespace' => 'Model'),
                  'mtcol' => array('path' => '../library/Mtcol/', 'namespace' => 'Mtcol')
                )
           )
        );
    }

    protected function _initViewHelpers()
    {
        $this->bootstrap("view");
        $view = $this->getResource('view');        
        $view->addHelperPath('My/View/Helper','My_View_Helper');        
    }
    protected function _initMyDb() {
        $this->bootstrap('db');
        $resource = $this->getPluginResource('db');
        $db = $resource->getDbAdapter();
        $db->query('SET CHARACTER SET \'UTF8\'');
        Zend_Registry::set('db', $db);
    }
    protected function _initFunctions(){
        try{
            Zend_Loader::loadClass('Functions', array(
                APPLICATION_PATH.'/../library/My/'
            ));            
        }catch(Exception $e){
            
        }        
    }
}

