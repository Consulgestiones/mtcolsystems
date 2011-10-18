<?php

class CountriesController extends Zend_Controller_Action
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
        $model = new Model_Country();
//        $select = $model->select()
//                ->from(array('c' => 'country'))
//                ->order('country');
        $result = $model->fetchAll(null, 'country');
        $countries = $result->toArray();
        
        $data = array(
            'success' => true,
            'data' => $countries
        );
        $this->_helper->json->sendJson($data);
    }


}



