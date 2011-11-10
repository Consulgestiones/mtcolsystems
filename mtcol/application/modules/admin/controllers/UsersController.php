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
                ->join(array('p' => 'profile'), 'p.idprofile = u.idprofile', array('profile'))
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
        $user = null;
        try{
            if($form->isValid($data)){  
                $model = new Model_User();
                $iduser = $data['iduser'];
                
                $db = Zend_Registry::get('db');
                
                if($iduser == 0){                    
                    $db = Zend_Registry::get('db');
                    $select = $db->select()
                            ->from(array('u' => 'user'), array('x' => new Zend_Db_Expr('COUNT(u.iduser)')))
                            ->where('u.username = ?', $data['username']);
                    $stmt = $db->query($select);
                    $count = $stmt->fetchColumn();

                    if($count == 0){
                        $data['iduser'] = null;
                        $data['idprofile'] = 1;
                        $data['password'] = md5($data['usernumid']);
                        $data['creationdate'] = date('Y-m-d G:i:s');

                        $iduser = $model->insert($data);
                        if($iduser){
                            $success = true;                            
                            $msg = array();                                                        
                            
                        }else{
                            throw new Exception('Error al crear el usuario');
//                            $success = false;
//                            $msg = array(
//                                    'Usuario' => array(
//                                        'formulario' => 'Error al crear el usuario'
//                                    ));                            
                        }

                    }else{
                        throw new Exception('El usuario esta duplicado');
//                        $success = false;
//                        $msg = array(
//                            'username' => array(
//                                'uniqueusername' => 'El usuario esta duplicado'
//                            )
//                        );                                                
                    }
                }else{//es editar
                    if(!$model->update($data, 'iduser = '.$iduser)){
                        throw new Exception('Error al editar el usuario');
                    }
                }

            }else{     
                throw new Exception(json_encode($form->getMessages()));
//                $success = false;
//                $msg = $form->getMessages();       
            }
            
            $select = $db->select()
                    ->from(array('u' => 'user'))
                    ->columns(array('isactive' => new Zend_Db_Expr("CASE u.active WHEN 1 THEN 'Si' ELSE 'No' END")))
                    ->join(array('t' => 'typeid'), 't.idtypeid = u.idtypeid', array('typeid'))
                    ->join(array('p' => 'profile'), 'p.idprofile = u.idprofile', array('profile'))
                    ->where("iduser = ?", $iduser);        

            $stmt = $db->query($select);
            $user = $stmt->fetch();
            $success = true;
        }catch(Exception $e){
            $success = false;
            $msg = array(
                'execution' => array(
                    'exception' => $e->getMessage()
                )
            );
        }
        $resp = array(
            'success' => $success,
            'msg' => $msg,
            'data' => $user
        );
        
        
                
        $this->_helper->json->sendJson($resp);
    }

    public function getapplicationsAction()
    {
        $iduser = $this->getRequest()->getParam('iduser');
        $apps = array();
        try{
            
            $sql = sprintf("SELECT a.idapplication, a.application, COUNT(ua.idapplication) AS enabled
                            FROM application a
                            LEFT JOIN user_application ua ON ua.idapplication = a.idapplication AND ua.iduser = %d
                            GROUP BY a.idapplication, a.application
                            ORDER BY a.application", $iduser);
            
            $db = Zend_Registry::get('db');
            $stmt = $db->query($sql);
            $apps = $stmt->fetchAll();
            
            $success = true;
            $msg = 1;
        }catch(Exception $e){
            $success = false;
            $msg = $e->getMessage();
        }
        $data = array(
            'data' => $apps,
            'success' => $success,
            'msg' => $msg
        );
        $this->_helper->json->sendJson($data);
        
    }

    public function setapplicationsAction()
    {
        $iduser = $this->getRequest()->getParam('iduser');
        $apps = $this->getRequest()->getParam('applications');
        $db = Zend_Registry::get('db');
        try{
            $db->beginTransaction();
            $db->delete('user_application', 'iduser = '.$iduser);
            if($apps){
                for($i = 0; $i < count($apps); $i++){
                    $data = array(
                        'iduser' => $iduser,
                        'idapplication' => $apps[$i]
                    );
                    $db->insert('user_application', $data);
                }
            }
            
            
            
            $db->commit();
            $success = true;
            $msg = 1;
        }catch(Exception $e){
            $db->rollBack();
            $success = false;
            $msg = $e->getMessage();
        }
        $data = array(
            'success' => $success,
            'msg' => $msg
        );
        $this->_helper->json->sendJson($data);
    }


}











