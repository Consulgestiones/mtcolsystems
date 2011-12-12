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
        },
        {
            text: 'Ver',
            iconCls: 'in',
            handler: function(){
                Mtc.header = Ext.getCmp('grdRemissionHeader');
                var grid = Ext.getCmp('grdRemissionHeader');
                var rows = grid.getSelectionModel().getSelection();
                if(rows.length > 0){
                    var record = rows[0];
                    Ext.require('Mtc.view.remission.RemissionView', function(){
                        var view = Ext.create('Mtc.view.remission.RemissionView');
                        var header = view.getHeaderForm();
                        header.loadRecord(record);
                        header.items.each(function(f){
                            f.readOnly = true;
                        });
                        var detailGrid = view.getDetailGrid();
                        detailGrid.getStore().load({
                            params: {
                                idremission: record.get('idremission')
                            }
                        });
                        
                        var viewPanel = Ext.create('Ext.panel.Panel', {
                            tbar: [
                                '->',
                                {
                                    text: 'Volver',
                                    iconCls: 'back',
                                    handler: function(){                                        
                                        Ext.getCmp('RemissionPanel').removeAll(true);                                        
                                        Ext.getCmp('RemissionPanel').add(Mtc.header);
                                    }
                                }
                            ],
                            items: [
                                view
                            ]
                        });
                        
                        Ext.getCmp('RemissionPanel').removeAll(true);
                        Ext.getCmp('RemissionPanel').add(viewPanel);
                    });                    
                }
            }
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