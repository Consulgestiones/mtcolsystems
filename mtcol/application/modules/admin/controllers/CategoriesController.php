<?php

class Admin_CategoriesController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function getcategoriesAction()
    {
        $start = $this->getRequest()->getParam('start');
        $limit = $this->getRequest()->getParam('limit');
        $categories = array();
        $total = 0;
        try{
            $sql = sprintf("SELECT SQL_CALC_FOUND_ROWS c.idproductcategory, c.productcategory,
                    c.description, CASE c.inactive WHEN 1 THEN 'NO' WHEN 0 THEN 'SI' END as active,
                    c.inactive
                    FROM product_category c
                    LIMIT %d, %d", $start, $limit);

            $db = Zend_Registry::get('db');

            $stmt = $db->query($sql);
            $categories = $stmt->fetchAll();

            $sql = "SELECT FOUND_ROWS()";
            $stmt = $db->query($sql);
            $total = $stmt->fetchColumn();
            
            $success = true;
        }catch(Exception $e){
            $success = false;
            $msg = $e->getMessage();
        }
        $data = array(
            'success' => $success,
            'data' => $categories,
            'msg' => $msg,
            'total' => $total
        );
        
        $this->_helper->json->sendJson($data);
    }

    public function saveAction()
    {
        $idproductcategory = $this->getRequest()->getParam('idproductcategory');
        $productcategory = $this->getRequest()->getParam('productcategory');
        $description = $this->getRequest()->getParam('description');
        $inactive = $this->getRequest()->getParam('inactive');
        $data = array();
        try{
            $vdigits = new Zend_Validate_Digits();
            $vstring = new Zend_Validate_NotEmpty();

            if(!$vdigits->isValid($idproductcategory) || !$vstring->isValid($productcategory))
                throw new Exception('la información no es correcta');
            
            $data = array(
                'idproductcategory' => ($idproductcategory)?$idproductcategory:null,
                'productcategory' => $productcategory,
                'description' => $description,
                'inactive' => $inactive
            );
            $model = new Model_ProductCategory();
            if(!$idproductcategory){
                $idproductcategory = $model->insert($data);
                
                if(!$idproductcategory)
                    throw new Exception('Error al crear la categoria');
                
                $data['idproductcategory'] = $idproductcategory;
                $data['inactive'] = $inactive;
            }else{
                $update = $model->update($data, "idproductcategory = ".$idproductcategory);
                if(is_nan($update))
                    throw new Exception('Error al modificar la categoría');
            }
            $data['active'] = ($inactive)?'NO':'SI';
            $success = true;
        }catch(Exception $e){                        
            $success = false;
            $msg = $e->getMessage();
        }
        $resp = array(
            'success' => $success,
            'data' => $data,
            'msg' => $msg
        );
        
        $this->_helper->json->sendJson($resp);
    }

    public function inactivateAction()
    {
        $idproductcategory = $this->getRequest()->getParam('idproductcategory');
        
        try{
            $sql = sprintf("UPDATE product_category c SET c.inactive = CASE c.inactive WHEN 1 THEN 0 ELSE 1 END
                            WHERE c.idproductcategory = %d", $idproductcategory);
            
            $db = Zend_Registry::get('db');
            
            $stmt = $db->exec($sql);
//            $stmt = $db->query($sql);
//            $result = $stmt->exec();
            
            $sql = sprintf("SELECT CASE inactive WHEN 1 THEN 'NO' ELSE 'SI' END FROM product_category WHERE idproductcategory = %d", $idproductcategory);
            $stmt = $db->query($sql);
            $inactive = $db->fetchOne($sql);
            
            $success = true;
        }catch(Exception $e){
            $success = false;
            $msg = $e->getMessage();                   
        }        
        $resp = array(
            'success' => $success,
            'msg' => $msg,
            'active' => $inactive
        );
        $this->_helper->json->sendJson($resp);
        
    }

    public function getsubcategoriesAction()
    {
        $idproductcategory = $this->getRequest()->getParam('idproductcategory');
        $start = $this->getRequest()->getParam('start');
        $limit = $this->getRequest()->getParam('limit');
        
        $subcat = array();
        try{
            $db = Zend_Registry::get('db');
            $select = sprintf("SELECT SQL_CALC_FOUND_ROWS s.idproductsubcategory, s.idproductcategory, s.productsubcategory, s.description, 
                                        CASE s.inactive WHEN 1 THEN 'NO' ELSE 'SI' END AS active, s.inactive
                                FROM product_subcategory s
                                WHERE s.idproductcategory = %d
                                ORDER BY s.productsubcategory
                                LIMIT %d, %d", $idproductcategory, $start, $limit);
            
            $stmt = $db->query($select);
            $subcat = $stmt->fetchAll();
            
            $sql = "SELECT FOUND_ROWS()";
            $stmt = $db->query($sql);
            $total = $stmt->fetchColumn();
                    
            $success = true;
        }catch(Exception $e){
            $success = false;
            $msg = $e->getMessage();
        }
        $resp = array(
            'success' => $success,
            'data' => $subcat,
            'total' => $total,
            'msg' => $msg
        );
        
        $this->_helper->json->sendJson($resp);
    }


}









