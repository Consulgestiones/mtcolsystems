<?php
class Form_TranspCompany extends Zend_Form {
    public function init(){
        $this->addElement('hidden', 'idtranspcompany', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'idcountry', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'idcountry', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'idcity', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'transpcompany', array(
            'required' => true
        ));
        $this->addElement('hidden', 'phone', array());
        $this->addElement('hidden', 'email', array());
        $this->addElement('hidden', 'address', array());
    }
}
?>
