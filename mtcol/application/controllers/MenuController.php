<?php

class MenuController extends Zend_Controller_Action
{

    /**
     * Accediendo a variables de sesion
     * @var Zend_Session_Namespace
     */
    /*protected $session;
    
    public function preDispatch() {
        $this->session = new Zend_Session_Namespace('Default');               
    }
*/

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function getmenuAction()
    {        
        $auth = Zend_Auth::getInstance();
        if($auth->hasIdentity()){
            $mod = $this->getRequest()->getParam('mod');
            
            /* @var $user Mtcol_User */
            $user = $this->session->user;
            
            $allmenu = $user['menu'];
            
            $menu = array();            
            for($i = 0; $i < count($allmenu); $i++){                
                if($allmenu[$i]['module'] == $mod)
                    $menu[] = $allmenu[$i];
            }

            $response = array(
                'status' => 'success',
                'data' => $menu
            );
            
        }else{
            $response = array(
                'status' => 'failure',
                'msg' => 'No se ha logueado en el sistema'
            );
        }     
        $this->_helper->json->sendJson($response);
    }


}



