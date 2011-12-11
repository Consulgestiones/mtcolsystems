<?php
class Model_RemissionDetail extends Zend_Db_Table_Abstract {
    protected $_name = 'remission_detail';
    protected $_primary = array('item', 'idremission');
}
?>
