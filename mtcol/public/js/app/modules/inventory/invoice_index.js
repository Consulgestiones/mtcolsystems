//loadModels(['InvoiceHeader', 'TypeId'], 'invoice_index');
Application({
    models: ['InvoiceHeader', 'TypeId'],
    views: ['InvoiceForm', 'InvoiceGrid']
}, 'invoice_index');
function invoice_index(){    
    //Panel principal donde se van a agregar todos los widgets
    var mainPanel = Ext.create('Ext.panel.Panel', {
        title: 'pruebas',
        border: 0,
        id: 'mainPanel',
        initComponent: function(){
            this.items = [
                {
                    xtype: 'invoicegrid'
                }
            ];
        },        
        renderTo: Ext.get('slot1')
    });

//    //Data store de la tabla de facturas
//    var invoicesDataStore = Ext.create('Ext.data.Store', {
//        storeId: 'invoicesDS',
//        model: 'Model_InvoiceHeader',    
//        proxy: {
//            type: 'ajax',
//            model: 'Mtc.model.InvoiceHeader',
//            url: '/inventory/invoices/getinvoices',
//            method: 'POST',
//            reader: {
//                type: 'json',
//                totalProperty: 'total',
//                root: 'data'
//            }
//        },
//        autoLoad: true
//    });
//
//    //Barra superiod de botones de la grilla de facturas
//    var invoicesTopBar = [
//        {
//            text: 'Nueva Factura',
//            iconCls: 'add',
//            handler: function(){
//                loadScript('/js/app/views/invoice_form.js');            
//            }
//        },
//        {
//            text: 'Editar Factura',
//            iconCls: 'edit',
//            handler: function(){
//                alert('dentro de la funcion');
//            }
//        },
//        {
//            text: 'Ver Factura',
//            iconCls: 'godoc',
//            handler: function(){
//
//            }
//        }
//    ];
//
//    var invoicesPagingBar = new Ext.PagingToolbar({  
//        pageSize: AppConfig.gridPageSize,  
//        store: invoicesDataStore,  
//        displayInfo: true  
//    });
//
//    var invoicesGrid = Ext.create('Ext.grid.Panel', {
//        id: 'invoicesGrid',
//        title: 'Facturas',
//        store: invoicesDataStore,
//        tbar: invoicesTopBar,
//        bbar: invoicesPagingBar,
//        columns: [
//            Ext.create('Ext.grid.RowNumberer'),
//            {
//                header: 'Factura No',
//                dataIndex: 'invoicenumber'
//            },
//            {
//                header: 'Fecha',
//                dataIndex: 'date'
//            },
//            {
//                header: 'Proveedor',
//                dataIndex: 'provider'
//            },
//            {
//                header: 'NIT',
//                dataIndex: 'providernumid'
//            },
//            {
//                header: 'Ciudad',
//                dataIndex: 'city'
//            },
//            {
//                header: 'Estado',
//                dataIndex: 'invoicestatus'
//            },
//            {
//                header: 'Entrega / Servicio',
//                dataIndex: 'productservice'
//            },
//            {
//                header: 'Subtotal',
//                dataIndex: 'subtotal'
//            },
//            {
//                header: 'IVA',
//                dataIndex: 'tax'
//            },
//            {
//                header: 'Total',
//                dataIndex: 'total'
//            }
//        ],
//        height: AppConfig.gridHeight
//    });

//    mainPanel.add({
//        xtype: 'invoicegrid'
//    });
}