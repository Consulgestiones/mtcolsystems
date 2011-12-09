<?php
class Form_RemissionHeader extends Zend_Form {
    public function init(){
        $this->addElement('hidden', 'idtranspcompany', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'dremission', array(
            'required' => true
        ));
        $this->addElement('hidden', 'drivername', array(
            'required' => true
        ));
        $this->addElement('hidden', 'vehicleplate', array(
            'required' => true
        ));
    }
}
?>
