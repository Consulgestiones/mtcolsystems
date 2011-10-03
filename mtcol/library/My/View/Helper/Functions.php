<?php
class My_View_Helper_Functions extends Zend_View_Helper_Abstract {
    public function functions(){
        $script = '<script type="text/javascript" src="/js/libs/functions.js" ></script>';
        return $script;
    }
}
?>
