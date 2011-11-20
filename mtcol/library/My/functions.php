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
}
?>
