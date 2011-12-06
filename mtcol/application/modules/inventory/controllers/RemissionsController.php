<?php

class Inventory_RemissionsController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
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
            
            $total = $this->gettotalitemAction($idproduct);
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

    public function gettotalitemAction($idproduct)
    {
        try{
            $sql = sprintf("SELECT SUM(s.quantity) AS total
                            FROM stock s
                            WHERE s.idproduct = %d AND s.codstatus = 'OCP'", $idproduct);
            
            $db = Zend_Registry::get('db');
            $stmt = $db->query($sql);
            
            $total = $stmt->fetchColumn();
        }catch(Exception $e){
            $total = 0;
        }
        return $total;
    }


}







