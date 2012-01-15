<?php
class My_View_Helper_jQuery extends Zend_View_Helper_Abstract{
    public function jQuery(){        
//        $script .= '<script type="text/javascript" src="/js/libs/jquery-1.6.3.min.js"></script>';
        $script .= '<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>';
        $script .= '<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>';
        $script .= '<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/base/jquery-ui.css" rel="stylesheet" />';
        return $script;
    }
}
?>
