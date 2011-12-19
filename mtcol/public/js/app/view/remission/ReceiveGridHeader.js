Ext.define('Mtc.view.remission.ReceiveGridHeader', {
    extend: 'Ext.grid.Panel',
    columns: [
        {
            header: 'No',
            dataIndex: 'remissionnumber',
            width: 20
        },
        {
            header: 'Titulo',
            dataIndex: 'title',
            width: 200
        },
        {
            header: 'Creada el',
            dataIndex: 'dcreate',
            width: 100
        },
        {
            header: 'Creada por',
            dataIndex: 'user',
            width: 150
        },
        {
            header: 'Empresa transporte',
            dataIndex: 'transpcompany',
            width: 200
        },
        {
            header: 'Conductor',
            dataIndex: 'drivername',
            width: 150
        }
    ],
    tbar: [
        {
            text: 'Recibir Inventario',
            iconCls: 'deposit',
            handler: function(){
                
                //Formulario del encabezado
                var grid = Ext.getCmp('ReceiveGridHeader');
                var rows = grid.getSelectionModel().getSelection();
                if(rows.length === 0)
                    return;
                
                var record = rows[0];
                
                var formHeader = Ext.create('Mtc.view.remission.ReceiveFormHeader', {
                    id: 'ReceiveFormHeader'
                });
                formHeader.loadRecord(record);
                
                //Grilla de detalle
                var detailDS = Ext.create('Mtc.store.ReceiveGridDetail', {
                        storeId: 'ReceiveGridDetailDS'
                    });
                    
                var detail = Ext.create('Mtc.view.remission.ReceiveGridDetail', {
                    id: 'ReceiveGridDetail',
                    store: detailDS,
                    listeners: {
                        itemclick: function(grid, record, item, index, e, o){                                                         
                            var itemForm = Ext.create('Mtc.view.remission.ReceiveFormItem', {
                                
                            });
                            itemForm.loadRecord(record);
                            var win = Ext.create('Ext.window.Window', {
                                title: 'Recibir Item',
                                items: [
                                    itemForm
                                ],
                                modal: true
                            }).show()
                        }
                    }
                });
                
                detailDS.load({
                    params: {
                        idremission: record.get('idremission')
                    }
                });
                
                var win = Ext.create('Ext.window.Window', {
                    title: 'Recibir Inventario',
                    modal: true,
                    items: [
                        formHeader,
                        detail
                    ]
                }).show();
            }
        }
    ],
    stripeRows: true,
    height: AppConfig.gridHeight
});