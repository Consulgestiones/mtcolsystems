Ext.define('Mtc.model.Product', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idproduct', type: 'int'},        
        {name: 'product', type: 'string'},        
        {name: 'idproductcategory', type: 'int'},        
        {name: 'productcategory', type: 'string'},        
        {name: 'idproductsubcategory', type: 'int'},        
        {name: 'productsubcategory', type: 'string'},        
        {name: 'description', type: 'string'},        
        {name: 'tax', type: 'float'},        
        {name: 'inactive', type: 'int'},        
        {name: 'active', type: 'string'},
        {name: 'unit', type: 'string'}
    ]
});