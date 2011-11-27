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
        $status = $this->getRequest()->getParam('status');        
        
        
        $data = array();
        $msg = 1;
        $total = 0;
        $db = Zend_Registry::get('db');
        try{
            
            $where = (!empty($status))?"AND t.inactive != ".($status == 'active')?1:0:"";
            
            $sql = sprintf("SELECT SQL_CALC_FOUND_ROWS t.idtranspcompany, t.transpcompany, t.phone, t.email, t.address,
                            c.idcountry, c.country, ci.idcity, ci.city, t.inactive, CASE t.inactive WHEN 0 THEN 'Activo' ELSE 'Inactivo' END as active
                            FROM transp_company t, country c, city ci
                            WHERE c.idcountry = t.idcountry %s AND ci.idcountry = t.idcountry AND ci.idcity = t.idcity
                            ORDER BY t.transpcompany
                            LIMIT %d, %d", $where, $start, $limit);
            
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

    public function savecompanyAction()
    {
        $post = json_decode(stripslashes($this->getRequest()->getParam('params')), true);
        
        /* @var $fTranspCompany Zend_Form */
        $fTranspCompany = new Form_TranspCompany();
        $data = array();
        $msg = 1;
        $action = '';
        try{
            
            if(!$fTranspCompany->isValid($post))
                throw new Exception(json_encode($fTranspCompany->getMessages()));
            
            
            $data = $fTranspCompany->getValues();
            
            $mTrasnpCompany = new Model_TranspCompany();
            
            if($post['idtranspcompany'] == 0){
                $idcompany = $mTrasnpCompany->insert($data);
                $action = 'create';
            }
            else{
                $idcompany = (!is_nan($mTrasnpCompany->update($data, "idtranspcompany = ".$post['idtranspcompany'])))?$post['idtranspcompany']:NULL;
                $action = 'update';
            }
            
            if(!$idcompany)
                throw new Exception('Error al guardar la información');
            
            $data = $this->getcompanyAction($idcompany);
            
            $success = true;
            
        }catch(Exception $e){
            $success = false;
            $msg = $e->getMessage();
        }
        
        $response = array(
            'success' => $success,
            'data' => $data,
            'msg' => $msg,
            'action' => $action
        );
        
        $this->_helper->json->sendJson($response);
    }

    public function getcompanyAction($idcompany)
    {
        $sql = sprintf("SELECT t.idtranspcompany, t.transpcompany, t.phone, t.email, t.address,
                        c.idcountry, c.country, ci.idcity, ci.city
                        FROM transp_company t, country c, city ci
                        WHERE t.idtranspcompany = %d AND c.idcountry = t.idcountry AND ci.idcountry = t.idcountry AND ci.idcity = t.idcity", $idcompany);
        
        $db = Zend_Registry::get('db');
        $stmt = $db->query($sql);
        $company = $stmt->fetch();
        
        return ($company)?$company:NULL;
    }

    public function activeinactiveAction()
    {
        $idtranspcompany = $this->getRequest()->getParam('idtranspcompany');
        $msg = 1;
        try{
            
            $sql = sprintf("UPDATE transp_company t SET t.inactive = CASE t.inactive WHEN 1 THEN 0 ELSE 1 END
                        WHERE t.idtranspcompany = %d", $idtranspcompany);
            /* @var $db Zend_Db_Adapter */
            $db = Zend_Registry::get('db');
            
            $db->query($sql);
            
            $success = true;
            
        }catch(Exception $e){
            $success = false;
            $msg = $e->getMessage();
        }                
        
        $response = array(
            'success' => $success,
            'msg' => $msg
        );
        $this->_helper->json->sendJson($response);
    }


}









