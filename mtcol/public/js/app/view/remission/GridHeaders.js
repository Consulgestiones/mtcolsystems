Ext.define('Mtc.view.remission.GridHeaders', {
    extend: 'Ext.grid.Panel',
    store: Ext.create('Mtc.store.RemissionHeader'),
    bbar: new Ext.PagingToolbar({  
        pageSize: AppConfig.gridPageSize,  
        store: Ext.data.StoreManager.lookup('RemissionHeader'),  
        displayInfo: true  
    }),
    tbar: [
        {
            text: 'Ingresar',
            iconCls: 'add',
            handler: function(){
                var win = Ext.create('Mtc.view.remission.WindowForm');
                win.show();
            }
        },
        {
            text: 'Editar',
            iconCls: 'edit'
        }
    ],
    columns: [
        {
            header: 'No',
            dataIndex: 'remissionnumber'
        },
        {
            header: 'Titulo',
            dataIndex: 'title'
        },
        {
            header: 'Transportador',
            dataIndex: 'transpcompany'
        },
        {
            header: 'Fecha',
            dataIndex: 'dremission'
        },
        {
            header: 'Estado',
            dataIndex: 'status'
        },
        {
            header: 'Conductor',
            dataIndex: 'drivername'
        },
        {
            header: 'Placa Vehiculo',
            dataIndex: 'vehicleplate'
        }
    ],
    stripeRows: true,
    height: AppConfig.gridHeight
});