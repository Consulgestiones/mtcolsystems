<?php

class IndexController extends Zend_Controller_Action
{
    /**
     * Accesando a nuestras variables de sesion
     * @var Zend_Session_Namespace 
     */
    protected $session;
    
    public function preDispatch() {
        $this->session = new Zend_Session_Namespace('Default');
    }

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        /**
         * Se cambia el layout por el del index
         */
        $this->_helper->layout()->setLayout('index-layout');
    }

    public function loginAction()
    {
        $user = $this->getRequest()->getParam('user');
        $pass = md5($this->getRequest()->getParam('pass'));
        
        $dbAdapter = Zend_Db_Table_Abstract::getDefaultAdapter();
        
        
 
        $authAdapter = new Zend_Auth_Adapter_DbTable($dbAdapter);
        
        $select = $authAdapter->getDbSelect();
        $select->where("active = 1");

        $authAdapter
            ->setTableName('user')
            ->setIdentityColumn('username')
            ->setCredentialColumn('password')
            ->setIdentity($user)
            ->setCredential($pass);
        
        $result = Zend_Auth::getInstance()->authenticate($authAdapter);
        
        
//        $model = new Model_User();
//        $user = $model->fetchRow("username = '".$user."' AND password = md5('".$pass."')");
        
//        if($user != null){
        if($result->isValid()){
            
            $storage = Zend_Auth::getInstance()->getStorage();
            $dbResultRow = $authAdapter->getResultRowObject();
            $storage->write($dbResultRow);
            
            $user = Zend_Auth::getInstance()->getIdentity();                                    
            
            Zend_Registry::set('login', 'q1w2e3r4');
            
            /**
             * Consultar usuario para crear instancia
             */
            $model = new Model_User();
            
            $dataUser = $model->find($user->iduser);
            $udata = $dataUser->toArray();
                     
            /**
             * Objeto usuario instanciado
             */
            $objuser = New Mtcol_User($udata[0]);                        
                                    
            /**
             * Consultar los sistemas a los cuales tiene acceso el usuario
             */
            $db = Zend_Registry::get('db');
            $select = $db->select();

            $select
                ->from(array('a' => 'application'), array('a.idapplication', 'a.application', 'a.module', 'a.controller', 'a.action', 'a.img'))
                ->join(array('u' => 'user_application'), 'a.idapplication = u.idapplication', array())
                ->where('u.iduser = ?', $user->iduser);                
            
            $stmt = $db->query($select);
            $apps = $stmt->fetchAll();
            
            $objuser->setApplications($apps);
            
            /**
             * Consultar el menu correspondiente al usuario
             */
            $select = $db->select()
                    ->from(array('m' => 'menu'), array('m.idmenu', 'm.menu', 'm.path', 'm.icon', 'm.idparent', 'm.module', 'm.func', 'm.params'))
                ->join(array('pm' => 'profile_menu'), 'm.idmenu = pm.idmenu', array())
                ->where('pm.idprofile = ?', $user->idprofile);
            
            $stmt = $db->query($select);
            $menu = $stmt->fetchAll();
            
            $objuser->setMenu($menu);

            $this->session->user = $objuser->toArray();
            
            $data = array(
                'user' => $objuser->toArray(),
                'success' => true
            );
        }else{
            $data = array(
                'user' => -1,
                'failure' => true
            );
        }
        
        $this->_helper->json->sendJson($data);
        
    }


}



