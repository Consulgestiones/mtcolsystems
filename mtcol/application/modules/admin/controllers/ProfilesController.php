<?php

class Admin_ProfilesController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function getprofilesAction()
    {
        $start = $this->getRequest()->getParam('start');
        $limit = $this->getRequest()->getParam('limit');
        
        $profiles = new Admin_Model_Profile();
        
        $query = $profiles->fetchRow($profiles->select()
                ->from('profile', array())
                ->columns(array('total' => new Zend_Db_Expr("COUNT(idprofile)"))));
        $total = $query['total'];
        
        $data = $profiles->fetchAll($profiles->select()
                ->from('profile')
                ->limit($limit, $start));
        
        $dprofiles = $data->toArray();
        
        $d = array(
            'total' => $total,
            'data' => $dprofiles
        );
        
        $this->_helper->json->sendJson($d);
        
    }


}



