Ext.define('Mtc.view.remission.WindowForm', {
    extend: 'Ext.window.Window',
    id: 'WindowForm',
    modal: true,
    closeAction: 'hide',
    items: [
        Ext.create('Mtc.view.remission.FormHeader'),
        Ext.create('Mtc.view.remission.FormItem'),
        Ext.create('Mtc.view.remission.GridDetail', {
            id: 'GridDetail'
        })
    ],
    buttons: [
        {
            text: 'Cancelar',
            iconCls: 'btn-cancel',
            handler: function(){
                var win = this.up('window');
                win.hide();
            }
        },
        {
            text: 'Guardar',
            iconCls: 'btn-save',
            handler: function(){
                var ExtWin = this.up('window');
                var ExtForm = ExtWin.down('form');
                var ExtGrid = Ext.getCmp('GridDetail');
                var form = ExtForm.getForm();
                
                var detailStore = ExtGrid.getStore();
                
                if(form.isValid()){
                    
                    if(detailStore.getCount() > 0){
                        var row;
                        var detailData = new Array();
                        detailStore.each(function(record){
                            row = new Object();
                            record.fields.each(function(field){
                                row[field.name] = record.get(field.name);
                            }, this);
                            detailData.push(row);
                        }, this);
                        
                        var headerData = form.getValues();
                        
                        Ext.Ajax.request({
                            url: '/inventory/remissions/addremission',
                            method: 'POST',
                            params: {
                                remHeader: Ext.encode(headerData),
                                remDetail: Ext.encode(detailData)
                            },
                            success: function(response){
                                var obj = Ext.decode(response.responseText);
                                if(obj.success){
                                    
                                    
                                    
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
                        
                    }else{
                        Ext.Msg.show({
                            title: 'Advertencia',
                            msg: 'Debe agregar al menos un item para crear la remisión',
                            icon: Ext.Msg.WARNING,
                            buttons: Ext.Msg.OK
                        });
                    }
                    
                }
                
            }
        }
    ]
});