Ext.define('Mtc.view.remission.FormItem', {
    extend: 'Ext.form.Panel',
    defaultType: 'textfield',
    bodyStyle: 'padding: 10px;',
    url: '/inventory/remissions/putitem',
    frame: true,
    layout: {
        type: 'table',
        columns: 3
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
            })
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
                                var cant = Ext.getCmp('txtquantity').getValue();
                                var item = grid.getStore().getCount()+1;
                                
                                var row = {
                                    item: item,
                                    product: product,
                                    quantity: cant,
                                    itemprice: obj.value
                                }
                                grid.getStore().add(row);
                                
                                
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