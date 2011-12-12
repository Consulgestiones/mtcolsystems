Ext.define('Mtc.store.StockDistribution', {
    extend: 'Ext.data.Store',
    requires: ['Mtc.model.StockDistribution'],
    model: 'Mtc.model.StockDistribution',
    proxy: {
        type: 'ajax',
        url: '/report/generals/stockdistribution',
        method: 'POST',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});