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


}



