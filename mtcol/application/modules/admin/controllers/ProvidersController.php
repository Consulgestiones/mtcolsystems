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
        
//        $select = $db->select()
//                ->from(array('p' => 'provider'), array(new Zend_Db_Expr('SQL_CALC_FOUND_ROWS'), 'p.idprovider', 'p.provider', 'p.providernumid', 'p.providerphone', 'p.provideremail', 'p.provideraddress', 'p.contact', 'p.contacttitle', 'p.contactphonehome', 'p.contactphonework', 'p.contactphonemobile', 'p.contactphoneworkext'))
//                ->join(array('c' => 'city'), 'c.idcity = p.idcity AND c.idcountry = p.idcountry', array('idcity', 'city'))
//                ->join(array('ct' => 'country'), 'ct.idcountry = c.idcountry', array('ct.idcountry', 'ct.country'))
//                ->join(array('ti' => 'typeid'), 'ti.idtypeid = p.idtypeid', array('idtypeid', 'typeid'))
//                ->order('p.provider')
//                ->limit($limit, $start);
//        echo $select;
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
                        throw new Exception(json_encode(array('Error al crear el proveedor')));
                    }
                }else{//Actualizar
                    $idprovider = $data['idprovider'];
                    if(!$model->update($data, 'idprovider = '. $idprovider)){
                        throw new Exception('Error al actualizar el empleador');
                    }
                }
            }else{
                throw new Exception(json_encode($form->getErrorMessages()));
            }
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


}





