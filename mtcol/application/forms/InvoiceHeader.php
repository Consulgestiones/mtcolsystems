<?php
class Form_InvoiceHeader extends Zend_Form {
    public function init(){
        $this->addElement('hidden', 'idprovider', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'invoicenumber', array(
            'required' => true,
            'validators' => array('alnum')
        ));
        $this->addElement('hidden', 'dinvoice', array(
            'required' => true,
            'validators' => array(array('validator' => 'Date', 'options' => array('format' => 'Y-m-d')))
        ));
        $this->addElement('hidden', 'dcreate', array(
            'required' => true,
            'validators' => array(array('validator' => 'Date', 'options' => array('format' => 'Y-m-d')))
        ));
        $this->addElement('hidden', 'productservice', array(
            'required' => true,
            'validators' => array(
                array('validator' => 'alnum', 'options' => array('allowWhiteSpace' => true))
            )
        ));
        $this->addElement('hidden', 'idcountry', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'providerphone', array(
            'required' => true,
            'validators' => array(
                array('validator' => 'alnum', 'options' => array('allowWhiteSpace' => true))
            )
        ));
        $this->addElement('hidden', 'idpaymentmethod', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'provideremail', array(
            'required' => true,
            'validators' => array('EmailAddress')
        ));
        $this->addElement('hidden', 'idinvoicestatus', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'idcity', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'createdby', array(
            'required' => true
        ));
        $this->addElement('hidden', 'artifact', array(
            'required' => true
        ));
        $this->addElement('hidden', 'title', array(
            'required' => false
        ));
    }
}
?>
