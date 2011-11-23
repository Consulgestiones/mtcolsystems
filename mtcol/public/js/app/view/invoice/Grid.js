var invoiceDataStore = Ext.create('Mtc.store.Invoice'); 
var invoicePagingBar = new Ext.PagingToolbar({  
    pageSize: AppConfig.gridPageSize,  
    store: invoiceDataStore,  
    displayInfo: true  
});
Ext.define('Mtc.view.invoice.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.invoicegrid',
//    title:  'Facturas / Ordenes de Compra',
    store: invoiceDataStore,
    bbar: invoicePagingBar,
    autoExpandColumn: 'title-col',        
    tbar: [
        {
            text: 'Ingresar Factura',
            iconCls: 'add',
            handler: function(){
                invoiceAddWindow = Ext.create('Mtc.view.invoice.InvoiceFormWindow');
                invoiceAddWindow.setTitle('Ingresar Orden de Compra');
                invoiceAddWindow.show();
            }
        },
        {
            text: 'Modificar Factura',
            iconCls: 'edit'
        }
    ],
    columns: [
            {
                header: 'No',
                dataIndex: 'invoicenumber'
            },
            {
                header: 'Proveedor',
                dataIndex: 'provider'
            },
            {
                header: 'Fecha',
                dataIndex: 'dinvoice',
                renderer: Ext.util.Format.dateRenderer('m/d/Y')
            },
            {
                header: 'Pais',
                dataIndex: 'country'
            },
            {
                header: 'Ciudad',
                dataIndex: 'city'
            },
            {
                header: 'Ciudad',
                dataIndex: 'city'
            },
            {
                header: 'Tipo Documento',
                dataIndex: 'doctype'
            },
            {
                header: 'Estado',
                dataIndex: 'invoicestatus'
            },
            {
                header: 'Método Pago',
                dataIndex: 'paymentmethod'
            },
            {
                header: 'Subtotal',
                dataIndex: 'subtotal',
                align: 'right',
                renderer: function(value){
                    return currencyFormat(value);
                }
            },
            {
                header: 'Impuesto',
                dataIndex: 'tax',
                align: 'right',
                renderer: function(value){
                    return currencyFormat(value);
                }                
            },
            {
                header: 'Total',
                dataIndex: 'total',
                align: 'right',
                renderer: function(value){
                    return currencyFormat(value);
                }
            }
        ]
}); 
