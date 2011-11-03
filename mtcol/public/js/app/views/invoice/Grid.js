loadScript('/js/app/stores/InvoiceGrid.js', function(){
   var store = Ext.create('Mtc.store.InvoiceGrid', {
       
   });
   Ext.define('Mtc.views.invoice.Grid', {
        extend: 'Ext.grid.Panel',
        alias: 'widget.invoicegrid',
        title: 'InvoiceGrid',
        store: store,
        constructor: function(options){
            Ext.apply(this, options || {});
        },
        columns: [
            {
                header: 'Col 1',
                dataIndex: 'col1'
            },
            {
                header: 'Col 2',
                dataIndex: 'col2'
            }
        ]
    }); 
});