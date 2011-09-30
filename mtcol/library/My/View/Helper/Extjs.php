<?php
class My_View_Helper_Extjs{
    public function extjs(){
        $script = '<link href="/extjs/resources/css/ext-all.css" rel="stylesheet" />';
        $script .= '<script type="text/javascript" src="/extjs/ext-all-debug.js"></script>';
        return $script;
    }
}
?>
