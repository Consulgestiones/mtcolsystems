<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function loginAction()
    {
        $this->_helper->viewRenderer->setNoRender();
        $user = $this->getRequest()->getParam('user');
        $pass = $this->getRequest()->getParam('pass');
        
        $data = array(
            'status' => 'S'
        );
        
        $this->_helper->json->sendJson($data);
        
    }


}



