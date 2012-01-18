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
                
                var grid = Ext.getCmp('idmine');
                var rows = grid.getSelectionModel().getSelection();
                
                if(rows.length === 0)return;
                
                var record = rows[0];                         
            }      
        }
    ]
    
});
