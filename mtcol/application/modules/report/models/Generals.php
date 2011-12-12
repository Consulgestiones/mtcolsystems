<?php
class Report_Model_Generals extends Zend_Db_Table_Abstract {
    public function getStockDistribution(){
        try{
            
            $sql = "SELECT st.codstatus, st.description, IFNULL(SUM(s.totalprice), 0) AS total, ROUND((IFNULL(SUM(s.totalprice), 0) / (
                    SELECT SUM(s1.totalprice)
                    FROM stock s1) * 100), 2) AS percent, CONCAT(st.codstatus, ' ', ROUND((IFNULL(SUM(s.totalprice), 0) / (
                    SELECT SUM(s1.totalprice)
                    FROM stock s1) * 100), 2), '%') AS label
                    FROM stock_status st
                    LEFT JOIN stock s ON s.codstatus = st.codstatus
                    GROUP BY st.codstatus, st.description
                    HAVING total > 0";
            
            $db = $this->getDefaultAdapter();
            
            $stmt = $db->query($sql);
            $data = $stmt->fetchAll();
            
        }catch(Exception $e){
            $data = null;
        }
        return $data;
    }
}
?>
