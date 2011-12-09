Ext.define('Mtc.view.remission.FormItem', {
    extend: 'Ext.form.Panel',
    defaultType: 'textfield',
    bodyStyle: 'padding: 10px;',
    url: '/inventory/remissions/putitem',
    frame: true,
    anchor: '100%',
    layout: {
        type: 'table',
        columns: 4
    },
    itemCls: 'left-space',
    items: [
        {
            xtype: 'combo',
            name: 'idproduct',
            id: 'cboproduct',
            fieldLabel: 'Producto',
            displayField: 'product',
            valueField: 'idproduct',
            queryMode: 'remote',
            minChars: 3,
            forceSelection: true,
            typeAhead: true,
            valueNotFoundText: 'Seleccione el producto...',
            emptyText: 'Producto',
            store: Ext.create('Mtc.store.ProductAll', {
                autoLoad: false
            }),
            listeners: {
                scope: this,
                select: function(){
                    //obtener combo de productos
                    var cboprod = Ext.getCmp('cboproduct');
                    //obtener el index que se ha seleccionado
                    var index = cboprod.store.find('idproduct', cboprod.getValue());                    
                    //obtener la unidad del store
                    var unit = cboprod.store.data.items[index].get('unit');                    
                    //setear unidad en el campo de unidad
                    Ext.getCmp('txtunit').setValue(unit);
                }
            }
        },
        {
            fieldLabel: 'Unidad',
            name: 'unit',
            size: 5,
            id: 'txtunit',
            readOnly: true
        },
        {
            fieldLabel: 'Cantidad',
            name: 'quantity',
            id: 'txtquantity'
        },
        {
            xtype: 'button',
            text: 'Item',
            iconCls: 'add',
            handler: function(){
                var form = this.up('form').getForm();
                if(form.isValid()){
                    
                    var values = form.getValues();
                    
                    Ext.Ajax.request({
                        url: '/inventory/remissions/putitem',
                        method: 'POST',
                        params: {
                            idproduct: values.idproduct,
                            quantity: values.quantity
                        },
                        success: function(response){
                            var obj = Ext.decode(response.responseText);
                            if(obj.success){
                                var grid = Ext.getCmp('GridDetail');
                                
                                var cboprod = Ext.getCmp('cboproduct');
                                var idproduct = cboprod.getValue();
                                var index = cboprod.store.find('idproduct', idproduct);
                                var product = cboprod.store.data.items[index].get('product');
                                var unit = cboprod.store.data.items[index].get('unit');
                                var cant = Ext.getCmp('txtquantity').getValue();
                                var item = grid.getStore().getCount()+1;
                                
                                var row = {
                                    item: item,
                                    idproduct: idproduct,
                                    product: product,
                                    unit: unit,
                                    quantity: cant,
                                    itemprice: obj.value
                                }
                                grid.getStore().add(row);
                                form.reset();
                            }else{
                                Ext.Msg.show({
                                    title: 'Error',
                                    msg: obj.msg,
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                    });
                    
                }
            }
        }
    ]
});