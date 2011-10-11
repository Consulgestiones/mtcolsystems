<?php

class Admin_UsersController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function getusersAction()
    {
        $start = $this->getRequest()->getParam('start');
        $limit = $this->getRequest()->getParam('limit');
        
        $model = new Model_User();
                     
        $query = $model->fetchRow($model->select()
                ->from('user', array())
                ->columns(array('total' => new Zend_Db_Expr("COUNT(iduser)"))));
        $total = $query['total'];
        
        $stmt = $model->fetchAll($model->select()->order(array('lastname', 'firstname'))->limit($limit, $start));
        $users = $stmt->toArray();
        
        
        $response = array(
            'total' => $total,
            'data' => $users
        );
        
        $this->_helper->json->sendJson($response);
    }

    public function saveAction()
    {
        $data = array(
            'failure' => true,
            'msg' => 'Error al crear el usuario'
        );
        $this->_helper->json->sendJson($data);
    }
}







