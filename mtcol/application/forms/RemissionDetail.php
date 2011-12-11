<?php
class Form_RemissionDetail extends Zend_Form {
    public function init(){
        $this->addElement('hidden', 'item', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'idremission', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'idproduct', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'quantity', array(
            'required' => true,
            'validators' => array('Float')
        ));
        $this->addElement('hidden', 'itemvalue', array(
            'required' => true,
            'validators' => array('Float')
        ));
        $this->addElement('hidden', 'unitvalue', array(
            'required' => true,
            'validators' => array('Float')
        ));
    }
}
?>
