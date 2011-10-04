Ext.onReady(function(){
   Ext.Ajax.request({
        url: '/default/menu/getmenu',
        params: {
            mod: Ext.get('module').getValue()
        },
        success: function(response){
            var r = Ext.decode(response.responseText);            
            
            if(r.status == 'success'){
                var menu = r.data;
                var items = new Array();
                if(menu.length > 0){
                    /**
                     * Sub menus
                     */
                    var menuStructure = new Array();                
                    var level = new Array();
                    var counts = new Array();
                    for(var j = 0; j < menu.length; j++){
                        var idparent = menu[j].idparent;

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

                        items.push({
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
                
                items.push({
                   text: 'Salir' 
                });
                
                Ext.create('Ext.toolbar.Toolbar', {
                   renderTo: Ext.get('layout-menu'),
                   items: items
                });
            }else{
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: r.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }        
        }
    }); 
});
function nothingToDo(){}
function goTo(params){    
    document.location = params.path;
}
function validateFunction(p){    
    alert(p);
}