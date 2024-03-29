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

    public function getsectionsAction()
    {
        $model = new Model_Section();
        $data = $model->fetchAll()->toArray();
        $msg = 1;
        if(is_array($data)){
            $success = true;
        }else{
            $success = false;
            $data = array();
            $msg = 'Error al consultar las secciones';
        }
        $response = array(
            'success' => $success,
            'data' => $data,
            'msg' => $msg
        );
        $this->_helper->json->sendJson($response);
    }

    public function savemineAction()
    {
        $post = json_decode(stripcslashes($this->getRequest()->getParam('params')), true);
        $smine = new Form_MineSave();
        $data = array();
        $msg = 1;
        $action = '';
        try{
            
            if(!$smine->isValid($post))
                    throw new Exception(json_encode($smine->getMessages()));
            
            $data = $smine->getValues();
            
            $mMineSave = new Model_MineDetail();
            
            if($post['idmine'] == 0){
                $idmine = $mMineSave->insert($data);
                $data['idmine'] = $idmine;
                $action = 'create';
            }else{
                $update = $mMineSave->update($data, "idmine = ".$post['idmine']);
                $idmine = (!is_nan($update))?$post['idmine']:-1;
                $action = 'update';
            }                                
            $success = true;
        }catch (Exception $e){
            $success = false;
            $msg = $e->getMessage();

        }
    
        $response = array(
            'success' => $success,
            'data' => $data,
            'msg' => $msg,
            'action' => $action

        );
        
        $this->_helper->json->sendJson($response);
        
    }


}









