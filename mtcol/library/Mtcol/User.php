<?php
class Mtcol_User extends Mtcol_Abstract {
    protected $_iduser = "";
    protected $_idprofile = "";
    protected $_firstname = "";
    protected $_lastname = "";
    protected $_username = "";
    protected $_password = "";
    protected $_useremail = "";
    protected $_userphonehome = "";
    protected $_userphonework = "";
    protected $_userphonemobile = "";
    protected $_userphoneworkext = "";
    protected $_useraddress = "";
    protected $_creationdate = "";
    protected $_applications = array();
    protected $_menu = array();
    
    public function __construct($options){
        if(is_array($options)){
            foreach($options as $k => $v){
                $key = '_'.$k;
                if(isset($this->$key))
                    $this->$key = $v;
            }
        }
    }
    
    public function getIduser() {
        return $this->_iduser;
    }

    public function setIduser($_iduser) {
        $this->_iduser = $_iduser;
    }

    public function getIdprofile() {
        return $this->_idprofile;
    }

    public function setIdprofile($_idprofile) {
        $this->_idprofile = $_idprofile;
    }

    public function getFirstname() {
        return $this->_firstname;
    }

    public function setFirstname($_firstname) {
        $this->_firstname = $_firstname;
    }

    public function getLastname() {
        return $this->_lastname;
    }

    public function setLastname($_lastname) {
        $this->_lastname = $_lastname;
    }

    public function getUsername() {
        return $this->_username;
    }

    public function setUsername($_username) {
        $this->_username = $_username;
    }

    public function getPassword() {
        return $this->_password;
    }

    public function setPassword($_password) {
        $this->_password = $_password;
    }

    public function getUseremail() {
        return $this->_useremail;
    }

    public function setUseremail($_useremail) {
        $this->_useremail = $_useremail;
    }

    public function getUserphonehome() {
        return $this->_userphonehome;
    }

    public function setUserphonehome($_userphonehome) {
        $this->_userphonehome = $_userphonehome;
    }

    public function getUserphonework() {
        return $this->_userphonework;
    }

    public function setUserphonework($_userphonework) {
        $this->_userphonework = $_userphonework;
    }

    public function getUserphonemobile() {
        return $this->_userphonemobile;
    }

    public function setUserphonemobile($_userphonemobile) {
        $this->_userphonemobile = $_userphonemobile;
    }

    public function getUserphoneworkext() {
        return $this->_userphoneworkext;
    }

    public function setUserphoneworkext($_userphoneworkext) {
        $this->_userphoneworkext = $_userphoneworkext;
    }

    public function getUseraddress() {
        return $this->_useraddress;
    }

    public function setUseraddress($_useraddress) {
        $this->_useraddress = $_useraddress;
    }

    public function getCreationdate() {
        return $this->_creationdate;
    }

    public function setCreationdate($_creationdate) {
        $this->_creationdate = $_creationdate;
    }
    
    public function getApplications(){
        return $this->_applications;
    }
    
    public function setApplications($apps){
        $this->_applications = (is_array($apps))?$apps:array();
    }
    
    public function getMenu(){
        return $this->_menu;
    }
    
    public function setMenu($menu){
        $this->_menu = (is_array($menu))?$menu:array();
    }
}

?>
