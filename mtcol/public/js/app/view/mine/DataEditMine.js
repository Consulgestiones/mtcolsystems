Ext.define('Mtc.view.mine.DataEditMine',{
    extend: 'Ext.form.Panel',
    defaultType: 'textfield',
    layout: {
        type: 'table',
        columns: 1
    },
    items: [
        {
            fieldLabel: 'Nombre Mina: ',
            name: 'mine',
            allowBlank: false
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Descripción: ',
            name: 'email',
            allowBlank: false
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
            iconCls: 'btn-save',
            handler: function(){
                var w = this.up('window');
                w.hide();
                               
            }      
        }
    ]
    
});
