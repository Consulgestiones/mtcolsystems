function addslashes(str) {
    str=str.replace(/\\/g,'\\\\');
    str=str.replace(/\'/g,'\\\'');
    str=str.replace(/\"/g,'\\"');
    str=str.replace(/\0/g,'\\0');
    return str;
}
function stripslashes(str) {
    str=str.replace(/\\'/g,'\'');
    str=str.replace(/\\"/g,'"');
    str=str.replace(/\\0/g,'\0');
    str=str.replace(/\\\\/g,'\\');
    return str;
}
/**
 * Almacena una variable global en el objeto window
 */
function setGlobal(id, obj){
    var strdata = window.name || '{}';
    var glob = Ext.decode(strdata);
    glob[id] = Ext.encode(obj);
    window.name = Ext.encode(glob);
}
/**
 * Obtiene una variable global almacenada en el objeto window
 */
function getGlobal(id){
    var strglobal = window.name || '{}';
    var glob = Ext.decode(strglobal);
    if(typeof glob[id] != 'undefined')
        return Ext.decode(glob[id]);
    return null;
}

