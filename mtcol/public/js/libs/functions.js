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
function loadScript(url, callback){    
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    
    if(Ext.isIE){
        script.onReadyStateChange = callback;
    }else{
        script.addEventListener('load', callback);
    }
    
    
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
        _scripts[_models[i]].src = '/js/app/model/' + _models[i] + '.js';
        
        if(Ext.isIE){
            _scripts[_models[i]].onReadyStateChange = function(){
                if(_scripts[_models[i]].readyState == 'complete' || _scripts[_models[i]].readyState == 'loaded'){
                    nloads++;
                    if(nloads == _models.length){
                        if(typeof fn == 'function')
                            fn();
                        else if(typeof window[fn] == 'function')
                            window[fn]();
                    }
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
function loadStores(stores, fn){
    fn = fn || 'main';
    var nloads = 0;
    var _stores;
    if(!(stores instanceof Array)){
        _stores = [stores];
    }else{
        _stores = stores;
    }
    
    var _scripts = new Array();
    var head = document.getElementsByTagName('head')[0];
    for(var i = 0; i < _stores.length; i++){
        _scripts[_stores[i]] = document.createElement('script');
        _scripts[_stores[i]].type = 'text/javascript';
        _scripts[_stores[i]].src = '/js/app/store/' + _stores[i] + '.js';
        
        if(Ext.isIE){
            _scripts[_stores[i]].onReadyStateChange = function(){
                if(_scripts[_stores[i]].readyState == 'complete' || _scripts[_stores[i]].readyState == 'loaded'){
                    nloads++;
                    if(nloads == _stores.length){
                        if(typeof fn == 'function')
                            fn();
                        else if(typeof window[fn] == 'function')
                            window[fn]();
                    }
                }
            }
        }else{
            _scripts[_stores[i]].addEventListener('load',function(){
                nloads++;
                if(nloads == _stores.length)
                    if(typeof fn == 'function')
                        fn();
                    else if(typeof window[fn] == 'function')
                        window[fn]();
            },false);
        }
        
        
        head.appendChild(_scripts[_stores[i]]);        
    }
    //cleanup
    setTimeout(function(){
        for(var j = 0; j < _stores.length; j++){
            head.removeChild(_scripts[_stores[j]]);
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
        var split = _views[i].split('.');
        var controller = split[0].toLowerCase();
        var view = split[1];
        _scripts[_views[i]] = document.createElement('script');
        _scripts[_views[i]].type = 'text/javascript';
        _scripts[_views[i]].src = '/js/app/view/' + controller + '/' + view + '.js';
        
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
    var cstores = conf.stores || [];    
    
    if(typeof rloaded == 'undefined')
        rloaded = false;
    
    if(rloaded)
        return;
    
    this.loadModels = function(){
        
        if(cmodels.length == 0){
            loadStores();
        }else{
            var nmodels = 0;

            var _scripts = new Array();
            var head = document.getElementsByTagName('head')[0];
            for(var i = 0; i < cmodels.length; i++){                                
                
                _scripts[cmodels[i]] = document.createElement('script');
                _scripts[cmodels[i]].type = 'text/javascript';
                _scripts[cmodels[i]].src = '/js/app/model/' + cmodels[i] + '.js';

                if(Ext.isIE){    
                    _scripts[cmodels[i]].k = cmodels[i];
                    _scripts[cmodels[i]].addEventListener('readystatechange', function(){
                        if(_scripts[this.k].readyState == 'complete' || _scripts[this.k].readyState == 'loaded'){
                            nmodels++;
                            if(nmodels == cmodels.length){
                                loadStores();
                            }
                        }
                    });
                }else{
                    _scripts[cmodels[i]].addEventListener('load',function(){
                        nmodels++;
                        if(nmodels == cmodels.length){
                            loadStores();
                        }
                    },false);
                }


                head.appendChild(_scripts[cmodels[i]]);        
            }
            //cleanup
            setTimeout(function(){
                for(var j = 0; j < cmodels.length; j++){
                    head.removeChild(_scripts[cmodels[j]]);
                }        
            }, 1000);
            
        }
    };
    this.loadStores = function(){
        
        if(cstores.length == 0){
            loadViews();
        }else{

            var nstores = 0;
            var _scripts = new Array();
            var head = document.getElementsByTagName('head')[0];
            for(var i = 0; i < cstores.length; i++){                
                
                _scripts[cstores[i]] = document.createElement('script');
                _scripts[cstores[i]].type = 'text/javascript';
                _scripts[cstores[i]].src = '/js/app/store/' + cstores[i] + '.js';

                if(Ext.isIE){
                    _scripts[cstores[i]].k = cstores[i];
                    _scripts[cstores[i]].onreadystatechange = function(){
                        if(_scripts[this.k].readyState == 'complete' || _scripts[this.k].readyState == 'loaded'){
                            nstores++;
                            if(nstores == cstores.length){
                                loadViews();
                            }
                        }
                    }
                }else{
                    _scripts[cstores[i]].addEventListener('load',function(){
                        nstores++;
                        if(nstores == cstores.length){
                            loadViews();
                        }
                    },false);
                }


                head.appendChild(_scripts[cstores[i]]);        
            }
            //cleanup
            setTimeout(function(){
                for(var j = 0; j < cstores.length; j++){
                    head.removeChild(_scripts[cstores[j]]);
                }        
            }, 1000);

        }
    };
    this.loadViews = function(){
        
        if(cviews.length == 0){
            (fn)();
        }else{

            var nviews = 0;
            var _scripts = new Array();
            var head = document.getElementsByTagName('head')[0];
            for(var i = 0; i < cviews.length; i++){
                
                var split = cviews[i].split('.');
                var controller = split[0].toLowerCase();
                var view = split[1];
                _scripts[cviews[i]] = document.createElement('script');
                _scripts[cviews[i]].type = 'text/javascript';
                _scripts[cviews[i]].src = '/js/app/view/' + controller + '/' + view + '.js';

                if(Ext.isIE){
                    _scripts[cviews[i]].k = cviews[i];
                    _scripts[cviews[i]].onreadystatechange = function(){                    
                        if(_scripts[this.k].readyState == 'complete' || _scripts[this.k].readyState == 'loaded'){
                            nviews++;
                            if(nviews == cviews.length){
                                (fn)();
                            }
                        }
                    };
                }else{
                    _scripts[cviews[i]].addEventListener('load',function(){
                        nviews++;
                        if(nviews == cviews.length){
                            rloaded = true;                            
                            (fn)();
                        }
                    },false);
                }


                head.appendChild(_scripts[cviews[i]]);        
            }
            //cleanup
            setTimeout(function(){
                for(var j = 0; j < cviews.length; j++){
                    head.removeChild(_scripts[cviews[j]]);
                }        
            }, 1000);

        }
    }
    loadModels();
}
    
function setNotification(title, text){
    Ext.create('widget.uxNotification', {
            corner: 'br',            
            //manager: 'instructions',
            //iconCls: 'notification-icon-information',
            title: title,
            html: text,
            autoDestroyDelay: 4000,
            slideInDelay: 500,
            slideDownDelay: 500,
            slideInAnimation: 'bounceOut',
            slideDownAnimation: 'easeIn'
    }).show();
}
function currencyFormat(value)
{    
    value = value.toFixed(0);
    var num = value.toString().replace(/\./g,'');
    if(!isNaN(num)){
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/,'');
    }else{
        num = value;
    }
    return num;    
}