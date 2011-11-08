<?php

class Admin_ProfilesController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function getprofilesAction()
    {
        $start = $this->getRequest()->getParam('start');
        $limit = $this->getRequest()->getParam('limit');
        
//        $profiles = new Admin_Model_Profile();
        $profiles = new Model_Profile();
        
        $query = $profiles->fetchRow($profiles->select()
                ->from('profile', array())
                ->columns(array('total' => new Zend_Db_Expr("COUNT(idprofile)"))));
        $total = $query['total'];
        
        $data = $profiles->fetchAll($profiles->select()
                ->from('profile')
                ->limit($limit, $start));
        
        $dprofiles = $data->toArray();
        
        $d = array(
            'total' => $total,
            'data' => $dprofiles
        );
        
        $this->_helper->json->sendJson($d);
        
    }

    public function deleteAction()
    {
        $idprofile = $this->getRequest()->getParam('idprofile');
        
        try{
            $db = Zend_Registry::get('db');
            $select = $db->select()
                    ->from(array('u' => 'user'), array('total' => new Zend_Db_Expr("COUNT(u.iduser)")))
                    ->where("u.idprofile = ?", $idprofile);
            $stmt = $db->query($select);
            $data = $stmt->fetch();
            $total = (int)$data['total'];
            
            if($total != 0)
                throw new Exception('No se puede eliminar porque esta asignado a un usuario');
            
            $db = Zend_Registry::get('db');
            
            $db->delete('profile_menu', "idprofile = ".$idprofile);
            $db->delete('profile', 'idprofile = '.$idprofile);
            
            
            $delete = true;
        }catch(Exception $e){
            $delete = false;
            $msg = $e->getMessage();
        }       
        $resp = array(
            'success' => $delete,
            'msg' => $msg
        );
        $this->_helper->json->sendJson($resp);
    }

    public function saveAction()
    {
        $idprofile = $this->getRequest()->getParam('idprofile');
        $profile = $this->getRequest()->getParam('profile');
        $description = $this->getRequest()->getParam('description');
        
        
        try{
            if(empty($profile))
                throw new Exception('El nombre del perfil no puede estar en blanco');
            
            $select = "SELECT COUNT(idprofile) as total FROM profile WHERE UPPER(profile) = UPPER('".$profile."')";
            
            $db = Zend_Registry::get('db');
            
            $stmt = $db->query($select);
            $data = $stmt->fetch();
            $total = (int)$data['total'];
            
            if($total != 0)
                throw new Exception('El perfil '.$profile.' ya se encuentra registrado');
            
            $data = array(
                'idprofile' => ($idprofile)?$idprofile:null,
                'profile' => $profile,
                'description' => $description
            );
            
            $model = new Admin_Model_Profile();
            
            if($idprofile == 0){
                $idprofile = $model->insert($data);
                if($idprofile){
                    $data['idprofile'] = $idprofile;
                }else{
                    throw new Exception('Error al crear el perfil');
                }
            }else{
                $update = $model->update($data, "idprofile = ".$idprofile);
                if(!$update)
                    throw new Exception('Error al editar el perfil');
            }
            
            $success = true;
        }catch(Exception $e){
            $success = false;            
            $msg = $e->getMessage();
        }
        
        $resp = array(
            'success' => $success,
            'msg' => $msg,
            'data' => $data
        );
        
        $this->_helper->json->sendJson($resp);
    }


}







