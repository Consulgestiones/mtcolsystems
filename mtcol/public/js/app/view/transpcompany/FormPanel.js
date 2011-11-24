Ext.define('Mtc.view.transpcompany.FormPanel', {
    extend: 'Ext.form.Panel',
    defaultType: 'textfield',
    layout: {
        type: 'table',
        columns: 2
    },
    frame: true,
    itemCls: 'left-space',
    bodyStyle: 'padding: 10px;',
    items: [
        {
            fieldLabel: 'Nombre',
            name: 'transpcompany',
            allowBlank: false
        },
        {
            fieldLabel: 'E-mail',
            name: 'email',
            allowBlank: false
        },
        {
            fieldLabel: 'Teléfono',
            name: 'phone',
            allowBlank: false
        },
        {
            fieldLabel: 'Dirección',
            name: 'address',
            allowBlank: false
        },
        {
            xtype: 'country',
            name: 'idcountry',
            fieldLabel: 'País',
            listeners: {
                select: function(){
                    var cbo = Ext.getCmp('cbocity');
                    cbo.store.load({
                        params: {
                            idcountry: this.getValue()
                        },
                        callback: function(rows, operation, success){
                            console.debug(success);
//                            var obj = Ext.decode(response.responseText);
                            cbo.enable();
                        }
                    });                    
                }
            }
        },
        {
            xtype: 'city',
            id: 'cbocity',
            disabled: true,
            fieldLabel: 'Ciudad'
        }
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
            iconCls: 'btn-save'
        }
    ]
});