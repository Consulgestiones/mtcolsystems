<?php

class Report_GeneralsController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function stockdistributionAction()
    {
        $model = new Report_Model_Generals();
        $data = $model->getStockDistribution();
        if($data != null){
            $msg = 1;            
            $success = true;                        
            
        }else{
            $success = false;
            $msg = 'Error al calcular los datos';
            $data = array();
        }
        $response = array(
            'success' => $success,
            'data' => $data,
            'msg' => $msg
        );
        $this->_helper->json->sendJson($response);
    }


}



