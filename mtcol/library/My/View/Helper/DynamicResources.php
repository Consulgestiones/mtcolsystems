<?php
class My_View_Helper_DynamicResources extends Zend_View_Helper_Abstract {
//    public function dynamicResources(){
//        $module = Zend_Controller_Front::getInstance()->getRequest()->getModuleName();        
//        $controller = Zend_Controller_Front::getInstance()->getRequest()->getControllerName();                
//        $view = Zend_Controller_Front::getInstance()->getRequest()->getActionName();        
//        $filejs = $controller.'_'.$view.'.js';
//        $filecss = $controller.'_'.$view.'.css';
////        $urljs = APPLICATION_PATH."/../public/js/app/module/".$module."/".$filejs;        
////        $urlcss = APPLICATION_PATH."/../public/css/".$module."/".$filecss;
//        $urljs = "/js/app/module/".$module."/".$filejs;        
//        $urlcss = "/css/".$module."/".$filecss;
//        
//        
//        
//        $script  = (file_exists(APPLICATION_PATH.'/../public'.$urljs))?'<script type="text/javascript" src="'.$urljs.'"></script>':'';        
//        
//        $scrip .= (file_exists(APPLICATION_PATH.'/../public'.$urlcss))?'<link rel="stylesheet" href="'.$urlcss.'"':'';                
//        
//        return $script;        
//    }
    public function dynamicResources(){
        $module = Zend_Controller_Front::getInstance()->getRequest()->getModuleName();        
        $controller = Zend_Controller_Front::getInstance()->getRequest()->getControllerName();                
        $view = Zend_Controller_Front::getInstance()->getRequest()->getActionName();        
        $filejs = $controller.'_'.$view.'.js';
        $filecss = $controller.'_'.$view.'.css';
        $urljs = APPLICATION_PATH."/../public/js/app/module/".$module."/".$filejs;        
        $urlcss = APPLICATION_PATH."/../public/css/".$module."/".$filecss;
        
        
        $scriptjs  = (file_exists($urljs))?'
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "/js/app/module/'.$module.'/'.$filejs.'";
            document.getElementsByTagName("head")[0].appendChild(script);            
            ':'';        
        
        $scripcss = (file_exists($urlcss))?'
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "/css/'.$module.'/'.$filecss.'";
            document.getElementsByTagName("head")[0].appendChild(link);
        ':'';
        
        if(!empty($scriptjs) || !empty($scripcss))
            $script = '<script type="text/javascript">
                        Ext.onReady(function(){                        
                        '.$scripcss.'
                        '.$scriptjs.'                        
                });    
            </script>';
        
        return $script;        
    }
}
?>
