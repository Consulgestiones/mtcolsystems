<?php
class Model_WorkOrder extends Zend_Db_Table_Abstract {
    protected $_name = 'workorder_header';
    protected $_primary = 'idworkorder';
    
    public function getWorkOrderHeaders($start = 0, $limit = 0){
        $db = $this->getDefaultAdapter();
        
        $select = $db->select()
                ->from(array('wo' => 'workorder_header'))
                ->join(array('m' => 'mine'), 'm.idmine = wo.idmine', array('mine'))
                ->join(array('s' => 'section'), 's.idsection = wo.idsection', array('section'))
                ->limit($limit, $start);
        $stmt = $db->query($select);
        $data = $stmt->fetchAll();
        return $data;
    }
}
?>
