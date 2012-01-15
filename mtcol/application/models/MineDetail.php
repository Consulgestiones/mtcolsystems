<?php

class Model_MineDetail extends Zend_Db_Table_Abstract
{
    public function getMine($start = 0, $limit = 0){
        $data= array();
        $limit = ($limit != 0)?'LIMIT '.$start.', '.$limit:'';
        
        $sql = sprintf("SELECT SQL_CALC_FOUND_ROWS * FROM MINE %s",$limit);
        
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
