<?php

class Model_SectionsDetail extends Zend_Db_Table_Abstract
{
    protected $_name = 'section';
    protected $_primary =  'idsection';
    
    public function getSection($start = 0, $limit = 0){
        $data = array();
        $limit = ($limit != 0)?'LIMIT '.$start.', '.$limit:'';
        
        $sql = sprintf("SELECT SQL_CALC_FOUND_ROWS * FROM SECTION %s",$limit);
        
        $db = $this->getDefaultAdapter();
        $stmt = $db->query($sql);
        $data = $stmt->fetchAll();
        
        $sql = 'SELECT FOUND_ROWS()';
        $stmt = $db->query($sql);
        $total = $stmt->fetchColumn();
        
        $result = array(
            'data' => $data,
            'total' => $total
        );
        
        return $result;
    
}
}

?>
