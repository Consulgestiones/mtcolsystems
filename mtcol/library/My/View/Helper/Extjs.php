<?php
class My_View_Helper_Extjs extends Zend_View_Helper_Abstract{
    public function extjs(){
        $script = '<link href="/ext-4.0.2a/resources/css/ext-all.css" rel="stylesheet" />';
        $script .= '<script type="text/javascript" src="/ext-4.0.2a/ext-all-debug.js"></script>';
        return $script;
    }
}
?>
