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
        {name: 'inactive', type: 'int'},        
        {name: 'active', type: 'string'},        
    ]
});

Ext.define('Mtc.model.ProductCategory', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idproductcategory', type: 'int'},
        {name: 'productcategory', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'inactive', type: 'int'},
        {name: 'active', type: 'string'}
    ]
});

Ext.define('Mtc.widgets.ProductCategoryCombo', {
    extend: 'Ext.form.field.ComboBox',
    queryMode: 'local',
    id: 'cboproductcategory',
    name: 'idproductcategory',
    emptyText: 'Seleccione',
    alias: 'widget.productcategory',
    displayField: 'productcategory',
    triggerAction: 'all',
    valueField: 'idproductcategory',
    fieldLabel: 'Categoría',
    editable: false,
    frame: true,
    store: {
        model: 'Mtc.model.ProductCategory',
        proxy: {
            type: 'ajax',
            url: '/admin/categories/getcategories',
            model: 'Mtc.model.ProductCategory',
            reader: {
                type: 'json',
                successProperty: 'success',
                root: 'data'
            }
        },
        autoLoad: false
    }
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

var productsTopBar = [
    {
        text: 'Nuevo Producto',
        iconCls: 'add',
        handler: function(){
            var cbocategory = Ext.getCmp('cbocategory');
            var catstore = cbocategory.store;
            catstore.load({
                params: {
                    active: 1
                }
            });
            productForm.getForm().reset();
            productFormWin.setTitle('Nuevo Producto');
            productFormWin.show();
        }
    },
    {
        text: 'Editar Producto',
        iconCls: 'edit',
        handler: function(){
            
        }
    },
    {
        text: 'Activar / Inactivar',
        iconCls: 'delete',
        handler: function(){
            
        }
    }
];

var productsPagingBar = new Ext.PagingToolbar({  
    pageSize: Mtc.config.gridPageSize,  
    store: productsDataStore,  
    displayInfo: true  
});

var productsGrid = Ext.create('Ext.grid.Panel', {
    model: 'Mtc.model.Product',
    id: 'productsGrid',
    title: 'Productos',
    store: productsDataStore,
    tbar: productsTopBar,
    bbar: productsPagingBar,
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
        },
        {
            header: 'Activo',
            dataIndex: 'active',
            width: 100
        }
    ],
    enableColLock: false,
    height: Mtc.config.gridHeight,
    renderTo: Ext.get('slot1')
});

var productForm = Ext.create('Ext.form.Panel', {
    id: 'productForm',
    frame: true,
    defaultType: 'textfield',
    itemCls: 'left-space',
    layout: {
        type: 'table',
        columns: 2
    },
    items: [
        {
            fieldLabel: 'product',
            allowBlak: false
        },
        {
            xtype: 'productcategory',            
            fieldLabel: 'Categoría',
            id: 'cbocategory'
        }
    ],
    buttons: [
        {
            text: 'Cancelar',
            iconCls: 'btn-cancel',
            handler: function(btn){
                var win = btn.up('window');
                win.hide();
            }
        },
        {
            text: 'Guardar',
            iconCls: 'btn-save'
        }
    ]
});

var productFormWin = Ext.create('Ext.window.Window', {
    id: 'productFormWin',
    title: 'Producto',
    closeAction: 'hide',
    items: productForm,
    modal: true
});