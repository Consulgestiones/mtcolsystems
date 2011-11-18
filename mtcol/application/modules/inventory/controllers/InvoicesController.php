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
        $total = 0;
        $invoices = array();
        try{
            
            $db = Zend_Registry::get('db');
            
            $sql = sprintf("SELECT SQL_CALC_FOUND_ROWS i.idinvoice, i.invoicenumber, i.dinvoice, i.productservice, i.createdby,
                            i.subtotal, i.tax, i.total, c.idcity, c.city, ct.idcountry, ct.country,
                            p.idprovider, p.provider, p.providernumid, p.provideremail, p.providerphone, x.idinvoicestatus, x.invoicestatus,
                            pm.idpaymentmethod, pm.paymentmethod
                            FROM invoice_header i, provider p, city c, country ct, invoice_status x, payment_method pm
                            WHERE p.idprovider = i.idprovider AND c.idcity = i.idcity 
                                            AND c.idcountry = i.idcountry AND ct.idcountry = c.idcountry
                                            AND x.idinvoicestatus = i.idinvoicestatus
                                            AND pm.idpaymentmethod = i.idpaymentmethod
                            ORDER BY i.dinvoice DESC
                            LIMIT %d, %d", $start, $limit);
            
            $stmt = $db->query($sql);
            
            $invoices = $stmt->fetchAll();
            
            $sql = "SELECT FOUND_ROWS()";
            $stmt = $db->query($sql);
            $total = $stmt->fetchColumn();
            
            $success = true;
            $msg = 1;
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

    public function getinvoicedetailAction()
    {
        $idinvoice = $this->getRequest()->getParam('idinvoice');
        
        $data = array();
        $msg = 1;
        try{
            
            $sql = sprintf("SELECT i.item, i.idinvoice, i.quantity, i.unitprice, i.totalprice, (i.totalprice * p.tax / 100) as producttax, (i.totalprice * (concat('1.', p.tax))) as total_tax, p.idproduct, p.product, p.unit
                            FROM invoice_detail i, product p
                            WHERE i.idinvoice = %d AND p.idproduct = i.idproduct", $idinvoice);
            
            $db = Zend_Registry::get('db');
            
            $stmt = $db->query($sql);
            
            $data = $stmt->fetchAll();
            $success = true;
        }catch(Exception $e){
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

    public function addinvoiceAction()
    {        
        $header = json_decode(stripslashes($this->getRequest()->getParam('header')));
        
        $detail = json_decode(stripslashes($this->getRequest()->getParam('detail')));
        
        $data = array();
        $msg = 1;
        
        try{
            
            $db = Zend_Registry::get('db');
            
            $db->beginTransaction();
            
            $minvoice = new Model_Invoice();
            
            //agregar datos que no vienen desde el cliente
            $header->createdby = 'Juan Carlos Giraldo';
            $header->dcreate = time();
            
            $hdata = get_object_vars($header);
            
            
            
            $minvoice->insert($hdata);
            
            $data['idinvoice'] = $minvoice->lastInsertId();
            
//            $sql = sprintf("INSERT INTO invoice_header (invoicenumber, idcity, idcountry, idprovider, idinvoicestatus, productservice, idpaymentmethod, createdby, subtotal, tax, total, dinvoice, dcreate, dlastmodification) 
//                            VALUES ('%s', %d, %d, %d, %d, '%s', %d, '%s', %f, %f, %f, '%s', now(), NULL);",
//                    $header->invoicenumber,
//                    $header->idcity,
//                    $header->idcountry,
//                    $header->idprovider,
//                    $header->idinvoicestatus,
//                    $header->productservice,
//                    $header->idpaymentmethod,
//                    'Juan Carlos Giraldo',
//                    $header->subtotal,
//                    $header->tax,
//                    $header->total,
//                    $header->dinvoice                    
//                    );
            
            
            
            $db->commit();
            $success = true;
        }catch(Exception $e){
            $db->rollBack();
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







