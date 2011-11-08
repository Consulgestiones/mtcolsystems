<?php
class Model_Productprovider extends Zend_Db_Table_Abstract {
    protected $_name = 'product_provider';
    protected $_primary = array('idproduct', 'idprovider');
}
?>