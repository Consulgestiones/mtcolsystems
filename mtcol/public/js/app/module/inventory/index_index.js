Ext.create('Ext.panel.Panel', {
    items: [
        {
            xtype: 'panel',
            title: 'Distribución Stock',
            items: [
                Ext.create('Mtc.view.report.StockDistribution', {
                    id: 'StockDistributionChart'
                })
            ]
        }        
    ],
    renderTo: Ext.get('slot1')
});