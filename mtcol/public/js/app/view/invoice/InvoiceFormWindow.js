Ext.define('Mtc.view.invoice.InvoiceFormWindow', {
    extend: 'Ext.window.Window',    
    id: 'InvoiceFormWindow',
    height: 540,    
    layout: 'vbox',
    modal: true,
    items: [
        {
            xtype: 'form',
            name: 'form1',
            id: 'InvoiceFormWinHeader',
            bodyStyle: 'padding: 10px;',
            itemCls: 'left-space',
            frame: true,
            width: 850,
            layout: {
                type: 'table',
                columns: 3
            },
            defaultType: 'textfield',
            items: [
                {
                    colspan: 3,
                    fieldLabel: 'Titulo',
                    width: 785
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Proveedor',
                    name: 'idprovider',
                    id: 'invoice_form_provider',
                    store: Ext.create('Mtc.store.Provider', {
                        autoLoad: true
                    }),
                    displayField: 'provider',
                    valueField: 'idprovider',
                    queryMode: 'local',
                    listeners: {
                        select: function(cbo, value, options){
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
                            });
                            var grid = Ext.getCmp('InvoiceFormWindowGrid');
                            grid.getStore().removeAll(false);
                        }
                    }
                },
                {
                    fieldLabel: 'No',
                    name: 'invoicenumber',
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    name: 'dinvoice',
                    fieldLabel: 'Fecha Factura',
                    id: 'invoice_form_date',
                    format: 'd/m/Y',
                    allowBlank: false
                },
                {
                    fieldLabel: 'Entrega',
                    allowBlank: false,
                    name: 'productservice'
                },
                /*{
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
                    },
                    allowBlank: false
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
                    store: Ext.create('Mtc.store.City'),
                    allowBlank: false
                },    */            
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
                    queryMode: 'local',
                    allowBlank: false,
                    selectOnFocus: true
                },
                {
                    fieldLabel: 'E-mail',
                    id: 'txtprovideremail',
                    name: 'provideremail',
                    allowBlank: false
                },
                {
                    xtype: 'combo',
                    name: 'idinvoicestatus',
                    fieldLabel: 'Estado',
                    displayField: 'invoicestatus',
                    valueField: 'idinvoicestatus',
                    store: Ext.create('Mtc.store.InvoiceStatus', {
                        autoLoad: true
                    }),                    
                    queryMode: 'local',
                    allowBlank: false
                },
                {
                    xtype: 'combo',
                    name: 'artifact',
                    fieldLabel: 'Tipo Entrada',
                    queryMode: 'local',
                    store: new Ext.data.SimpleStore({
                        fields: ['artifact', 'item'],
                        data: [
                            ['IV', 'Factura'],
                            ['PO', 'Orden de Compra']
                        ]
                    }),
                    displayField: 'item',
                    valueField: 'artifact',
                    typeAhead: true,
                    triggerAction: 'all',
                    selectOnFocus: true
                }
            ]              
        },        
        {
            xtype: 'form',
            frame: true,
            width: 850,
            itemCls: 'left-space',
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
                    columnWidth: .30,
                    listeners: {
                        select: function(cbo, value, options){
                            var record = value[0];
                            Ext.getCmp('InvoiceFormWindowTax').setValue(record.get('tax'));
                        }
                    },
                    allowBlank: false
                },
                {
                    name: 'quantity',
                    emptyText: 'Cantidad',
                    id: 'InvoiceFormWinQuantity',
                    width: 30,
                    columnWidth: .15,
                    allowBlank: false
                },
                {
                    name: 'tax',
                    id: 'InvoiceFormWindowTax',
                    emptyText: 'IVA %',
                    width: 25,
                    columnWidth: .15,
                    allowBlank: false
                },                
                {
                    name: 'unitprice',
                    id: 'InvoiceFormWinUnitPrice',
                    emptyText: 'Valor unitario',
                    width: 25,
                    columnWidth: .30,
                    allowBlank: false
                },
                {
                    xtype: 'checkbox',
                    name: 'hastax',
                    boxLabel: 'Incluye IVA',
                    inputValue: 1,
                    id: 'InvoiceFormWinItemHasTax'
                },
                {
                    xtype: 'button',
                    text: 'Item',
                    iconCls: 'add',
                    columnWidth: .10,
                    handler: function(){
                        
                        var form = this.up('form');
                        if(!form.getForm().isValid())return;
                        
                        var hastax = Ext.getCmp('InvoiceFormWinItemHasTax');
                        
                        var cboprod = Ext.getCmp('InvoiceFormWindowProduct');
                        var txtquantity = Ext.getCmp('InvoiceFormWinQuantity');
                        var txttax = Ext.getCmp('InvoiceFormWindowTax');                        
                        var txtunitprice = Ext.getCmp('InvoiceFormWinUnitPrice'); 
                        
                        var unitprice = parseFloat(txtunitprice.getValue());
                        var tax = parseFloat(txttax.getValue());
                        var quantity = parseFloat(txtquantity.getValue());
                        
                        var index = cboprod.store.find('idproduct', cboprod.getValue());
                        var idproduct = cboprod.store.data.items[index].get('idproduct');
                        var product = cboprod.store.data.items[index].get('product');
                        var unit = cboprod.store.data.items[index].get('unit');
                        
                        var taxvalue = 0;
                        var itemprice = 0;
                        
                        if(hastax.getValue() == 1){
                            taxvalue = (unitprice - (unitprice / (tax / 100 + 1))) * quantity;
                            itemprice = ((unitprice / (tax/100+1)) * quantity);
                        }else{
                            taxvalue = ((unitprice * (tax / 100))) * quantity;
                            itemprice = unitprice * quantity;
                        }
                        
                        var grid = Ext.getCmp('InvoiceFormWindowGrid');
                        
                        var item = grid.getStore().getCount()+1;

                        var row = {
                            item: item,
                            idproduct: idproduct,
                            product: product,
                            unit: unit,
                            quantity: quantity,
                            unitprice: unitprice,
                            hastax: (hastax.getValue() == 1)?'Si':'No',
                            tax: tax,
                            itemprice: itemprice,
                            taxvalue: taxvalue,
                            totalprice: (itemprice + taxvalue)
                        };
                        grid.getStore().add(row);
                        
                        cboprod.reset();
                        txtquantity.reset();
                        txttax.reset();
                        txtunitprice.reset();
                    }
                }
            ]
        },
        {
            xtype: 'grid',
            store: Ext.create('Mtc.store.InvoiceDetailItem'),
            width: 850,
            height: 300,
            features: [{
                ftype: 'summary'
            }],
//            plugins: [
//                Ext.create('Ext.grid.plugin.RowEditing', {
//                    clicksToEdit: 1
//                })
//            ],            
            columns: [                
                {
                    header: 'Item',
                    dataIndex: 'item',
                    width: 40
                },
                {
                    header: 'Descripción',
                    dataIndex: 'product',
                    width: 150
                },
                {
                    header: 'Unidad',
                    dataIndex: 'unit',
                    width: 50
                },
                {
                    header: 'Cantidad',
                    dataIndex: 'quantity',
                    width: 55,
                    renderer: function(value){
                        return currencyFormat(value);
                    },
                    align: 'right'
                },
                {
                    header: 'Valor Unitario',
                    dataIndex: 'unitprice',
                    width: 80,
                    renderer: function(value){
                        return currencyFormat(value);
                    },
                    align: 'right'
                },
                {
                    header: 'Incluye IVA',
                    dataIndex: 'hastax',
                    width: 70
                },
                {
                    header: 'IVA',
                    dataIndex: 'tax',
                    width: 30
                },
                {
                    header: 'Valor',
                    dataIndex: 'itemprice',
                    width: 110,
                    renderer: function(value){
                        return currencyFormat(value);
                    },
                    align: 'right',
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex){
                        return Ext.String.format('Subtotal {0}', currencyFormat(value));
                    }
                },
                {
                    header: 'Valor IVA',
                    dataIndex: 'taxvalue',
                    width: 110,
                    renderer: function(value){
                        return currencyFormat(value);
                    },
                    align: 'right',
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex){
                        return Ext.String.format('IVA {0}', currencyFormat(value));
                    }
                },
                {
                    header: 'Valor Total',
                    dataIndex: 'totalprice',
                    width: 130,
                    renderer: function(value){
                        return currencyFormat(value);
                    },
                    align: 'right',
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex){
                        return Ext.String.format('TOTAL {0}', currencyFormat(value));
                    }
                }
            ],
            id: 'InvoiceFormWindowGrid',
            selType: 'rowmodel',
            enableColLock: false,
            stripeRows: true,
            bbar: [
                {
                    text: 'Eliminar Item',
                    iconCls: 'delete',
                    handler: function(){
                        var grid = Ext.getCmp('InvoiceFormWindowGrid');
                        var rows = grid.getSelectionModel().getSelection();
                        if(rows.length === 0)return;
                        
                        var record = rows[0];
                        grid.getStore().remove(record);
                    }
                }
            ]
        }
    ],
    buttons: [
        {
            text: 'Cancelar',
            iconCls: 'btn-cancel',
            handler: function(){
                var grid = Ext.getCmp('InvoiceFormWindow');
                grid.close();
            }
        },
        {
            text: 'Ingresar',
            iconCls: 'btn-save',
            handler: function(){
                var win = this.up('window');
                win.el.mask('Guardando…', 'x-mask-loading');
                
                var form = Ext.getCmp('InvoiceFormWinHeader');
                var grid = Ext.getCmp('InvoiceFormWindowGrid');
                var formData = form.getForm().getValues();
                var gridData = new Array();                
                grid.getStore().each(function(record){
                    var row = new Object();
                    record.fields.each(function(f){                        
                        row[f.name] = record.get(f.name);
                    });
                    gridData.push(row);
                });
                Ext.Ajax.request({
                    url: '/inventory/invoices/addinvoice',
                    method: 'POST',
                    params: {
                        header: Ext.encode(formData),
                        detail: Ext.encode(gridData)
                    },
                    success: function(response){
                        var obj = Ext.decode(response.responseText);
                        if(obj.success){
                            Ext.getCmp('invoiceGrid').getStore().insert(0, obj.data);
                            var grid = Ext.getCmp('InvoiceFormWindow');
                            grid.close();
                            setNotification('Orden de compra creada', 'La orden de compra se ha creado satisfactoriamente');
                        }else{
                            Ext.MessageBox.show({
                                title: 'Error!!!',
                                msg: 'Ocurrio un error al ingresar el documento, por favor intente de nuevo mas tarde'
                            });
                            win.el.unmask();
                        }                        
                    }
                })
            }
        }
    ]
});
