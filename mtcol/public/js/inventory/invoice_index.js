Ext.define('Mtc.model.InvoiceHeader', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idinvoice', type: 'int'},
        {name: 'invoicenumber', type: 'string'},
        {name: 'idcity', type: 'int'},
        {name: 'city', type: 'string'},
        {name: 'idcountry', type: 'int'},
        {name: 'country', type: 'string'},
        {name: 'idprovider', type: 'int'},
        {name: 'provider', type: 'string'},
        {name: 'providernumid', type: 'string'},
        {name: 'idinvoicestatus', type: 'int'},
        {name: 'invoicestatus', type: 'string'},
        {name: 'productservice', type: 'string'},
        {name: 'createdby', type: 'string'},
        {name: 'subtotal', type: 'float'},
        {name: 'tax', type: 'float'},
        {name: 'total', type: 'float'},
        {name: 'date', type: 'date'},
    ]
});

//Panel principal donde se van a agregar todos los widgets
var mainPanel = Ext.create('Ext.panel.Panel', {
    border: 0,
    id: 'mainPanel',
    renderTo: Ext.get('slot1')
});

//Data store de la tabla de facturas
var invoicesDataStore = Ext.create('Ext.data.Store', {
    storeId: 'invoicesDS',
    model: 'Mtc.model.InvoiceHeader',    
    proxy: {
        type: 'ajax',
        model: 'Mtc.model.InvoiceHeader',
        url: '/inventory/invoices/getinvoices',
        method: 'POST',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    },
    autoLoad: true
});

//Barra superiod de botones de la grilla de facturas
var invoicesTopBar = [
    {
        text: 'Nueva Factura',
        iconCls: 'add',
        handler: function(){
            
        }
    },
    {
        text: 'Editar Factura',
        iconCls: 'edit',
        handler: function(){
            
        }
    },
    {
        text: 'Ver Factura',
        iconCls: 'godoc',
        handler: function(){
            
        }
    }
];

var invoicesPagingBar = new Ext.PagingToolbar({  
    pageSize: AppConfig.gridPageSize,  
    store: invoicesDataStore,  
    displayInfo: true  
});

var invoicesGrid = Ext.create('Ext.grid.Panel', {
    id: 'invoicesGrid',
    title: 'Facturas',
    store: invoicesDataStore,
    tbar: invoicesTopBar,
    bbar: invoicesPagingBar,
    columns: [
        Ext.create('Ext.grid.RowNumberer'),
        {
            header: 'Factura No',
            dataIndex: 'invoicenumber'
        },
        {
            header: 'Fecha',
            dataIndex: 'date'
        },
        {
            header: 'Proveedor',
            dataIndex: 'provider'
        },
        {
            header: 'NIT',
            dataIndex: 'providernumid'
        },
        {
            header: 'Ciudad',
            dataIndex: 'city'
        },
        {
            header: 'Estado',
            dataIndex: 'invoicestatus'
        },
        {
            header: 'Entrega / Servicio',
            dataIndex: 'productservice'
        },
        {
            header: 'Subtotal',
            dataIndex: 'subtotal'
        },
        {
            header: 'IVA',
            dataIndex: 'tax'
        },
        {
            header: 'Total',
            dataIndex: 'total'
        }
    ],
    height: AppConfig.gridHeight
});

mainPanel.add(invoicesGrid);