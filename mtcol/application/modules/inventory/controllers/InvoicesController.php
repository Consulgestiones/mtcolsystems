<?php

class Inventory_InvoicesController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function getinvoicesAction()
    {
        $start = $this->getRequest()->getParam('start');
        $limit = $this->getRequest()->getParam('limit');
        
        try{
            
            $db = Zend_Registry::get('db');
            
            $sql = sprintf("SELECT SQL_CALC_FOUND_ROWS i.idinvoice, i.invoicenumber, i.dinvoice, i.productservice, i.createdby,
                            i.subtotal, i.tax, i.total, c.idcity, c.city, ct.idcountry, ct.country,
                            p.idprovider, p.provider, p.providernumid
                            FROM invoice_header i, provider p, city c, country ct
                            WHERE p.idprovider = i.idprovider AND c.idcity = i.idcity 
                                            AND c.idcountry = i.idcountry AND ct.idcountry = c.idcountry
                            ORDER BY i.dinvoice DESC
                            LIMIT %d, %d", $start, $limit);
            
            $stmt = $db->query($sql);
            
            $invoices = $stmt->fetchAll();
            
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
            'data' => $invoices,
            'total' => $total,
            'msg' => $msg
        );
        
        $this->_helper->json->sendJson($data);
    }


}



