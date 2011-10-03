<?php
abstract class Mtcol_Abstract {
    public function toArray(){
        $class = array();
        foreach($this as $k => $v){     
            $k = str_replace('_', '', $k);
            $class[$k] = $v;
        }
        return $class;
    }
}
?>
