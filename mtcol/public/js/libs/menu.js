Ext.onReady(function(){
    var menu = getGlobal('menu');
    var modulemenu = new Array();
    
    var currentmodule = Ext.get('module').getValue();
    
    for(var w = 0; w < menu.length; w++){
        if(menu[w].module == currentmodule)
            modulemenu.push(menu[w]);
    }
    
    var mnuitems = new Array();
    if(modulemenu.length > 0){
        /**
         * Sub menus
         */
        var menuStructure = new Array();                
        var level = new Array();
        var counts = new Array();
        for(var j = 0; j < modulemenu.length; j++){
            var idparent = modulemenu[j].idparent;

            if(typeof counts[idparent] == 'undefined')
                counts[idparent] = 0;
            if(typeof level[idparent] == 'undefined')
                level[idparent] = new Array();

            level[idparent].push(menu[j]);
            counts[idparent] = (counts[idparent]+1);
        }



    //                for(var i = 0; i < menu.length; i++){
        for(var i = 0; i < level[0].length; i++){

            var mnu = level[0][i];

            /**
             * Se crea sub menu para cada opcion principal del menu
             */
            var submenu;
            if(typeof level[mnu.idmenu] != 'undefined'){
                var itms = new Array();
                for(var k = 0; k < level[mnu.idmenu].length; k++){
                    var smenu = level[mnu.idmenu][k];
                    itms.push({
                        text: smenu.menu,
                        func: smenu.func,
                        myParams: smenu.params,
                        handler: function(){
                            if(typeof window[this.func] !=  'undefined')
                                eval(this.func + '(' + this.myParams + ')');
                        }
                    });
                }

                submenu = Ext.menu.Menu({
                    id: 'submenu_' + i + '_' + mnu.id,
                    items: itms
                });
            }else{
                submenu = null;
            }

            mnuitems.push({
                id: 'mnu' + mnu.idmenu,
                text: mnu.menu,
                myParams: mnu.params,
                func: mnu.func,
                handler: function(){                            
                    if(typeof window[this.func] == 'function')
                        eval(this.func + '(' + this.myParams + ')');
                },
                menu: submenu
            });

        }
    }

    mnuitems.push({
       text: 'Salir' 
    });

    Ext.create('Ext.toolbar.Toolbar', {
        id: 'main-menu',
        renderTo: Ext.get('layout-menu'),
        items: mnuitems
    });    
});
   
   
function nothingToDo(){}
function goTo(params){    
    document.location = params.path;
}
function validateFunction(p){    
    alert(p);
}
function setSection(params){
    var head = document.getElementsByTagName('head');
    if(typeof scriptfunc != 'undefined')
        head[0].removeChild(scriptfunc);
    
    $('#slot1').empty();    
    
    scriptfunc = document.createElement('script');
    scriptfunc.type = 'text/javascript';
    scriptfunc.src = params.src;
//    script.src = '/js/admin/profiles_index.js';
        
    head[0].appendChild(scriptfunc);       
}