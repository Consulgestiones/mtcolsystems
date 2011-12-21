<?php
class Functions {
    public static function toMySqlDate($date){
        list($d, $m, $y) = explode('/', $date);
        return $y.'-'.$m.'-'.$d;
    }
    public static function getCurrentTime(){
        $d = getdate();
        return $d['year'].'-'.$d['mon'].'-'.$d['mday'].' '.$d['hours'].':'.$d['minutes'].':'.$d['seconds'];
    }
    public static function addTransaction($codtype, $totalpricetax, $iduser){
        try{
            $mTx = new Model_Transaction();
            
            $data = array(
                'iduser' => $iduser,
                'codtype' => $codtype,
                'totalprice' => 0, //Se deja en cero porque no se puede calcular en todos los casos ej Remisiones
                'dtransaction' => Functions::getCurrentTime(),
                'totalpricetax' => $totalpricetax
            );
            
            $mTx->insert($data);
            $success = true;
        }catch(Exception $e){
            $success = false;
        }
        return $success;
    }
    public static function arraySum($arr, $key){        
        if(is_array($arr) || is_object($arr)){
            $sum = 0;
            for($i = 0; $i < count($arr); $i++){
                $sum += (is_array($arr[$i]))?$arr[$i][$key]:$arr[$i]->$key;
            }        
        }else{
            $sum = null;
        }
        return $sum;
    }    
}
?>
