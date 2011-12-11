<?php

class Inventory_TransactionsController extends Zend_Controller_Action
{
    private $session;
    private $user;
    public function init()
    {
        $this->session = new Zend_Session_Namespace('Default');        
        $this->user = $this->session->user;
    }

    public function indexAction()
    {
        // action body
    }

    public function addtransactionAction($codtype, $totalprice, $totalpricetax)
    {
        try{
            $db = Zend_Registry::get('db');
            
            $data = array(
                'iduser' => $this->user['iduser'],
                'codtype' => $codtype,
                'totalprice' => $totalprice,
                'dtransaction' => Functions::getCurrentTime(),
                'totalpricetax' => $totalpricetax
            );
            
            $mTx = new Model_Transaction();
            
            $mTx->insert($data);
            $success = true;
            
        }catch(Exception $e){
            echo $e->getMessage();
            die();
            $success = true;
        }
        return $success;
    }


}



