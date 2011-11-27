Mtc.transCompanyDS = Ext.create('Mtc.store.TranspCompany', {
    autoLoad: true
});
Ext.define('Mtc.view.transpcompany.List', {
    extend: 'Ext.grid.Panel',    
    requires: ['Mtc.store.TranspCompany'],
    columns: [
        Ext.create('Ext.grid.RowNumberer'),
        {
            header: 'Nombre',
            dataIndex: 'transpcompany',
            width: 200
        },
        {
            header: 'País',
            dataIndex: 'country',
            width: 150
        },
        {
            header: 'Ciudad',
            dataIndex: 'city',
            width: 150
        },
        {
            header: 'Teléfono',
            dataIndex: 'phone',
            width: 150
        },
        {
            header: 'E-mail',
            dataIndex: 'email',
            width: 150
        },
        {
            header: 'Dirección',
            dataIndex: 'address',
            width: 150
        }
    ],
    bbar: new Ext.PagingToolbar({  
        pageSize: AppConfig.gridPageSize,  
        store: Mtc.transCompanyDS,  
        displayInfo: true  
    }),
    tbar: [
        {
            text: 'Agregar',
            iconCls: 'add',
            handler: function(){
                var w = Ext.create('Mtc.view.transpcompany.FormWindow');
                w.setTitle('Crear Compañia de Transporte');
                var form = w.down('form').getForm();
                form.reset();
                w.show();
            }
        },
        {
            text: 'Editar',
            iconCls: 'edit',
            handler: function(){
                
                var grid = Ext.getCmp('transpCompanyList');
                var rows = grid.getSelectionModel().getSelection();
                
                if(rows.length === 0)return;
                
                var record = rows[0];
                
                var w = Ext.create('Mtc.view.transpcompany.FormWindow');
                w.setTitle('Editar Compañia de Transporte');
                var form = w.down('form').getForm();
                form.reset();
                
                var cbocountry = Ext.getCmp('cbocountry');
                cbocountry.store.on('load', function(cbo, opts){
                    cbocountry.setValue(record.get('idcountry'));
                });
//                cbocountry.setValue(record.get('idcountry'));
                var cbocity = Ext.getCmp('cbocity');
                if(cbocity.store.getCount() === 0){
                    cbocity.store.load({
                        params: {
                            idcountry: record.get('idcountry')
                        },
                        callback: function(){
                            cbocity.setValue(record.get('idcity'));
                        }
                    });
                }else{
                    cbocity.setValue(record.get('idcity'));
                }
                cbocity.enable();
                
                form.loadRecord(record);
                                
                w.show();
            }
        },
        {
            text: 'Inactivar',
            iconCls: 'delete'
        }
    ],
    store: Mtc.transCompanyDS,
    enableColLock: false,
    height: AppConfig.gridHeight,
    stripeRows: true
});