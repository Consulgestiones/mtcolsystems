<?php

class Admin_ProductsController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function getproductsAction()
    {
        $start = $this->getRequest()->getParam('start');
        $limit = $this->getRequest()->getParam('limit');
        $query = $this->getRequest()->getParam('query');
        
        $filter = (!empty($query))?"lower(p.product) LIKE '".$query."%' AND ":"";
        
        $select = sprintf("SELECT SQL_CALC_FOUND_ROWS p.idproduct, p.product, p.description, p.tax, p.unit,
                    p.inactive, CASE p.inactive WHEN 0 THEN 'SI' ELSE 'NO' END AS active,
                    pc.productcategory, pc.productcategory, ps.idproductsubcategory, ps.productsubcategory
                    FROM product p, product_category pc, product_subcategory ps
                    WHERE %s ps.idproductcategory = p.idproductcategory AND ps.idproductsubcategory = p.idproductsubcategory AND pc.idproductcategory = ps.idproductcategory
                    ORDER BY p.product, pc.productcategory, ps.productsubcategory
                    LIMIT %d, %d", $filter, $start, $limit);
        
        $db = Zend_Registry::get('db');
        
        $products = array();
        $msg = 1;
        try{
            $stmt = $db->query($select);
            $products = $stmt->fetchAll();
            
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
            'data' => $products,
            'msg' => $msg
        );
        
        $this->_helper->json->sendJson($data);
    }

    public function getprodsfromproviderAction()
    {
        $idprovider = $this->getRequest()->getParam('idprovider');
        
        $data = array();
        $msg = 1;
        try{
            $sql = sprintf("SELECT p.idproduct, p.product, p.description, p.tax, p.inactive, CASE p.inactive WHEN 0 THEN 'SI' ELSE 'NO' END AS active,
                            pc.idproductcategory, pc.productcategory, ps.idproductsubcategory, ps.productsubcategory, p.unit
                            FROM product p, product_category pc, product_subcategory ps, product_provider pp
                            WHERE pp.idprovider = 1 AND p.idproduct = pp.idproduct 
                            AND pc.idproductcategory = p.idproductcategory 
                            AND ps.idproductcategory = p.idproductcategory 
                            AND ps.idproductsubcategory = p.idproductsubcategory", $idprovider);
            
            $db = Zend_Registry::get('db');
            $stmt = $db->query($sql);
            $data = $stmt->fetchAll();
            $success = true;
        }catch(Exception $e){
            $success = false;
            $msg = $e->getMessage();
        }
        $response = array(
            'success' => $success,
            'data' => $data,
            'msg' => $msg
        );
        $this->_helper->json->sendJson($response);
    }


}





