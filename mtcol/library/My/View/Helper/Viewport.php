<?php
class My_View_Helper_Viewport extends Zend_View_Helper_Abstract {
    public function viewport(){
        return '<script type="text/javascript" src="/js/libs/viewport.js" ></script>';
    }
}

?>