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
        {
            xtype: 'hidden',
            name: 'idmine'
        }
    ],
    buttons: [
        {
            text: 'Cancelar',
            iconCls: 'btn-cancel',
            handler: function(){
                var w = this.up('window');
                w.close();
            }
        },
        {
            text: 'Guardar',
            iconCls: 'btn-save',
            formBind: true,
            handler: function(){
                var grid = Ext.getCmp('MineGrid');
                var win = this.up('window');                
                var form = this.up('form').getForm();
                if(form.isValid()){
                    win.el.mask('Guardando…', 'x-mask-loading');
                    var formData = form.getValues();
                    Ext.Ajax.request({
                      url: '/Mine/savemine',  
                      method: 'POST',
                      params: {
                            params: Ext.encode(formData)
                      },
                    success: function(response){
                            win.close();
                            var obj = Ext.decode(response.responseText);
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
                            }                           
                        }
                    });
                }
            }
        },
       
    ]
    
});