Ext.define('Mtc.view.user.ModulesWindow', {
    extend: 'Ext.window.Window',
    title: 'Módulos',
    items: [
        {
            xtype: 'form',
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Aplicaciones',
                    id: 'appPanel'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function(){
                        this.up('window').close();
                    }
                }
            ]
        }
    ],
    constructor: function(){
        Ext.Ajax.request({
            method: 'POST',
            url: '/admin/users/getapplications',
            params: {
                iduser: this.iduser
            },
            success: function(response){
                var obj = Ext.decode(response.responseText);
                if(obj.success){
                    var apps = obj.apps;
                    var items = new Array();
                    for(var i = 0; i < apps.length; i++){
                        items.push({
                            xtype: 'checkboxfield',
                            inputValue: apps[i].idapplication,
                            fieldLabel: apps[i].application,
                            name: 'application',
                            checked: (apps[i] == 1)
                        });
                    }
                }
            }
        });
        this.superclass.constructor.apply(this, arguments);
    }
});