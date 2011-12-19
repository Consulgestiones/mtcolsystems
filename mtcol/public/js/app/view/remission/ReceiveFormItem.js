Ext.define('Mtc.view.remission.ReceiveFormItem', {
    extend: 'Ext.form.Panel',
    defaultType: 'textfield',
    bodyStyle: 'padding: 10px;',
    items: [
        {
            fieldLabel: 'Item',
            name: 'item',
            readOnly: true
        },
        {
            fieldLabel: 'Descripción',
            name: 'product',
            readOnly: true
        },
        {
            fieldLabel: 'Unidad',
            name: 'unit',
            readOnly: true
        },
        {
            fieldLabel: 'Cantidad Enviada',
            name: 'quantity',
            id: 'txtquantity',
            readOnly: true
        },
        {
            xtype: 'checkbox',
            fieldLabel: 'Incompleto',
            name: 'incomplete',
            listeners: {
                change: function(){
                    var f = Ext.getCmp('txtquantityreceive');
                    if(this.getValue()){
                        f.enable();                        
                    }else{
                        var q = Ext.getCmp('txtquantity');
                        f.setValue(q.getValue());
                        f.disable();
                    }
                } 
            }
        },
        {
            fieldLabel: 'Cantidad Recibida',
            name: 'quantityreceive',
            id: 'txtquantityreceive',
            disabled: true
        }
    ],
    buttons: [
        {
            text: 'Cancelar',
            iconCls: 'btn-cancel',
            handler: function(){
                var form = this.up('form');
                var win = form.up('window');
                win.close();
            }
        },
        {
            text: 'Confirmar',
            iconCls: 'btn-save',
            handler: function(){
                var extform = this.up('form');
                var form = extform.getForm();
                var win = extform.up('window');
                var data = form.getValues();
                var complete;
                var qreceive;
                if(data.incomplete !== 'undefined' && data.incomplete === 'on'){
                    complete = 'No';
                    qreceive = data.quantityreceive
                }else{
                    complete = 'Si';
                    qreceive = data.quantity;
                }                    
                if(qreceive <= data.quantity){
                    var grid = Ext.getCmp('ReceiveGridDetail');
                    var st = grid.getStore();
                    var idx = st.find('item', data.item);

                    var row = {
                        complete: complete,
                        quantityreceive: qreceive
                    }
                    var rec = st.getAt(idx);
                    rec.set(row);
                    rec.commit();

                    win.close();
                }else{
                    Ext.Msg.show({
                        title: 'Error!!!',
                        msg: 'No se pueden confirmar mas items de los enviados',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    })
                }
            }
        }
    ]
});