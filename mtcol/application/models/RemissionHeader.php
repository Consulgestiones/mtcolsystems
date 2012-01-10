<?php
class Model_RemissionHeader extends Zend_Db_Table_Abstract {
    protected $_name = 'remission_header';
    protected $_primary = 'idremission';
    
    public function getReceiveRemHeaders(){
        
        try{
            $db = $this->getDefaultAdapter();
            $data = array();
            $sql = "SELECT r.idremission, u.iduser, CONCAT(u.firstname, ' ', u.lastname) AS 'user', t.idtranspcompany, t.transpcompany, 
                    r.idremission, r.remissionnumber, r.title, date_format(r.dcreate, '%d/%m/%Y') as dcreate, date_format(r.dremission, '%d/%m/%Y') as dremission, r.codstatus, r.drivername,
                    r.drivernumid, r.vehicleplate
                    FROM remission_header r, user u, transp_company t
                    WHERE u.iduser = r.iduser AND t.idtranspcompany = r.idtranspcompany
                    AND r.codstatus = 'REM'";

            $stmt = $db->query($sql);
            $data = $stmt->fetchAll();

        }catch(Exception $e){
            $data = null;
        }   
        return $data;
    }
    public function getReceiveDetail($idremission){
        try{
            $db = $this->getDefaultAdapter();
            $sql = sprintf("SELECT rd.item, rd.quantity, rd.itemvalue, rd.unitvalue,
                            p.idproduct, p.product, p.unit, rs.idstock
                            FROM remission_detail rd, product p, remission_stock rs
                            WHERE rd.idremission = %d AND p.idproduct = rd.idproduct 
                            AND rs.idremission = rd.idremission AND rs.idproduct = rd.idproduct", $idremission);
            
            $stmt = $db->query($sql);
            $data = $stmt->fetchAll();
        }catch(Exception $e){
            $data = null;
        }
        return $data;
    }
}
?>
