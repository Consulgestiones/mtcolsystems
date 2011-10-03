<?php
class My_View_Helper_Basicinfo extends Zend_View_Helper_Abstract {
    public function basicinfo(){
        $module = Zend_Controller_Front::getInstance()->getRequest()->getModuleName();        
        $controller = Zend_Controller_Front::getInstance()->getRequest()->getControllerName();                
        $action = Zend_Controller_Front::getInstance()->getRequest()->getActionName();
        $basic = '<input type="hidden" name="module" id="module" value="'.$module.'" />';
        $basic .= '<input type="hidden" name="controller" id="controller" value="'.$controller.'" />';
        $basic .= '<input type="hidden" name="action" id="action" value="'.$action.'" />';
        return $basic;
    }
}

?>
