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
            iconCls: 'btn-save'
        }
           
    ]
    
});