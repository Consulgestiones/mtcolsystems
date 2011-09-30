<?php
class My_View_Helper_DynamicResources extends Zend_View_Helper_Abstract {
    public function dynamicResources(){
        $module = Zend_Controller_Front::getInstance()->getRequest()->getModuleName();        
        $controller = Zend_Controller_Front::getInstance()->getRequest()->getControllerName();                
        $view = Zend_Controller_Front::getInstance()->getRequest()->getActionName();        
        $filejs = $controller.'_'.$view.'.js';
        $filecss = $controller.'_'.$view.'.css';
        $urljs = APPLICATION_PATH."/../public/js/".$module."/".$filejs;
        $urljsui = APPLICATION_PATH."/../public/js/".$module."/ui/".$filejs;
        $urlcss = APPLICATION_PATH."/../public/css/".$module."/".$filecss;
        
        
        $scriptjs  = (file_exists($urljs) && file_exists($urljsui))?'
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "/js/'.$module.'/'.$filejs.'";
            document.getElementsByTagName("head")[0].appendChild(script);
            var scriptui = document.createElement("script");
            scriptui.type = "text/javascript";
            scriptui.src = "/js/'.$module.'/ui/'.$filejs.'";
            document.getElementsByTagName("head")[0].appendChild(scriptui);
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
                        Ext.Loader.setConfig({enabled:true});
                });    
            </script>';
        
        return $script;        
    }
}
?>
