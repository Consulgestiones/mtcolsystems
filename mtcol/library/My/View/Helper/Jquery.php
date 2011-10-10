<?php
class My_View_Helper_jQuery extends Zend_View_Helper_Abstract{
    public function jQuery(){        
        $script .= '<script type="text/javascript" src="/js/libs/jquery-1.6.3.min.js"></script>';
        return $script;
    }
}
?>
