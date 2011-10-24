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
        
        $select = sprintf("SELECT SQL_CALC_FOUND_ROWS p.idproduct, p.product, p.description, p.tax,
                    pc.productcategory, pc.productcategory, ps.idproductsubcategory, ps.productsubcategory
                    FROM product p, product_category pc, product_subcategory ps
                    WHERE ps.idproductcategory = p.idproductcategory AND ps.idproductsubcategory = p.idproductsubcategory AND pc.idproductcategory = ps.idproductcategory
                    ORDER BY p.product, pc.productcategory, ps.productsubcategory
                    LIMIT %d, %d", $start, $limit);
        
        $db = Zend_Registry::get('db');
        
        $products = array();
        
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


}



