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
        //Obtener base de datos
        $db = Zend_Registry::get('db');
        try{      
            //iniciar transaccion protegida
            $db->beginTransaction();
            
            //agregar datos que no vienen desde el cliente
            $header->createdby = 'Juan Carlos Giraldo';
            $header->dcreate = time();
            
            //Obtener datos del objeto header en forma de array
            $hdata = get_object_vars($header);                        
            
            //Instancia del formulario InvoiceHeader
            /* @var $fInvoiceHeader Zend_Form */
            $fInvoiceHeader = new Form_InvoiceHeader();
            
            //Valida datos recibidos por medio del formulario
            if(!$fInvoiceHeader->isValid($hdata))
                    throw new Exception(json_encode($fInvoiceHeader->getMessages()));
            
            $fields = $fInvoiceHeader->getElements();
            
            $ihData = $fInvoiceHeader->getValidValues($hdata);
            
            print_r($ihData);

            //Instanciar modelo invoice header
            $mInvoice = new Model_Invoice();                        
            
            //insertar datos en la tabla invoice_header
            $mInvoice->insert($ihData);
            
            //obtener ultimo id insertado
            $idinvoice = $minvoice->lastInsertId();
            
            //datos de la factura que no vienen en el encabezado
            $subtotal = 0;
            $tax = 0;
            $total = 0;
            
            $detailData = array();
            
            //instancia de formulario de detalle de factura para validar los datos
            $fInvoiceDetail = new Form_InvoiceDetail();
            
            //tabla de detalle de factura
            $mInvoiceDetail = new Model_InvoiceDetail();
            
            //procesar detalle de la factura            
            $nItem = 1;
            foreach($detail as $item){
                $iData = get_object_vars($item);
                $iData['idinvoice'] = $idinvoice;
                $iData['item'] = $nItem;
                $detailData[] = $iData;
                $subtotal += $iData['unitprice'];
                $tax += $iData['taxvalue'];
                $total += $iData['totalprice'];        
                if(!$fInvoiceDetail->isValid($iData))
                    throw new Exception(json_encode($fInvoiceDetail->getMessages()));
                
                if(!$mInvoiceDetail->insert($iData))
                    throw new Exception('Error al ingresar el detalle de la factura');
                
                $nItem++;
            }
            
            $dUpdate = array(
                'subtotal' => $subtotal,
                'tax' => $tax,
                'total' => $total
            );
            
            if(!$mInvoice->update($dUpdate, "idinvoice = ".$idinvoice))
                throw  new Exception ('Error al actualizar la información de la factura');

            //confirmar transaccion
            $db->commit();
            
            $data = $this->getinvoiceheaderAction($idinvoice);
            
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

    public function getinvoiceheaderAction($idinvoice)
    {
        try{
            $sql = sprintf("SELECT i.idinvoice, i.invoicenumber, i.dinvoice, i.productservice, i.createdby,
                            i.subtotal, i.tax, i.total, c.idcity, c.city, ct.idcountry, ct.country,
                            p.idprovider, p.provider, p.providernumid, p.provideremail, p.providerphone, x.idinvoicestatus, x.invoicestatus,
                            pm.idpaymentmethod, pm.paymentmethod
                            FROM invoice_header i, provider p, city c, country ct, invoice_status x, payment_method pm
                            WHERE i.idinvoice = %d
                            AND p.idprovider = i.idprovider AND c.idcity = i.idcity 
                                            AND c.idcountry = i.idcountry AND ct.idcountry = c.idcountry
                                            AND x.idinvoicestatus = i.idinvoicestatus
                                            AND pm.idpaymentmethod = i.idpaymentmethod", $idinvoice);
            
            $db = Zend_Registry::get('db');
            
            $stmt = $db->query($sql);
            
            $invoice = $stmt->fetchRow();
            
        }catch(Exception $e){
            $invoice = null;
        }
        return $invoice;
    }

    public function getstatusAction()
    {
        $mInvStatus = new Model_InvoiceStatus();
        $status = array();
        $objstatus = $mInvStatus->fetchAll();
        if($objstatus){
            $success = true;
            $status = $objstatus->toArray();
        }else{
            $success = false;
        }       
        
        $response = array(
            'success' => $success,
            'data' => $status
        );
        
        $this->_helper->json->sendJson($response);                
    }


}











