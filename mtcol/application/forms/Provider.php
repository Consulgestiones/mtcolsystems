<?php
class Form_Provider extends Zend_Form {
    public function init(){
        $this->addElement('hidden', 'idprovider', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'idtypeid', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'idcity', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'idcountry', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('hidden', 'provider', array(
            'required' => true
        ));
        $this->addElement('hidden', 'providernumid', array(
            'required' => true
        ));
        $this->addElement('hidden', 'providerphone', array(
            
        ));
        $this->addElement('hidden', 'provideremail', array(
            'validators' => array('emailAddress')
        ));
        $this->addElement('hidden', 'provideraddress', array(
            
        ));
        $this->addElement('hidden', 'contact', array(
            
        ));
        $this->addElement('hidden', 'contacttitle', array(
            
        ));
        $this->addElement('hidden', 'contactphonehome', array(
            
        ));
        $this->addElement('hidden', 'contactphonework', array(
            
        ));
        $this->addElement('hidden', 'contactphoneworkext', array(
            'validators' => array(
                array('stringLength', false, array(1, 5))
            )
        ));
        $this->addElement('hidden', 'contactphonemobile', array(
            
        ));
        
    }
}
?>
