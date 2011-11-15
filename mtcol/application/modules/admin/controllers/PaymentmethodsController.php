<?php

class Admin_PaymentmethodsController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function getpaymentmethodsAction()
    {
        $data = array();
        $msg = 1;
        try{
            $model = new Model_PaymentMethod();
            $objdata = $model->fetchAll();
            $data = $objdata->toArray();
            $success = true;
        }catch(Exception $e){
            $success = false;
            $msg = $e->getMessage();
        }
        $response = array(
            'success' => $success,
            'data' => $data,
            'total' => count($data),
            'msg' => $msg
        );
        $this->_helper->json->sendJson($response);
    }


}



