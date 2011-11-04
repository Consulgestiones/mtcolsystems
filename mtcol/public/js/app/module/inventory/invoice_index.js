//loadModels(['InvoiceHeader', 'TypeId'], 'invoice_index');
Application({
    models: ['Invoice'],
    views: ['invoice.Grid'],
    stores: ['Invoice']
}, function(){  
    var mainPanel = Ext.create('Ext.panel.Panel', {
        title: 'Facturas',
        items: [            
            {
                xtype: 'invoicegrid'
            }
        ],
        renderTo: Ext.get('slot1')
    });
    
});