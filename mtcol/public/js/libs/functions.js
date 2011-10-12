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
/**
 * Vtypes para Ext-Js
 */
//
//Ext.apply(Ext.form.VTypes, {
//    uniqueusername: function(val, field){            
//        Ext.Ajax.request({
//            url: '/util/users/uniqueusername',
//            params: {
//                username: field.getValue()
//            },
//            success: function(response){
//                var obj = Ext.decode(response.responseText);                    
//                var unique = obj.unique;
//                if(unique){                        
//                    uniqueUserNameTrue();
//                }else{
//                    uniqueUserNameFalse();
//                }                                          
//
//            }
//        });            
//    },
//    uniqueusernameText: 'Nombre de usuario duplicado'
//});
//function uniqueUserNameTrue(){
//    return true;
//}
//function uniqueUserNameFalse(){
//    return false;
//}
//Ext.apply(Ext.form.VTypes, {
// uniqueusernameMask : /[a-z0-9_\.\-@\+]/i,
// uniqueusername : function(val) {
//     if (val.length < 4) {
//         Ext.apply(Ext.form.VTypes, {
//             uniqueusernameText: 'Debe ser mayor a 4 caracteres'
//         });
//         return false;
//     } else {
//         Ext.Ajax.request({
//             url: '/util/users/uniqueusername',
//             method: 'POST',
//             params: 'username=' + val,
//             success: function(o) {
//                 var obj = Ext.decode(o.responseText);
//                 if (obj.unique) {
//                     resetUsernameValidator(false);
//                     Ext.apply(Ext.form.VTypes, {
//                         uniqueusernameText: 'Nombre de usuario no disponible'
//                     });
//                     return false;
//                 } else {
//                     resetUsernameValidator(true);
//                 }
//             }
//         });
//         return true;
//     }
// },
//    uniqueusernameText : 'Nombre de usuario no esta disponible'
//});
//function resetUsernameValidator(is_error) {
// Ext.apply(Ext.form.VTypes, {
//     uniqueusername : function(val) {
//         if (val.length < 4) {
//             Ext.apply(Ext.form.VTypes, {
//                 uniqueusernameText: 'Debe ser de mas de 4 caracteres'
//             });
//             return false;
//         } else {
//             Ext.Ajax.request({
//                 url: '/util/users/uniqueusername',
//                 method: 'POST',
//                 params: 'username=' + val,
//                 success: function(o) {
//                     var obj = Ext.decode(o.responseText);
//                     if (o.unique) {
//                         resetUsernameValidator(false);
//                     } else {
//                         resetUsernameValidator(true);
//                     }
//                 }
//             });
//             return is_error;
//         }
//     }
// });
//}