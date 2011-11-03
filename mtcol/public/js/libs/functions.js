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
 * Funcion para cargar dinamicamente scripts
 **/
function loadScript(url){    
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
    //cleanup
    setTimeout(function(){
        document.getElementsByTagName('head')[0].removeChild(script);
    }, 1000);
}
function loadModels(models, fn){
    fn = fn || 'main';
    var nloads = 0;
    var _models;
    if(!(models instanceof Array)){
        _models = [models];
    }else{
        _models = models;
    }
    
    var _scripts = new Array();
    var head = document.getElementsByTagName('head')[0];
    for(var i = 0; i < _models.length; i++){
        _scripts[_models[i]] = document.createElement('script');
        _scripts[_models[i]].type = 'text/javascript';
        _scripts[_models[i]].src = '/js/app/models/' + _models[i] + '.js';
        
        if(Ext.isIE){
            _scripts[_models[i]].onReadyStateChange = function(){
                if(_scripts[_models[i]].readyState == 'complete' || _scripts[_models[i]].readyState == 'loaded'){
                    nloads++;
                    if(nloads == _models.length)
                        if(typeof fn == 'function')
                            fn();
                        else if(typeof window[fn] == 'function')
                            window[fn]();
                }
            }
        }else{
            _scripts[_models[i]].addEventListener('load',function(){
                nloads++;
                if(nloads == _models.length)
                    if(typeof fn == 'function')
                        fn();
                    else if(typeof window[fn] == 'function')
                        window[fn]();
            },false);
        }
        
        
        head.appendChild(_scripts[_models[i]]);        
    }
    //cleanup
    setTimeout(function(){
        for(var j = 0; j < _models.length; j++){
            head.removeChild(_scripts[_models[j]]);
        }        
    }, 1000);
}
function loadViews(views, fn){
    fn = fn || 'main';
    var nloads = 0;
    var _views;
    if(!(views instanceof Array)){
        _views = [views];
    }else{
        _views = views;
    }
    
    var _scripts = new Array();
    var head = document.getElementsByTagName('head')[0];
    for(var i = 0; i < _views.length; i++){
        _scripts[_views[i]] = document.createElement('script');
        _scripts[_views[i]].type = 'text/javascript';
        _scripts[_views[i]].src = '/js/app/views/' + _views[i] + '.js';
        
        if(Ext.isIE){
            _scripts[_views[i]].onReadyStateChange = function(){
                if(_scripts[_views[i]].readyState == 'complete' || _scripts[_views[i]].readyState == 'loaded'){
                    nloads++;
                    if(nloads == _views.length)
                        if(typeof fn == 'function')
                            fn();
                        else if(typeof window[fn] == 'function')
                            window[fn]();
                }
            }
        }else{
            _scripts[_views[i]].addEventListener('load',function(){
                nloads++;
                if(nloads == _views.length)
                    if(typeof fn == 'function')
                        fn();
                    else if(typeof window[fn] == 'function')
                        window[fn]();
            },false);
        }
        
        
        head.appendChild(_scripts[_views[i]]);        
    }
    //cleanup
    setTimeout(function(){
        for(var j = 0; j < _views.length; j++){
            head.removeChild(_scripts[_views[j]]);
        }        
    }, 1000);
}
function Application(conf, fn){
    conf = conf || {};
    var cmodels = conf.models || [];
    var cviews = conf.views || [];
    
    if(cmodels.length > 0){
        if(cviews.length > 0){
            loadModels(cmodels, loadViews(cviews, fn));
        }else{
            loadModels(cmodels, fn);
        }
    }else if(cviews.length > 0){
        loadViews(cviews, fn);
    }
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