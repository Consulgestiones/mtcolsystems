<?php
class Model_RemissionStock extends Zend_Db_Table_Abstract {
    protected $_name = 'remission_stock';
    protected $_primary = array('idremission', 'idproduct', 'idstock');
}
?>
