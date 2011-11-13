<?php
class Model_InvoiceDetail extends Zend_Db_Table_Abstract {
    protected $_name = 'invoice_detail';
    protected $_primary = array('item', 'idinvoice');
}
?>
