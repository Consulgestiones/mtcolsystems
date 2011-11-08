<?php

class Admin_ProvidersController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function readAction()
    {
        $start = $this->getRequest()->getParam('start');
        $limit = $this->getRequest()->getParam('limit');
        
        $db = Zend_Registry::get('db');

        $select = "SELECT SQL_CALC_FOUND_ROWS p.idprovider, p.provider, p.providernumid, p.providerphone, p.provideremail, p.provideraddress, p.contact, p.contacttitle, p.contactphonehome, p.contactphonework, p.contactphonemobile, p.contactphoneworkext, c.idcity, c.city, ct.idcountry, ct.country, t.idtypeid, t.typeid
                    FROM provider p, city c, country ct, typeid t
                    WHERE c.idcity = p.idcity AND c.idcountry = p.idcountry AND ct.idcountry = c.idcountry AND t.idtypeid = p.idtypeid";
        
        $providers = array();
        
        try{
            $stmt = $db->query($select);
            $providers = $stmt->fetchAll();

            $sql = "SELECT FOUND_ROWS()";
            $stmt2 = $db->query($sql);
            $total = $stmt2->fetchColumn();
            $success = true;
            $msg = 1;
        }catch(Exception $e){
            $success = false;
            $msg = $e->getMessage();
        }

        $resp = array(
            'success' => $success,
            'data' => $providers,
            'msg' => $msg
        );
        
        $this->_helper->json->sendJson($resp);
        
    }

    public function saveAction()
    {
        $form = new Form_Provider();
        $data = $this->getRequest()->getPost();
        $model = new Model_Provider();
        $msg = '';
        try{
            if($form->isValid($data)){
                if($data['idprovider'] == 0){//Crear
                    $data['idprovider'] = null;
                    $idprovider = $model->insert($data);
                    if($idprovider){
                        $data['idprovider'] = $idprovider;                        
                        
                    }else{
                        throw new Exception(json_encode(array('Error al crear el proveedor')));
                    }
                }else{//Actualizar
                    $idprovider = $data['idprovider'];
                    $update = $model->update($data, 'idprovider = '. $idprovider);
                    
                    if(is_nan($update)){
                        throw new Exception('Error al actualizar el empleador');
                    }
                }
                //Tipo de identificacion
                $timodel = new Model_Typesid();
                $row = $timodel->find($data['idtypeid']);                        
                $data['typeid'] = $row[0]->typeid;

                // Pais - ciudad
                $db = Zend_Registry::get('db');
                $select = $db->select()
                        ->from(array('c' => 'city'), array('c.city'))
                        ->join(array('p' => 'country'), 'p.idcountry = c.idcountry', array('country'))
                        ->where('c.idcity = ?', $data['idcity'])
                        ->where('c.idcountry = ?', $data['idcountry']);
                $stmt = $db->query($select);
                $info = $stmt->fetch();
                $data['country'] = $info['country'];
                $data['city'] = $info['city'];
            }else{
                throw new Exception(json_encode($form->getErrorMessages()));
            }
            $msg = 1;
        }catch(Exception $e){
            $data = null;
            $msg = $e->getMessage();
        }
        $resp = array(
            'success' => ($data != null),
            'data' => $data,
            'msg' => $msg
        );
        
        $this->_helper->json->sendJson($resp);
        
    }

    public function getavailableAction()
    {
        $idproduct = $this->getRequest()->getParam('idproduct');
        $start = $this->getRequest()->getParam('start');
        $limit = $this->getRequest()->getParam('limit');
        
        try{
            $sql = sprintf("SELECT SQL_CALC_FOUND_ROWS p.idprovider, ti.typeid, p.providernumid, p.provider, c.city
                            FROM provider p, city c, typeid ti
                            WHERE p.idprovider NOT IN (
                            SELECT idprovider
                            FROM product_provider pp1
                            WHERE idproduct = %d) AND c.idcity = p.idcity AND c.idcountry = p.idcountry AND ti.idtypeid = p.idtypeid
                            AND p.inactive = 0
                            ORDER BY p.provider
                            LIMIT %d, %d", $idproduct, $start, $limit);
                        
                        
            
            $db = Zend_Registry::get('db');
            $stmt = $db->query($sql);
            $providers = $stmt->fetchAll();
            
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
            'data' => $providers,
            'total' => $total,
            'msg' => $msg
        );
        
        $this->_helper->json->sendJson($data);
    }

    public function getasignedAction()
    {
        $idproduct = $this->getRequest()->getParam('idproduct');
        $start = $this->getRequest()->getParam('start');
        $limit = $this->getRequest()->getParam('limit');
        
        try{            
            $sql = sprintf("SELECT SQL_CALC_FOUND_ROWS p.idprovider, t.typeid, p.providernumid, p.provider, c.city
                            FROM provider p, product_provider pp, city c, typeid t
                            WHERE pp.idproduct = %d AND p.idprovider = pp.idprovider 
                            AND c.idcity = p.idcity AND c.idcountry = p.idcountry AND t.idtypeid = p.idtypeid
                            ORDER BY p.provider
                            LIMIT %d, %d", $idproduct, $start, $limit);
            
            $db = Zend_Registry::get('db');
            $stmt = $db->query($sql);
            $providers = $stmt->fetchAll();
            
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
            'data' => $providers,
            'total' => $total,
            'msg' => $msg
        );
        
        $this->_helper->json->sendJson($data);
    }

    public function asignproductAction()
    {
        $idproduct = $this->getRequest()->getParam('idproduct');
        $providers = json_decode($this->getRequest()->getParam('providers'));
        
        try{
            if(!is_array($providers))
                throw new Exception ('Error al recibir los datos');
                              
            $db = Zend_Registry::get('db');
            $total = count($providers);
            for($i = 0; $i < $total; $i++){
                $d = array(
                    'idproduct' => $idproduct,
                    'idprovider' => $providers[$i]
                );
                $db->insert('product_provider', $d);
            }                                                
            
            $success = true;
            $msg = 1;
        }catch(Exception $e){
            $success = false;
            $msg = $e->getMessage();
        }
        
        $data = array(
            'success' => $success,
            'msg' => $msg
        );
        
        $this->_helper->json->sendJson($data);
    }

    public function unasignproductAction()
    {
        $idproduct = $this->getRequest()->getParam('idproduct');
        $providers = json_decode($this->getRequest()->getParam('providers'));
        
        try{
            if(!is_array($providers))
                throw new Exception ('Error al recibir los datos');
                              
            $model = new Model_ProductProvider();
            $total = count($providers);            
            for($i = 0; $i < $total; $i++){
                $where = 'idproduct = '.$idproduct.' AND idprovider = '.$providers[$i];
                $delete = $model->delete($where);                
            }                                                
            
            $success = true;
            $msg = 1;
        }catch(Exception $e){
            $success = false;
            $msg = $e->getMessage();
        }
        
        $data = array(
            'success' => $success,
            'msg' => $msg
        );
        
        $this->_helper->json->sendJson($data);
    }


}













