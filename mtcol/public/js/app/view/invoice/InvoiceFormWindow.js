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
            xtype: 'grid',
            store: Ext.create('Mtc.store.InvoiceDetail'),
            width: 540,
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
                    width: 50
                },
                {
                    header: 'Cantidad',
                    dataIndex: 'quantity',
                    width: 50
                },
                {
                    header: 'Valor Unitario',
                    dataIndex: 'unitprice',
                    width: 60
                },
                {
                    header: 'IVA',
                    dataIndex: 'tax',
                    width: 30
                },
                {
                    header: 'Valor IVA',
                    dataIndex: 'taxvalue',
                    width: 70
                },
                {
                    header: 'Valor Total',
                    dataIndex: 'totalprice',
                    width: 80
                }
            ],
            tbar: [
                {
                    text: 'Agregar Item',
                    iconCls: 'add',
                    handler: this.add
                },
                {
                    text: 'Eliminar Item',
                    iconCls: 'delete'
                }
            ],
            add: function(){
                var grid = this;
                var position = grid.getStore().getCount();
                var id = Ext.id();
                var defaultData = {
                    newRecordId: id
                };
//                var Item = grid.getStore().recordType;
//                var item = new Item(defaultData, id);
                var item = [
                    {name: 'item'},
                    {name: 'product'},
                    {name: 'unit'},
                    {name: 'quantity'},
                    {name: 'unitprice'},
                    {name: 'tax'},
                    {name: 'taxvalue'},
                    {name: 'totalprice'}
                ];
                grid.stopEditing();
                grid.getStore().insert(position, item);
                grid.startEditing(position, 1);
            }
        }
    ]
});