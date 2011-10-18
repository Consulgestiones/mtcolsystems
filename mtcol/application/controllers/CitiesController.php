<?php

class CitiesController extends Zend_Controller_Action
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
        $idcountry = $this->getRequest()->getParam('idcountry');
        
        $model = new Model_City();
        $rowset = $model->fetchAll('idcountry = '.$idcountry);
        $countries = $rowset->toArray();
        
        $data = array(
            'success' => true,
            'data' => $countries
        );
        
        $this->_helper->json->sendJson($data);
    }


}



