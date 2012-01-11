<?php

class Inventory_WorkordersController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function getworkorderheadersAction()
    {
        $start = $this->getRequest()->getParam('start');
        $limit = $this->getRequest()->getParam('limit');
        
        $model = new Model_WorkOrder();
        
        $data = $model->getWorkOrderHeaders($start, $limit);
        
        if(is_array($data)){
            $success = true;
            $msg = 1;            
        }else{
            $success = false;   
            $data = array();
            $msg = 'Error al consultar las ordenes de trabajo';
        }
        $response = array(
            'success' => $success,
            'data' => $data,
            'msg' => $msg
        );
        $this->_helper->json->sendJson($response);
    }


}



