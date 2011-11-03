<?php
class My_View_Helper_DynamicResources extends Zend_View_Helper_Abstract {
    public function dynamicResources(){
        $module = Zend_Controller_Front::getInstance()->getRequest()->getModuleName();        
        $controller = Zend_Controller_Front::getInstance()->getRequest()->getControllerName();                
        $view = Zend_Controller_Front::getInstance()->getRequest()->getActionName();        
        $filejs = $controller.'_'.$view.'.js';
        $filecss = $controller.'_'.$view.'.css';
        $urljs = APPLICATION_PATH."/../public/js/app/modules/".$module."/".$filejs;        
        $urlcss = APPLICATION_PATH."/../public/css/".$module."/".$filecss;
        
        
        $scriptjs  = (file_exists($urljs))?'
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "/js/app/modules/'.$module.'/'.$filejs.'";
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
                        //Ext.Loader.setConfig({enabled:true});
                        '.$scripcss.'
                        '.$scriptjs.'                        
                });    
            </script>';
        
        return $script;        
    }
}
?>
