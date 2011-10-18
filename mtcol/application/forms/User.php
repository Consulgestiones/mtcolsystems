<?php
class Form_User extends Zend_Form {
    public function init(){
        $this->addElement('text', 'firstname', array(
            'required' => true
        ));
        $this->addElement('text', 'lastname', array(
            'required' => true
        ));
        $this->addElement('text', 'username', array(
            'required' => true,
            'validators' => array('Alnum')
        ));
        $this->addElement('text', 'useremail', array(
            'required' => true,
            'validators' => array(
                array('validator' => 'EmailAddress')
            )
        ));
        $this->addElement('text', 'idtypeid', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('text', 'idprofile', array(
            'required' => false,
            'validators' => array('Digits')
        ));
        $this->addElement('text', 'usernumid', array(
            'required' => true,
            'validators' => array('Digits')
        ));
        $this->addElement('text', 'userphonehome', array(
            'required' => true
        ));
        $this->addElement('text', 'userphonework', array(
            'required' => true
        ));
        $this->addElement('text', 'userphoneworkext', array(
            'required' => false
        ));
        $this->addElement('text', 'userworkemail', array(
            'required' => false,
            'validators' => array('EmailAddress')
        ));
        $this->addElement('text', 'boss', array(
            'required' => false
        ));
        $this->addElement('text', 'position', array(
            'required' => false
        ));
        $this->addElement('text', 'office', array(
            'required' => false
        ));
    }
}
?>
