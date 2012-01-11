Ext.define('Mtc.view.report.StockDistribution', {
    extend: 'Ext.chart.Chart',
    store: Ext.create('Mtc.store.StockDistribution', {
        storeId: 'stockDistributionDS',
        autoLoad: true
    }),
    width: 500,
    height: 300,
    animate: true,
    insetPadding: 25,
    shadow: true,
    legend: {
        position: 'top'
    },    
    display: 'outside',
    theme: 'Base:gradients',
    tips: {
          trackMouse: true,
          width: 140,
          height: 28,
          renderer: function(storeItem, item) {
            //calculate and display percentage on hover
            var total = 0;
            var store = Ext.data.StoreManager.lookup('stockDistributionDS');
            store.each(function(rec) {
                total += rec.get('total');
            });
            this.setTitle(storeItem.get('description') + ': ' + Math.round(storeItem.get('total') / total * 100) + '%');
          }
        },        
    series: [
        {
            type: 'pie',
            field: 'total',
            showInLegend: true,            
            highlight: {
                segment: {
                    margin: 20
                }
            },
            label: {
                field: 'label',
                display: 'rotate',
                contrast: true,
                font: '14px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif'
            }
        }        
    ]
});
/**
 * para borrar
 */