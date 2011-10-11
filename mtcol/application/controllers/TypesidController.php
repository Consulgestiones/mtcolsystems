<?php

class TypesidController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function gettypesAction()
    {
        $model = new Model_Typesid();
        $stmt = $model->fetchAll();
        $types = $stmt->toArray();
        $data = array(
            'success' => true,
            'data' => $types
        );
        $this->_helper->json->sendJson($data);
    }


}



