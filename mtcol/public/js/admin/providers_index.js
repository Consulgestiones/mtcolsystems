Ext.define('Provider', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idprovider', type: 'int'},
        {name: 'idtypeid', type: 'int'},
        {name: 'providertypeid', type: 'string'},
        {name: 'idcity', type: 'int'},
        {name: 'city', type: 'string'},
        {name: 'idcountry', type: 'int'},
        {name: 'country', type: 'string'},
        {name: 'provider', type: 'string'},
        {name: 'typeid', type: 'string'},
        {name: 'providernumid', type: 'string'},
        {name: 'providerphone', type: 'string'},
        {name: 'provideremail', type: 'string'},
        {name: 'provideraddress', type: 'string'},
        {name: 'contact', type: 'string'},
        {name: 'contacttitle', type: 'string'},
        {name: 'contactphonehome', type: 'string'},
        {name: 'contactphonework', type: 'string'},
        {name: 'contactphonemobile', type: 'string'},
        {name: 'contactphoneworkext', type: 'string'},
    ]
});

Ext.define('Typeid', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idtypeid', type: 'int'},
        {name: 'typeid', type: 'string'}
    ]
});

var providerProxy = new Ext.data.proxy.Ajax({
    id: 'ProvidersProxy',
    method: 'POST',
    model: 'Provider',
    url: '/admin/providers/read',
    api: {
        read: '/admin/providers/read',
        create: '/admin/providers/create',
        update: '/admin/providers/update',
        destroy: '/admin/providers/destroy'
    },
    reader: {
        type: 'json',
        totalProperty: 'total',
        root: 'data'
    },
    writer: new Ext.data.JsonWriter()
});
var providersDataStore = new Ext.data.Store({
    storeId: 'ProviderDS',
    url: '/admin/providers/read',
    model: 'Provider',
    proxy: providerProxy,
    pageSize: Mtc.config.gridPageSize,
    autoLoad: true
});

var providersPagingBar = new Ext.PagingToolbar({  
    pageSize: Mtc.config.gridPageSize,  
    store: providersDataStore,  
    displayInfo: true  
});

var providersGrid = new Ext.grid.Panel({
    id: 'providersGrid',
    title: 'Proveedores',
    iconCls: 'users-admin',
    store: providersDataStore,
    tbar: {
        items: [
            { 
                text: 'Nuevo',
                iconCls: 'add',
                handler: newProvider
            },
            {
                text: 'Editar',
                iconCls: 'edit',
                handler: editProvider
            }
        ]
    },
    bbar: providersPagingBar,
    columns: [
        Ext.create('Ext.grid.RowNumberer'),
        {
            header: 'ID', 
            dataIndex: 'idprovider',
            width: 20,
            hidden: true
        },
        {
            header: 'Proveedor', 
            dataIndex: 'provider',
            width: 150
        },
        {
            header: 'Tipo ID', 
            dataIndex: 'typeid',
            width: 40
        },
        {
            header: 'Num ID', 
            dataIndex: 'providernumid',
            width: 60
        },
        {
            header: 'Ciudad', 
            dataIndex: 'city',
            width: 80
        },
        {
            header: 'Pais', 
            dataIndex: 'country',
            width: 80
        },
        {
            header: 'Teléfono', 
            dataIndex: 'providerphone',
            width: 70
        },
        {
            header: 'E-mail', 
            dataIndex: 'provideremail',
            width: 150
        },
        {
            header: 'Dirección', 
            dataIndex: 'provideraddress',
            width: 150
        },
        {
            header: 'Contacto', 
            dataIndex: 'contact',
            width: 150
        },
        {
            header: 'Saludo', 
            dataIndex: 'contacttitle',
            width: 50
        },
        {
            header: 'Tel Personal Contacto', 
            dataIndex: 'contactphonehome',
            width: 50
        },
        {
            header: 'Tel Trabajo Contacto', 
            dataIndex: 'contactphonework',
            width: 50
        },
        {
            header: 'Extensión', 
            dataIndex: 'contactphoneworkext',
            width: 50
        },
        {
            header: 'Movil Contacto', 
            dataIndex: 'contactphonemobile',
            width: 50
        }        
    ],
    enableColLock: false,
    stripeRows: true,
    height: Mtc.config.gridHeight,
    renderTo: Ext.get('slot1'),
    autoSizeColumns: true
});

var providerForm = Ext.create('Ext.form.Panel', {
    id: 'providerForm',
    defaultType: 'fieldset',
    url: '/admin/providers/save',
    frame: true,
    items: [
        {
            title: 'Información Proveedor',
            defaultType: 'textfield',
            layout: {
                type: 'table',
                columns: 2
            },
            itemCls: 'left-space',
            items: [
                {
                    fieldLabel: 'Razón Social',
                    name: 'provider',
                    allowBlank: false
                },
                {
                    xtype: 'typeid'                    
                },
                {
                    fieldLabel: 'Num ID',
                    name: 'providernumid',
                    allowBlank: false
                },
                {
                    fieldLabel: 'E-mail',
                    name: 'provideremail'
                },
                {
                    fieldLabel: 'Teléfono',
                    name: 'providerphone'
                },
                {
                    fieldLabel: 'Dirección',
                    name: 'provideraddress'
                },
                {
                    xtype: 'country',
                    id: 'cbocountry',
                    name: 'idcountry',
                    fieldLabel: 'Pais',
                    listeners: {
                        select: function(cmb, record, index){
                            var cbocity = Ext.getCmp('cbocity');
                            cbocity.enable();
                            cbocity.clearValue();
                            cbocity.store.load({
                                params: {
                                    idcountry: this.getValue()
                                }
                            });
                        }
                    }
                },
                {
                    xtype: 'city',
                    disabled: true
                }
            ]
        },
        {
            title: 'Información Contacto',
            defaultType: 'textfield',
            layout: {
                type: 'table',
                columns: 2
            },
            itemCls: 'left-space',
            items: [
                {
                    fieldLabel: 'Saludo',
                    name: 'contacttitle'
                },
                {
                    fieldLabel: 'Contacto',
                    name: 'contact'
                },
                {
                    fieldLabel: 'Tel hogar',
                    name: 'contactphonehome'
                },
                {
                    fieldLabel: 'Tel trabajo',
                    name: 'contactphonework'
                },
                {
                    fieldLabel: 'Extensión',
                    name: 'contactphoneworkext'
                },
                {
                    fieldLabel: 'Celular',
                    name: 'contactphonemobile'
                }
            ]
        },
        {
            xtype: 'hidden',
            name: 'idprovider',
            id: 'hdnidprovider',
            value: 0
        }
    ],
    buttons: [
        { 
            text: 'Cancelar',
            id: 'btncancel',
            iconCls: 'btn-cancel',
            handler: function(){
                var w = this.up('form').up('window');
                w.hide();
            }
        },
        {
            text: 'Guardar',
            id: 'btnsave',
            iconCls: 'btn-save',
            handler: function(btn){
                var extform = btn.up('form');
                var form = extform.getForm();
                var win = extform.up('window');
                if(!form.isValid())
                    return false
                
                form.submit({
                    success: function(form, request){
                        var obj = Ext.decode(request.response.responseText);    
                        
                        if(typeof obj != 'undefined'){
                            var store = providersGrid.getStore();
                            if(Mtc.providerAction == 'create'){                                
                                store.insert(0, obj.data);                                
                            }else if(Mtc.providerAction == 'update'){
                                Mtc.record.set(obj.data);
                                Mtc.record.commit();
                            }
                            win.hide();
                        }
                    },
                    failure: function(form, resp){
                        
                    }
                });                              
            }
        }
    ]
});

var providerFormWindow = Ext.create('Ext.window.Window', {
    items: providerForm,
    closeAction: 'hide',
    iconCls: 'user-profile',
    modal: true
});

function newProvider(){    
    Mtc.providerAction = 'create';
    providerFormWindow.setTitle('Crear Proveedor');
    var frm = providerFormWindow.down('form').getForm();
    frm.reset();
    providerFormWindow.show();
}
function editProvider(){
    var rows = providersGrid.getSelectionModel().getSelection();
    Mtc.providerAction = 'update';
    if(rows.length === 0){
        return;
    }else{
        var record = rows[0];
        providerForm.loadRecord(record);
        var cbocity = Ext.getCmp('cbocity');
        cbocity.enable();
        if(cbocity.store.getCount() == 0){
            cbocity.clearValue();
            cbocity.store.load({
                scope: this,
                params: {
                    idcountry: record.get('idcountry')
                },
                callback: function(){
                    cbocity.setValue(record.get('idcity'));
                }
            });
        }
        Mtc.record = record;
        providerFormWindow.setTitle('Editar proveedor');
        providerFormWindow.show();
    }
}