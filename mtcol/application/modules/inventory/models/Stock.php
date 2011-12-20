<?php
class Inventory_Model_Stock extends Zend_Db_Table_Abstract {
    protected $_name = 'stock';
    protected $_primary = 'idstock';
    
    public function receiveStock($idstock, $quantity, $status = 'BOD'){
        
        $db = $this->getDefaultAdapter();
        
        $data = array(
            'codstatus' => 'BOD',
            'quantity' => $quantity
        );        
        $update = $this->update($data, "idstock = ".$idstock);             
        return $update;
    }
    
    public function rejectStock($idstock, $quantity){
        $inidata = $this->fetchRow('idstock = '.$idstock)->toArray();
        $inidata['quantity'] = $quantity;
        $inidata['codstatus'] = 'INC';
        $idstock = $this->insert($inidata);
        return $idstock;
    }
}
?>
