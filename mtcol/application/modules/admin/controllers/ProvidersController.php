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


}



