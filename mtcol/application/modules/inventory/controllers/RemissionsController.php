<?php

class Inventory_RemissionsController extends Zend_Controller_Action
{
    private $db;
    private $idstocks;
    public function init()
    {
        $this->db = Zend_Registry::get('db');
    }

    public function indexAction()
    {
        // action body
    }

    public function getheadersAction()
    {
        $limit = $this->getRequest()->getParam('limit');
        $start = $this->getRequest()->getParam('start');
        
        $data = array();
        $total = 0;
        $msg = 1;
        
        try{
            
            $sql = sprintf("SELECT SQL_CALC_FOUND_ROWS r.idremission, r.remissionnumber, r.title, r.dremission, r.dcreate, r.status, 
                            r.drivername, r.drivernumid, r.vehicleplate, u.iduser, u.username, t.idtranspcompany,
                            t.transpcompany
                            FROM remission_header r, USER u, transp_company t
                            WHERE u.iduser = r.iduser AND t.idtranspcompany = r.idtranspcompany
                            ORDER BY r.dremission DESC
                            LIMIT %d, %d", $start, $limit);
            
            $db = Zend_Registry::get('db');
            $stmt = $db->query($sql);
            $data = $stmt->fetchAll();
            
            $sql = "SELECT FOUND_ROWS()";
            $stmt = $db->query($sql);
            $total = $stmt->fetchColumn();
            
            $success = true;
        }catch(Exception $e){
            $success = false;
            $msg = $e->getMessage();
        }
        $response = array(
            'success' => $success,
            'data' => $data,
            'total' => $total,
            'msg' => $msg
        );
        $this->_helper->json->sendJson($response);
    }

    public function putitemAction()
    {
        $idproduct = $this->getRequest()->getParam('idproduct');
        $quantity = $this->getRequest()->getParam('quantity');
        
        $msg = 1;
        $data = array();
        $index = 0;
        $acum = $quantity;
        $value = 0; 
        try{
            
            /* @var $db Zend_Db_Adapter */
            
            $total = $this->getTotalItem($idproduct);
            if(((float)$total) < ((float)$quantity))
                throw new Exception('No se cuenta con la cantidad de items solicitada');
            
            $db = Zend_Registry::get('db');
            $db->beginTransaction();
            
            $sql = sprintf("SELECT s.idstock, s.codstatus, s.idproduct, s.quantity, s.unitprice, s.totalprice, s.unitpricetax
                            FROM stock s
                            WHERE s.idproduct = %d AND s.codstatus = 'OCP'
                            ORDER BY s.idstock", $idproduct);
            
            $stmt = $db->query($sql);
            $stock = $stmt->fetchAll();      
            
//            print_r($stock);
//            die();
                       
            while($index < count($stock) && $acum){
                
                if(((float)$stock[$index]['quantity']) > $acum){
                    $value = ((float)$acum) * ((float)$stock[$index]['unitpricetax']); 
                    $acum = 0;
                }else{
                    $value += ((float)$stock[$index]['unitpricetax']) * ((float)$stock[$index]['quantity']);
                    $acum -= min($acum, ((float)$stock[$index]['quantity']));
                }               
                $index++;
            }
            
            $success = true;
        }catch(Exception $e){
            $success = false;
            $msg = $e->getMessage();
        }
        $response = array(
            'success' => $success,
            'value' => $value,
            'msg' => $msg
        );
        $this->_helper->json->sendJson($response);
    }

    private function getTotalItem($idproduct, $status = 'OCP')
    {
        try{
            $sql = sprintf("SELECT SUM(s.quantity) AS total
                            FROM stock s
                            WHERE s.idproduct = %d AND s.codstatus = '%s'", $idproduct, $status);
            
            $db = Zend_Registry::get('db');
            $stmt = $db->query($sql);
            
            $total = $stmt->fetchColumn();
        }catch(Exception $e){
            $total = 0;
        }
        return $total;
    }

    public function addremissionAction()
    {
        $headerData = json_decode(stripslashes($this->getRequest()->getParam('headerData')), true);
        $detailData = json_decode(stripslashes($this->getRequest()->getParam('detailData')), true);
        
        $this->idstocks = array();
        
        $data = array();
        $msg = 1;
        try{
            
            $this->db->beginTransaction();
            
            $formHeader = new Form_RemissionHeader();
            
            $headerData['dremission'] = toMySqlDate($headerData['dremission']);
            
            if(!$formHeader->isValid($headerData)){
                throw new Exception($e->getMessage());
            }
            
            
            //insertar el header y procesar el detail
            $remHeader = $formHeader->getValues(true);
            
            
            
            $this->db->commit();
            $success = true;
        }catch(Exception $e){
            $this->db->rollback();
            $success = false;
            $msg = $e->getMessage();
        }
        
    }
    private function processRemProduct($idproduct, $quantity){
        
        $msg = 1;
        try{
            
            //validar si se cuenta con la cantidad suficiente del producto en stock
            $totalItem = $this->getTotalItem($idproduct);
            
            if($totalItem < $quantity)
                throw new Exception('No se cuenta con la catidad suficiente');
            
            
        
            //Obtener el stock disponible del producto
            $prodStock = $this->getProductStock($idproduct);
            
            $acum = (float)$quantity;
            $cont = 0;
            $nrows = count($prodStock);
            $idstocks = array();
            
            $mStock = new Model_Stock();
            
            while($cont < $nrows && $acum){
                $row = $prodStock[$cont];
                $q = ((float)$row['quantity']);
                if($q > $acum){
                    
                    $new = clone $row;
                    $new['idstock'] = null;
                    $new['quantity'] = $acum;
                    $new['codstatus'] = 'TRN';
                    
                    $row['quantity'] = ($q - $acum);
                    
                    $this->idstocks[$idproduct][] = $mStock->insert($new);
                    $mStock->update($row, 'idstock = '.$row['idstock']);
                    
                }else{
                    
                    $row['codstatus'] = 'TRN';
                    $mStock->update($row, 'idstock = '.$row['idstock']);  
                    $this->idstocks[$idproduct][] = $row['idstock'];
                    
                }
                $acum -= min($q, $acum);
                $cont++;
            }
            
            
            $success = true;
        }catch(Exception $e){
            $success = false;
            $msg = $e->getMessage();
            $idstocks = null;
        }
        return $idstocks;
    }
    private function getProductStock($idproduct, $status = 'OCP'){
        $sql = sprintf("SELECT s.idstock, s.codstatus, s.idproduct, s.quantity, s.unitprice, s.totalprice, s.unitpricetax
                        FROM stock s
                        WHERE s.idproduct = %d AND s.codstatus = '%s'
                        ORDER BY s.idstock", $idproduct, $status);
        $stmt = $this->db->query($sql);
        $prodStock = $stmt->fetchAll();
        return $prodStock;
    }


}









