<?php
class Model_RemissionDetail extends Zend_Db_Table_Abstract {
    protected $_name = 'remission_detail';
    protected $_primary = array('item', 'idremission');
    
    public function getDetail($idremission){
        try{
            $db = $this->getDefaultAdapter();
            $sql = sprintf("SELECT rd.item, rd.idremission, rd.quantity, rd.itemvalue, rd.unitvalue,
                            p.idproduct, p.product
                            FROM remission_detail rd, product p
                            WHERE rd.idremission = %d AND p.idproduct = rd.idproduct", $idremission);
            
            $stmt = $db->query($sql);
            $data = $stmt->fetchAll();            
        }catch(Exception $e){            
            $data = null;
        }            
        return $data;
    }
}
?>
