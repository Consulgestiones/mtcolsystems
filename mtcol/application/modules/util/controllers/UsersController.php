<?php

class Util_UsersController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function uniqueusernameAction()
    {
        $username = $this->getRequest()->getParam('username');
        $model = new Model_User();
        $select = $model->select()
                ->from(array('u' => 'user'), array('x' => new Zend_Db_Expr('COUNT(u.iduser)')))
                ->where('username = ?', $username);
        
        $db = Zend_Registry::get('db');
        
        $stmt = $db->query($select);
        $result = $stmt->fetchColumn();
        
        $unique = $result == 0;
        
        $data = array(
            'success' => true,
            'unique' => $unique
        );
        
        $this->_helper->json->sendJson($data);
        
    }


}



