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
                    ],
                    buttons: [
                        {
                            text: 'Cancelar',
                            iconCls: 'btn-cancel',
                            handler: function(){
                                this.up('window').close();
                            }
                        },
                        {
                            text: 'Recibir',
                            iconCls: 'btn-save',
                            handler: function(){
                                
                                var grid = Ext.getCmp('ReceiveGridDetail');
                                var store = grid.getStore();
                                var detailData = new Array();
                                var row;
                                store.each(function(record){
                                    row = new Object();
                                    if(record.get('complete') == ''){
                                        Ext.Msg.show({
                                            title: 'Incompleto',
                                            msg: 'Debe confirmata todos y cada uno de los items',
                                            icon: Ext.Msg.ERROR,
                                            buttons: Ext.Msg.OK
                                        });
                                        return;
                                    }else{
                                        record.fields.each(function(field){
                                            row[field.name] = record.get(field.name);
                                        });
                                        detailData.push(row);
                                    }
                                });
                                
                                var header = Ext.getCmp('ReceiveFormHeader');
                                var form = header.getForm();
                                var headerData = form.getValues();
                                var idremission = headerData.idremission;
                                                                                               
                                Ext.Ajax.request({
                                    method: 'POST',
                                    url: '/inventory/remissions/receive',
                                    params: {
                                        idremission: idremission,
                                        detail: Ext.encode(detailData)
                                    },
                                    callback: function(response){
                                        var obj = Ext.decode(response.responseText);
                                        if(obj.success){
                                            
                                        }else{
                                            Ext.Msg.show({
                                                title: 'Error!!!',
                                                msg: obj.msg,
                                                icon: Ext.Msg.ERROR,
                                                buttons: Ext.Msg.OK
                                            });
                                        }
                                    }
                                });
                                
                            }
                        }
                    ]
                }).show();
            }
        }
    ],
    stripeRows: true,
    height: AppConfig.gridHeight
});