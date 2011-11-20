<?php
class Form_InvoiceDetail extends Zend_Form {
    public function init(){
        $this->addElement('hidden', 'item', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'idinvoice', array(
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
        $this->addElement('hidden', 'unitprice', array(
            'required' => true,
            'validators' => array('Float')
        ));
        $this->addElement('hidden', 'tax', array(
            'required' => true,
            'validators' => array('Float')
        ));
        $this->addElement('hidden', 'totalprice', array(
            'required' => true,
            'validators' => array('Float')
        ));
        $this->addElement('hidden', 'itemprice', array(
            'required' => true,
            'validators' => array('Float')
        ));
        $this->addElement('hidden', 'taxvalue', array(
            'required' => true,
            'validators' => array('Float')
        ));
    }
}
?>
