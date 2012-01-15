<?php

class MineController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function getmineAction()
    {
      $start = $this->getRequest()->getParam('start');
      $limit = $this->getRequest()->getParam('limit');
        
      $model = new Model_MineDetail();
      $data = $model->getMine($start, $limit);
      
      if(is_array($data['data'])){
            $msg = 1;
            $success = true;
        }else{
            $msg = 'Error al consultar los datos';
            $success = false;
            $data = array();
        }
        $response = array(
            'success' => $success,
            'msg' => $msg,
            'data' => $data['data'],
            'total' => $data['total']
        );
        $this->_helper->json->sendJson($response);
      
    }


}



