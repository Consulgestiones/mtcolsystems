<?php
class My_View_Helper_Bootstrap extends Zend_View_Helper_Abstract{
    public function bootstrap(){        
        $script = '<script type="text/javascript" src="/js/libs/bootstrap.js"></script>';
        return $script;
    }
}
?>
