//var itemStore = Ext.create('Mtc.store.InvoiceDetailItem');
//var cm = new Ext.grid.ColumnModel([
//    {
//        header: 'item',
//        dataIndex: 'item'
//    },
//    {
//        header: 'Descripción',
//        dataIndex: 'product',
//        editor: {
//            xtype: 'textfield',
//            allowBlank: false
//        }
//    },
//    {
//        header: 'Unidad',
//        dataIndex: 'unit',
//        editor: {
//            xtype: 'textfield',
//            allowBlank: false
//        }
//    },
//    {
//        header: 'Precio Unitario',
//        dataIndex: 'unitprice',
//        editor: {
//            xtype: 'textfield',
//            allowBlank: false
//        }
//    },
//    {
//        header: 'IVA',
//        dataIndex: 'tax',
//        editor: {
//            xtype: 'textfield',
//            allowBlank: false
//        }
//    },
//    {
//        header: 'Valor IVA',
//        dataIndex: 'taxvalue',
//        editor: {
//            xtype: 'textfield',
//            allowBlank: false
//        }
//    },
//    {
//        header: 'Precio Total',
//        dataIndex: 'totalprice',
//        editor: {
//            xtype: 'textfield',
//            allowBlank: false
//        }
//    }
//]);
//var grid = new Ext.grid.EditorGridPanel({
//   store: itemStore,
//   cm: cm,
//   clicksToEdit: 1,
//   width: 540,
//   height: 500,
//   tbar: [
//       {
//           text: 'Agregar Item',
//           itemCls: 'add'
//       },
//       {
//           text: 'Eliminar Item',
//           itemCls: 'delete'
//       }
//   ]
//});


Ext.define('Mtc.view.invoice.InvoiceFormWindow', {
    extend: 'Ext.window.Window',    
    height: 600,    
    layout: 'vbox',
    modal: true,
    items: [
        {
            xtype: 'form',
            name: 'form1',
            bodyStyle: 'padding: 10px;',
            itemCls: 'left-space',
            frame: true,
            layout: {
                type: 'table',
                columns: 2
            },
            defaultType: 'textfield',
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Proveedor',
                    id: 'invoice_form_provider',
                    store: Ext.create('Mtc.store.Provider', {
                        autoLoad: true
                    }),
                    displayField: 'provider',
                    valueField: 'idprovider',
                    queryMode: 'local',
                    listeners: {
                        select: function(cbo, value, options){
//                            var selIndex = cbo.store.find('idprovider', value);
//                            var record = cbo.store.getAt(selIndex);
                            Ext.getCmp('txtproviderphone').setValue(value[0].get('providerphone'));
                            Ext.getCmp('txtprovideremail').setValue(value[0].get('provideremail'));  
                            var cboprods = Ext.getCmp('InvoiceFormWindowProduct');
                            cboprods.store.load({
                                params: {
                                    idprovider: value[0].get('idprovider')
                                },
                                callback: function(request){
                                    cboprods.enable();
                                }
                            })
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Fecha',
                    id: 'invoice_form_date',
                    format: 'd/m/Y'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Pais',
                    store: Ext.create('Mtc.store.Country', {
                        autoLoad: true
                    }),
                    name: 'idcountry',
                    queryMode: 'local',
                    valueField: 'idcountry',
                    displayField: 'country',
                    listeners: {
                        select: function(){
                            var cbocity = Ext.getCmp('cbocity');                            
                            cbocity.clearValue();
                            cbocity.store.load({
                                params: {
                                    idcountry: this.getValue()
                                },
                                callback: function(){
                                    cbocity.enable();
                                }
                            });
                        }
                    }
                },
                {
                    xtype: 'combo',
                    id: 'cbocity',
                    fieldLabel: 'Ciudad',
                    disabled: true,
                    queryMode: 'local',
                    valueField: 'idcity',
                    displayField: 'city',
                    name: 'idcity',
                    store: Ext.create('Mtc.store.City')
                },
                {
                    fieldLabel: 'Entrega',
                    allowBlank: false,
                    name: 'productservice'
                },
                {
                    fieldLabel: 'Teléfono',
                    id: 'txtproviderphone',
                    name: 'providerphone',
                    allowBlank: false
                },
                {
                    fieldLabel: 'Forma de Pago',
                    xtype: 'combo',
                    name: 'idpaymentmethod',
                    displayField: 'paymentmethod',
                    valueField: 'idpaymentmethod',
                    store: Ext.create('Mtc.store.PaymentMethod', {
                        autoLoad: true
                    }),
                    queryMode: 'local'
                },
                {
                    fieldLabel: 'E-mail',
                    id: 'txtprovideremail',
                    name: 'provideremail',
                    allowBlank: false
                }
            ]              
        },        
        {
            xtype: 'form',
            frame: true,
            width: 550,
            defaultType: 'textfield',
            layout: 'column',
            items: [
                {
                    xtype: 'combo',
                    name: 'idproduct',
                    id: 'InvoiceFormWindowProduct',
                    emptyText: 'Producto',
                    queryMode: 'local',
                    store: Ext.create('Mtc.store.Product', {
                        autoLoad: true
                    }),
                    displayField: 'product',
                    valueField: 'idproduct',
                    disabled: true,
                    columnWidth: .50
                },
                {
                    name: 'quantity',
                    emptyText: 'Cantidad',
                    width: 30,
                    columnWidth: .20
                },
                {
                    name: 'tax',
                    emptyText: 'IVA %',
                    width: 30,
                    columnWidth: .20
                },
                {
                    xtype: 'button',
                    iconCls: 'add',
                    columnWidth: .10
                }
            ]
        },
        {
            xtype: 'grid',
            store: Ext.create('Mtc.store.InvoiceDetailItem'),
            width: 550,
            height: 500,
            plugins: [
                Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 1
                })
            ],            
            columns: [                
                {
                    header: 'Item',
                    dataIndex: 'item',
                    width: 30,
                    editor: {
                        xtype:'textfield',
                        allowBlank:false
                    }
                },
                {
                    header: 'Descripción',
                    dataIndex: 'product',
                    width: 150,
                    editor: {
                        xtype:'textfield',
                        allowBlank:false
                    }
                },
                {
                    header: 'Unidad',
                    dataIndex: 'unit',
                    width: 50,
                    editor: {
                        xtype:'textfield',
                        allowBlank:false
                    }
                },
                {
                    header: 'Cantidad',
                    dataIndex: 'quantity',
                    width: 50,
                    editor: {
                        xtype:'textfield',
                        allowBlank:false
                    }
                },
                {
                    header: 'Valor Unitario',
                    dataIndex: 'unitprice',
                    width: 60,
                    editor: {
                        xtype:'textfield',
                        allowBlank:false
                    }
                },
                {
                    header: 'IVA',
                    dataIndex: 'tax',
                    width: 30,
                    editor: {
                        xtype:'textfield',
                        allowBlank:false
                    }
                },
                {
                    header: 'Valor IVA',
                    dataIndex: 'taxvalue',
                    width: 70,
                    editor: {
                        xtype:'textfield',
                        allowBlank:false
                    }
                },
                {
                    header: 'Valor Total',
                    dataIndex: 'totalprice',
                    width: 80,
                    editor: {
                        xtype:'textfield',
                        allowBlank:false
                    }
                }
            ],
            id: 'InvoiceFormWindowGrid',
            selType: 'rowmodel',
            enableColLock: false,
            stripeRows: true/*,
            tbar: [
                {
                    text: 'Agregar Item',
                    iconCls: 'add',
                    handler: function(){
                        
                        var grid = Ext.getCmp('InvoiceFormWindowGrid');
                        var position = grid.getStore().getCount();
                        var item = new Mtc.model.InvoiceDetailItem({item: (position+1)});
                        grid.getStore().insert(position, item);
//                        grid.startEditing(position, 2);
                    }
                },
                {
                    text: 'Eliminar Item',
                    iconCls: 'delete'
                }
            ]*/
        }
    ]
});
