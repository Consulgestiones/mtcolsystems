Mtc.transCompanyDS = Ext.create('Mtc.store.TranspCompany', {
    autoLoad: true
});
Ext.define('Mtc.view.transpcompany.List', {
    extend: 'Ext.grid.Panel',
    requires: ['Mtc.store.TranspCompany'],
    columns: [
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
            iconCls: 'edit'
        },
        {
            text: 'Inactivar',
            iconCls: 'delete'
        }
    ],
    store: Mtc.transCompanyDS    
});