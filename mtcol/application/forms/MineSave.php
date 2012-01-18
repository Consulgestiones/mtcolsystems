<?php

class Form_MineSave extends Zend_Form{
    public function init(){
        $this->addElement('hidden', 'idmine', array(
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'mine', array(
           'required' => true
        ));
        $this->addElement('hidden', 'description', array(
            'required' => true 
        ));
    }
    
}

?>
