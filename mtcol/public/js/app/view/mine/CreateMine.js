Ext.define('Mtc.view.mine.CreateMine',{
    extend: 'Ext.form.Panel',
    defaultType: 'textfield',
    layout: {
        type: 'table',
        columns: 1
    },
    frame: true,
    itemCls: 'left-space',
    bodyStyle: 'padding: 10px;',
    items:[
        {
            fieldLabel: 'Nombre Mina',
            name: 'mine',
            allowBlank: false        
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Descripción',
            name: 'description',
            allowBlank: false        
        },
    ],
    buttons: [
        {
            text: 'Cancelar',
            iconCls: 'btn-cancel',
            handler: function(){
                var w = this.up('window');
                w.hide();
            }
        },
        {
            text: 'Guardar',
            iconCls: 'btn-save',
            formBind: true,
            handler: function(){
                var form = this.up('form').getForm();
                if(form.isValid()){
                    var win = this.up('window');
                    win.el.mask('Guardando…', 'x-mask-loading');
                    var formData = form.getValues();
                    Ext.Ajax.request({
                      url: '/Mine/savemine',  
                      method: 'POST',
                      params: {
                            params: Ext.encode(formData)
                      },
                    success: function(response){
                            var obj = Ext.decode(response.responseText);
                           // var grid = Ext.getCmp('transpCompanyList');
                            
                            
                            win.el.unmask();
                            if(obj.success){
                                if(obj.action == 'create'){
                                    grid.getStore().insert(0, obj.data);
                                }else{
                                    var index = grid.getStore().find('idmine', formData['idmine']);
                                    if(index != -1){
                                        var rec = grid.getStore().getAt(index);
                                        rec.set(obj.data);
                                        rec.commit();
                                    }                                    
                                }
                                form.reset();
                                win.hide();
                                setNotification('Mina creada', 'La Mina ha sido creada en el sistema');
                            }
                        }
                    });
                }
            }
        }
    ]
    
});