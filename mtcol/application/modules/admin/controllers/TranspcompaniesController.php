<?php

class Admin_TranspcompaniesController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function getcompaniesAction()
    {
        $limit = $this->getRequest()->getParam('limit');
        $start = $this->getRequest()->getParam('start');
        
        $data = array();
        $msg = 1;
        $total = 0;
        $db = Zend_Registry::get('db');
        try{
            
            $sql = sprintf("SELECT SQL_CALC_FOUND_ROWS t.idtranspcompany, t.trasnspcompany, t.phone, t.email, t.address,
                            c.idcountry, c.country, ci.idcity, ci.city
                            FROM transportation_company t, country c, city ci
                            WHERE c.idcountry = t.idcountry AND ci.idcountry = t.idcountry AND ci.idcity = t.idcity
                            ORDER BY t.trasnspcompany
                            LIMIT %d, %d", $start, $limit);
            
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



