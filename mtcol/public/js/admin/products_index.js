Ext.define('Mtc.model.Product', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idproduct', type: 'int'},
        {name: 'product', type: 'string'},
        {name: 'idproductcategory', type: 'int'},
        {name: 'productcategory', type: 'string'},                
        {name: 'idproductsubcategory', type: 'int'},                
        {name: 'productsubcategory', type: 'string'},                
        {name: 'product', type: 'string'},        
        {name: 'description', type: 'string'},        
        {name: 'tax', type: 'float'},        
    ]
});

var productsDataStore = Ext.create('Ext.data.Store', {
    id: 'productsDS',
    model: 'Mtc.model.Product',
    proxy: {
        type: 'ajax',
        url: '/admin/products/getproducts',
        method: 'POST',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    },
    autoLoad: true
});

var productsGrid = Ext.create('Ext.grid.Panel', {
    model: 'Mtc.model.Product',
    store: productsDataStore,
    columns: [
        {
            header: 'Producto',
            dataIndex: 'product',
            width: 200
        },
        {
            header: 'Categoria',
            dataIndex: 'productcategory',
            width: 200
        },
        {
            header: 'Sub Categoria',
            dataIndex: 'productsubcategory',
            width: 200
        },
        {
            header: 'Descripción',
            dataIndex: 'description',
            width: 200
        }
    ],
    enableColLock: false,
    height: Mtc.config.gridHeight,
    renderTo: Ext.get('slot1')
});