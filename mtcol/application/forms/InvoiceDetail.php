<?php
class Form_InvoiceDetail extends Zend_Form {
    public function init(){
        $this->addElement('hiddent', 'item', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hiddent', 'idinvoice', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hiddent', 'idproduct', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hiddent', 'quantity', array(
            'required' => true,
            'validators' => array('Float')
        ));
        $this->addElement('hiddent', 'unitprice', array(
            'required' => true,
            'validators' => array('Float')
        ));
        $this->addElement('hiddent', 'tax', array(
            'required' => true,
            'validators' => array('Float')
        ));
        $this->addElement('hiddent', 'totalprice', array(
            'required' => true,
            'validators' => array('Float')
        ));
    }
}
?>
