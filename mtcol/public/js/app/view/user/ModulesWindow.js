Ext.define('Mtc.view.user.ModulesWindow', {
    extend: 'Ext.window.Window',
    title: 'Módulos',
    iconCls: 'puzzle',
    modal: true,
    layout: 'fit',
    width: 300,
    items: [
        {
            xtype: 'form',
            frame: true,
            url: '/admin/users/setapplications',
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
                    iconCls: 'btn-cancel',
                    handler: function(){
                        setNotification('Satisfactorio', 'Las aplicaciones fueron configuradas');
                        this.up('window').close();
                    }
                },
                {
                    text: 'Aceptar',
                    iconCls: 'btn-save',
                    handler: function(){
                        var form = this.up('form').getForm();
                        var win = this.up('window');
                        form.submit({
                            success: function(frm, request){
                                var obj = Ext.decode(request.response.responseText);
                                if(obj.success){
                                    setNotification('Satisfactorio', 'Las aplicaciones fueron configuradas');
                                    win.close();
                                }else{
                                    Ext.MessageBox.show({
                                        title: 'Error!!!',
                                        msg: obj.msg
                                    })
                                }
                            }
                        });
                    }
                }
            ]
        }
    ],
    constructor: function(options){        
        Ext.Ajax.request({
            method: 'POST',
            url: '/admin/users/getapplications',
            params: {
                iduser: options.iduser || 0
            },
            success: function(response){
                var obj = Ext.decode(response.responseText);
                if(obj.success){
                    var apps = obj.data;
                    var items = new Array();
                    for(var i = 0; i < apps.length; i++){
                        items.push({
                            xtype: 'checkboxfield',
                            inputValue: apps[i].idapplication,
                            fieldLabel: apps[i].application,
                            name: 'application[]',
                            checked: (apps[i].enabled == '1')
                        });
                    }
                    Ext.getCmp('appPanel').add(items);
                }
            }
        });
        this.superclass.constructor.apply(this, arguments);
    }
});