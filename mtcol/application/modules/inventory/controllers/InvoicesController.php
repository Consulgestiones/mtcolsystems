<?php

class Inventory_InvoicesController extends Zend_Controller_Action
{
    private $session;
    public function init()
    {
        $this->session = new Zend_Session_Namespace('Default');
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
            
            $sql = sprintf("SELECT SQL_CALC_FOUND_ROWS i.idinvoice, i.invoicenumber, i.title, i.dinvoice, i.delivery, i.createdby,
                            i.subtotal, i.tax, i.total, c.idcity, c.city, ct.idcountry, ct.country,
                            p.idprovider, p.provider, p.providernumid, p.provideremail, p.providerphone,
                            pm.idpaymentmethod, pm.paymentmethod, i.artifact, CASE i.artifact WHEN 'IV' THEN 'Factura' ELSE 'Orden de Compra' END as doctype 
                            FROM invoice_header i, provider p, city c, country ct, payment_method pm
                            WHERE p.idprovider = i.idprovider AND c.idcity = p.idcity 
                                            AND c.idcountry = p.idcountry AND ct.idcountry = p.idcountry                                            
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
            
            $sql = sprintf("SELECT i.item, i.idinvoice, i.quantity, i.unitprice, i.itemprice, i.taxvalue, i.totalprice, (i.totalprice * p.tax / 100) as producttax, (i.totalprice * (concat('1.', p.tax))) as total_tax, p.idproduct, p.product, p.unit
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
        
        $user = $this->session->user;
        
//        echo $user['iduser'];
//        die();
        
        $data = array();
        $msg = 1;
        //Obtener base de datos
        
        /* @var $db Zend_Db_Adapter */
        $db = Zend_Registry::get('db');
        try{      
            //iniciar transaccion protegida
            $db->beginTransaction();
            
            //agregar datos que no vienen desde el cliente
            $header->createdby = 'Juan Carlos Giraldo';
            $header->dcreate = Functions::getCurrentTime();
            $header->iduser = $user['iduser'];
            
            //Obtener datos del objeto header en forma de array
            $hdata = get_object_vars($header);                  
            
            $hdata['dinvoice'] = Functions::toMySqlDate($hdata['dinvoice']);
            
            //Instancia del formulario InvoiceHeader
            /* @var $fInvoiceHeader Zend_Form */
            $fInvoiceHeader = new Form_InvoiceHeader();
            
            //Valida datos recibidos por medio del formulario
            if(!$fInvoiceHeader->isValid($hdata))
                    throw new Exception(json_encode($fInvoiceHeader->getMessages()));
            

            
            $ihData = $fInvoiceHeader->getValues($hdata);           

            //Instanciar modelo invoice header
            $mInvoice = new Model_Invoice();                        
            
            //insertar datos en la tabla invoice_header
            $idinvoice = $mInvoice->insert($ihData);
            
            //obtener ultimo id insertado
//            $idinvoice = $minvoice->lastInsertId();
            
            //datos de la factura que no vienen en el encabezado
            $subtotal = 0;
            $tax = 0;
            $total = 0;
            
            $detailData = array();
            
            //instancia de formulario de detalle de factura para validar los datos
            $fInvoiceDetail = new Form_InvoiceDetail();
            
            //tabla de detalle de factura
            $mInvoiceDetail = new Model_InvoiceDetail();
            
            //Obtener campos de la tabla invoice detail para filtrar los datos
            //que vienen en el detalle de la factura
            $fields = $fInvoiceDetail->getElements();
            $kFields = array();
            foreach($fields as $k => $field){
                $kFields[$k] = true;
            }                        
            
            //procesar detalle de la factura            
            $nItem = 1;
            $txvalues = "";
            $stvalues = "";
            
            
            //Tipo de transaccion
            $codType = 'COM';
            //Estado del stock
            $codStatus = 'OCP';
            
            foreach($detail as $item){
                $iData = get_object_vars($item);
                $iData['idinvoice'] = $idinvoice;
                $iData['item'] = $nItem;
                
                //filtrar campos de la tabla invoice detail
                $clearData = array_intersect_key($iData, $kFields);
                
                $detailData[] = $clearData;
                $subtotal += ($iData['unitprice']*$iData['quantity']);
                $tax += $iData['taxvalue'];
                $total += $iData['totalprice'];        
                if(!$fInvoiceDetail->isValid($clearData))
                    throw new Exception(json_encode($fInvoiceDetail->getMessages()));
                
                if(!$mInvoiceDetail->insert($clearData))
                    throw new Exception('Error al ingresar el detalle de la factura');
                
                
                $itempricetax = ($item->unitprice  + ($item->unitprice * $item->tax / 100));
                $totalprice = ((float)$item->quantity) * $itempricetax;
                
//                $txvalues .= sprintf("('%s', %d, %f, %f, %f, %f, NOW())", $codType, $item->idproduct, $item->unitprice, $item->quantity, $totalprice, $itempricetax);
//                $txvalues .= ',';
                
                $stvalues .= sprintf("('%s', %d, %f, %f, %f, %f)", $codStatus, $item->idproduct, $item->unitprice, $item->quantity, $totalprice, $itempricetax);
                $stvalues .= ',';

                $nItem++;
            }
            
            $txvalues = substr($txvalues, 0, -1);            
            $stvalues = substr($stvalues, 0, -1);            
            
            $dUpdate = array(
                'subtotal' => $subtotal,
                'tax' => $tax,
                'total' => $total
            );
            
            if(!$mInvoice->update($dUpdate, "idinvoice = ".$idinvoice))
                throw  new Exception ('Error al actualizar la información de la factura');
            
            
            
            
            /**
             * Alimetar movimientos y stock
             */
//                $sqltx = sprintf("INSERT INTO transaction (codtype, idproduct, unitprice, quantity, totalprice, unitpricetax, dtransaction)
//                    VALUES %s", $txvalues);                
                
//                $stmt = $db->query($sqltx);       
                
                $sqlst = sprintf("INSERT INTO stock (codstatus, idproduct, unitprice, quantity, totalprice, unitpricetax)
                    VALUES %s", $stvalues);                
                
                $stmt = $db->query($sqlst);       
                Functions::addTransaction('COM', $total, $user['iduser']);


                    /**
             * /Alimetar movimientos y stock
             */
            
            
            
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
            $sql = sprintf("SELECT i.idinvoice, i.invoicenumber, i.title, i.dinvoice, i.delivery, i.createdby,
                            i.subtotal, i.tax, i.total, c.idcity, c.city, ct.idcountry, ct.country,
                            p.idprovider, p.provider, p.providernumid, p.provideremail, p.providerphone,
                            pm.idpaymentmethod, pm.paymentmethod, i.artifact, CASE i.artifact WHEN 'IV' THEN 'Factura' ELSE 'Orden de Compra' END as doctype
                            FROM invoice_header i, provider p, city c, country ct, payment_method pm
                            WHERE i.idinvoice = %d
                            AND p.idprovider = i.idprovider AND c.idcity = p.idcity 
                                            AND c.idcountry = p.idcountry AND ct.idcountry = p.idcountry                                            
                                            AND pm.idpaymentmethod = i.idpaymentmethod", $idinvoice);
            
            $db = Zend_Registry::get('db');
            
            $stmt = $db->query($sql);
            
            $invoice = $stmt->fetch();
            
        }catch(Exception $e){
            $invoice = null;
        }
        return $invoice;
    }

    public function getstatusAction()
    {
        $mInvStatus = new Model_InvoiceStatus();
        $status = array();
        $total = 0;
        $objstatus = $mInvStatus->fetchAll();
        if($objstatus){
            $success = true;
            $status = $objstatus->toArray();
            $total = count($status);
        }else{
            $success = false;
        }       
        
        $response = array(
            'success' => $success,
            'data' => $status,
            'total' => $total
        );
        
        $this->_helper->json->sendJson($response);                
    }


}