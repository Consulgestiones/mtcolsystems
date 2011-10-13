<?php

class Admin_UsersController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function getusersAction()
    {
        $start = $this->getRequest()->getParam('start');
        $limit = $this->getRequest()->getParam('limit');
        
        $model = new Model_User();
                     
        $query = $model->fetchRow($model->select()
                ->from('user', array())
                ->columns(array('total' => new Zend_Db_Expr("COUNT(iduser)"))));
        $total = $query['total'];
        
        $db = Zend_Registry::get('db');
        
        $select = $db->select()
                ->from(array('u' => 'user'))
                ->columns(array('isactive' => new Zend_Db_Expr("CASE u.active WHEN 1 THEN 'Si' ELSE 'No' END")))
                ->join(array('t' => 'typeid'), 't.idtypeid = u.idtypeid', array('typeid'))
                ->order(array('lastname', 'firstname'))
                ->limit($limit, $start);        
        
        $stmt = $db->query($select);
        $users = $stmt->fetchAll();        
        
        $response = array(
            'total' => $total,
            'data' => $users
        );
        
        $this->_helper->json->sendJson($response);
    }

    public function saveAction()
    {
        $data = $this->getRequest()->getPost();
        $form = new Form_User();
        
        if($form->isValid($data)){
            
            $db = Zend_Registry::get('db');
            $select = $db->select()
                    ->from(array('u' => 'user'), array('x' => new Zend_Db_Expr('COUNT(u.iduser)')))
                    ->where('u.username = ?', $data['username']);
            $stmt = $db->query($select);
            $count = $stmt->fetchColumn();
            
            if($count == 0){
                $data['iduser'] = null;
                $data['idprofile'] = 1;
                $data['password'] = md5($data['numid']);
                $data['creationdate'] = date('Y-m-d G:i:s');
                
                $model = new Model_User();
                if($model->insert($data)){
                    $resp = array(
                        'success' => true
                    );
                }else{
                    $resp = array(
                        'success' => false,
                        'msgs' => array(
                            'Usuario' => array(
                                'formulario' => 'Error al crear el usuario'
                            )
                        )
                    );
                }
                
            }else{
                $msgs = array(
                    'username' => array(
                        'uniqueusername' => 'El usuario esta duplicado'
                    )
                );
                $resp = array(
                    'success' => false,
                    'msgs' => $msgs
                );
            }
            
        }else{
            $resp = array(
                'success' => false,
                'msgs' => $form->getMessages()
            );
        }
                
        $this->_helper->json->sendJson($resp);
    }
}







