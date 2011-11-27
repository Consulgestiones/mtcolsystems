Ext.define('Mtc.view.transpcompany.FormPanel', {
    extend: 'Ext.form.Panel',
    defaultType: 'textfield',    
    layout: {
        type: 'table',
        columns: 2
    },
    url: '/admin/transpcompanies/savecompany',
    frame: true,
    itemCls: 'left-space',
    bodyStyle: 'padding: 10px;',    
    items: [
        {
            fieldLabel: 'Nombre',
            name: 'transpcompany',
            allowBlank: false
        },
        {
            fieldLabel: 'E-mail',
            name: 'email',
            allowBlank: false,
            vtype: 'email'
        },
        {
            fieldLabel: 'Teléfono',
            name: 'phone',
            allowBlank: false
        },
        {
            fieldLabel: 'Dirección',
            name: 'address',
            allowBlank: false
        },
        {
            xtype: 'country',
            name: 'idcountry',
            id: 'cbocountry',
            fieldLabel: 'País',
            listeners: {
                select: function(){
                    var cbo = Ext.getCmp('cbocity');
                    cbo.store.load({
                        params: {
                            idcountry: this.getValue()
                        },
                        callback: function(rows, operation, success){
                            cbo.enable();
                        }
                    });                    
                }
            }
        },
        {
            xtype: 'city',
            id: 'cbocity',
            disabled: true,
            fieldLabel: 'Ciudad'
        },
        {
            xtype: 'hidden',
            name: 'idtranspcompany',
            id: 'idtranspcompany',
            value: 0
        }
    ],
//    constructor: function(){
//        var idtc = this.idtranspcompany || 0;
//        var form = this.getForm();
//        form.findField('idtranspcompany').setValue(idtc);        
//    },
    buttons: [
        {
            text: 'Cancelar',
            iconCls: 'btn-cancel',
            handler: function(){
                var w = this.up('window');
                w.hide();
            }
        },
        {
            text: 'Guardar',
            iconCls: 'btn-save',
            formBind: true,
            handler: function(){
                var form = this.up('form').getForm();                
                if(form.isValid()){
                    var win = this.up('window');
                    win.el.mask('Guardando…', 'x-mask-loading');
                    var formData = form.getValues();
                    Ext.Ajax.request({
                        url: '/admin/transpcompanies/savecompany',
                        method: 'POST',
                        params: {
                            params: Ext.encode(formData)
                        },
                        success: function(response){
                            var obj = Ext.decode(response.responseText);
                            var grid = Ext.getCmp('transpCompanyList');
                            
                            
                            win.el.unmask();
                            if(obj.success){
                                if(obj.action == 'create'){
                                    grid.getStore().insert(0, obj.data);
                                }else{
                                    var index = grid.getStore().find('idtranspcompany', formData['idtranspcompany']);
                                    if(index != -1){
                                        var rec = grid.getStore().getAt(index);
                                        rec.set(obj.data);
                                        rec.commit();
                                    }                                    
                                }
                                form.reset();
                                win.hide();
                                setNotification('Compañia creada', 'La compañia de transporte ha sido creada en el sistema');
                            }
                        }
                    });
                }
            }
        }
    ]
});