<?php

class Inventory_RemissionsController extends Zend_Controller_Action
{
    private $db;
    private $idstocks;
    private $user;
    private $session;
    public function init()
    {
        $this->session = new Zend_Session_Namespace('Default');
        $this->db = Zend_Registry::get('db');
        $this->user = $this->session->user;
                
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
        $headerData = json_decode(stripslashes($this->getRequest()->getParam('remHeader')), true);
        $detailData = json_decode(stripslashes($this->getRequest()->getParam('remDetail')), true);        
        
        $this->idstocks = array();
        
        $data = array();
        $msg = 1;
        try{
            
            $this->db->beginTransaction();
            
            $formHeader = new Form_RemissionHeader();
            
            $headerData['dremission'] = Functions::toMySqlDate($headerData['dremission']);
            
            if(!$formHeader->isValid($headerData)){
                throw new Exception(json_encode($formHeader->getMessages()));
            }
            
            
            //insertar el header y procesar el detail
            $remHeader = $formHeader->getValues(true);
            
            $remNumber = $this->getNextRemission();
            
            if(!$remNumber)
                throw new Exception('Error al generar la nueva remisión');
            
            $remHeader['remissionnumber'] = $remNumber;
            $remHeader['status'] = 'REM'; // Estado de la remision REM = REMITIDA
            $remHeader['title'] = (!empty($remHeader['title']))?$remHeader['title']:'Remisión '.$remNumber;
            $remHeader['iduser'] = $this->user['iduser'];
            $remHeader['dcreate'] = Functions::getCurrentTime();
            
            //Instanciar modelo de encabezado de remision para insertar
            $mHeaderDetail = new Model_RemissionHeader();
            
            //Insertar encabezado de la remision
            $idremission = $mHeaderDetail->insert($remHeader);
            
            //Instanciar modelo de detalle para insersiones
            $mRemDetail = new Model_RemissionDetail();
            
            //instanciar formulario de detalle para validar la informacion de cada item
            $fRemDetail = new Form_RemissionDetail();
            
            //Procesar detalle
                        
            $itempricetax = 0;
            foreach($detailData as $item){
                $item['unitvalue'] = ((float)$item['itemvalue'])/((float)$item['quantity']);
                $item['idremission'] = $idremission;
                if(!$fRemDetail->isValid($item))
                    throw new Exception(json_encode($fRemDetail->getMessages()));
//                    throw new Exception('Error en el detalle de la remisión');
                
                $itemData = $fRemDetail->getValues(true);
                $mRemDetail->insert($itemData);
                $this->processRemProduct($item['idproduct'], $item['quantity']);
                
                $itempricetax += ((float)$item['itemvalue']);
                
            }
            
            //Registrar los stocks que va a manejar la remision
            if(!$this->crossRemStock($idremission)){
                throw new Exception('Error al asociar el stock');
            }
            
            Functions::addTransaction('REM', $itempricetax, $this->user['iduser']);
            
            
            
            
            $this->db->commit();
            $success = true;
        }catch(Exception $e){
            $this->db->rollback();
            $success = false;
            $msg = $e->getMessage();
        }
        $response = array(
            'data' => $data,
            'success' => $success,
            'msg' => $msg
        );
        $this->_helper->json->sendJson($response);
        
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
                    
                    $new = $row;
                    //Actualizar informacion del nuevo registro
                    $new['idstock'] = null;
                    $new['quantity'] = $acum;
                    $new['codstatus'] = 'TRN';
                    $new['totalprice'] = ((float)$new['quantity']) * ((float)$new['unitpricetax']);
                    
                    //Actualizar registro actual
                    $row['quantity'] = ($q - $acum);
                    $row['totalprice'] = ((float)$row['quantity']) * ((float)$row['unitpricetax']);
                    
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
//        return $idstocks;
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
    private function getNextRemission(){
        try{
            $sql = "SELECT IFNULL(MAX(r.remissionnumber), 0) + 1 AS nextremission
                    FROM remission_header r";
            
            $stmt = $this->db->query($sql);
            $nextremission = $stmt->fetchColumn();
        }catch(Exception $e){
            $nextremission = 0;
        }
        return $nextremission;
    }
    
    private function crossRemStock($idremission){
        try{
            $model = new Model_RemissionStock();
            foreach($this->idstocks as $idproduct => $stocks){
                foreach($stocks as $idstock){
                    $model->insert(array(
                        'idremission' => $idremission,
                        'idproduct' => $idproduct,
                        'idstock' => $idstock
                    ));
                }                
            }
            $success = true;
        }catch(Exception $e){
            $success = false;
        }
        return $success;
    }
}









