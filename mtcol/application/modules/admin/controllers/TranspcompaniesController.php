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
            
            $sql = sprintf("SELECT SQL_CALC_FOUND_ROWS t.idtranspcompany, t.transpcompany, t.phone, t.email, t.address,
                            c.idcountry, c.country, ci.idcity, ci.city
                            FROM transp_company t, country c, city ci
                            WHERE c.idcountry = t.idcountry AND ci.idcountry = t.idcountry AND ci.idcity = t.idcity
                            ORDER BY t.transpcompany
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


}







