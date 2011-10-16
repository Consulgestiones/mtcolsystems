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
        {name: 'contacphonehome', type: 'string'},
        {name: 'contacphonework', type: 'string'},
        {name: 'contacphonemobile', type: 'string'},
        {name: 'contacphoneworkext', type: 'string'},
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
            dataIndex: 'title',
            width: 50
        },
        {
            header: 'Tel Personal Contacto', 
            dataIndex: 'contactphonehome',
            width: 50
        },
        {
            header: 'Tel Trabajo Contacto', 
            dataIndex: 'contactphonehome',
            width: 50
        },
        {
            header: 'Extensión', 
            dataIndex: 'contactphoneworkext',
            width: 50
        },
        {
            header: 'Movil Contacto', 
            dataIndex: 'contactphonehome',
            width: 50
        }        
    ],
    enableColLock: false,
    stripeRows: true,
    height: Mtc.config.gridHeight,
    renderTo: Ext.get('slot1'),
    autoSizeColumns: true
});
Ext.define('Mtc.form.Provider', {
    extend: 'Ext.form.Panel',
    id: 'providerForm',
    alias: 'widget.providerform',
    defaultType: 'fieldset',
    layout: 'vbox', 
    frame: true,
    items: [
        {
            title: 'Información Proveedor',
            defaultType: 'textfield',
            layout: {
                type: 'table',
                columns: 2
            },
            items: [
                {
                    fieldLabel: 'Razón Social',
                    name: 'provider',
                    allowBlank: false
                }
            ]
        }
    ]/*,
    buttons: [
        {
            text: 'Cancelar'
        },
        {
            text: 'Guardar'
        }
    ]    */
});
Ext.define('Mtc.window.Provider', {
    extend: 'Ext.window.Window',
    title: 'Nuevo Proveedor',
    width: 300,
    height: 200,  
    items: {
        xtype: 'providerform'
    }
})
function newProvider(){    
    var win = Ext.create('Mtc.window.Provider', {
        
    });
    
    var form = win.down('form');
    var frm = form.getForm();
    
    win.show();
}
function editProvider(){
    alert('Editar proveedor');
}