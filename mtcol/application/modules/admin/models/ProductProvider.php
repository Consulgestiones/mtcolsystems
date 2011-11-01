<?php
class Admin_Model_ProductProvider extends Zend_Db_Table_Abstract {
    protected $_name = 'product_provider';
    protected $_primary = array('idproduct', 'idprovider');
}
?>
