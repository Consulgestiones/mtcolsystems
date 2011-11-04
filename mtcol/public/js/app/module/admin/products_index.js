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
Ext.define('Mtc.model.ProductSubCategory', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idproductsubcategory', type: 'int'},
        {name: 'idproductcategory', type: 'int'},
        {name: 'productsubcategory', type: 'string'},
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

var mainPanel = Ext.create('Ext.panel.Panel', {
    id: 'mainPanel',
    border: 0,
    layout: 'fit',
    renderTo: Ext.get('slot1')
});

Ext.define('Mtc.widgets.ProductSubCategoryCombo', {
    extend: 'Ext.form.field.ComboBox',
    queryMode: 'local',
    id: 'cboproductsubcategory',
    name: 'idproductsubcategory',
    emptyText: 'Seleccione',
    alias: 'widget.productsubcategory',
    displayField: 'productsubcategory',
    triggerAction: 'all',
    valueField: 'idproductsubcategory',
    fieldLabel: 'Subcategoría',
    editable: false,
    frame: true,
    store: {
        model: 'Mtc.model.ProductSubCategory',
        proxy: {
            type: 'ajax',
            url: '/admin/categories/getsubcategories',
            model: 'Mtc.model.ProductSubCategory',
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
    },
    {
        text: 'Proveedores',
        iconCls: 'users-admin',
        handler: function(){
            var selection = productsGrid.getSelectionModel().getSelection();
            if(selection.length === 0)
                return;
            
            Mtc.product = selection[0];
            Mtc.idproduct = Mtc.product.get('idproduct');
            var product = Mtc.product.get('product');
            productsGrid.hide();
        //    mainPanel.items.each(function(c){mainPanel.remove(c, false)});
            providersPanel.setTitle(product);
            providersPanel.show();
            var availableStore = providersAvailableGrid.getStore();
            var asignedStore = providersAsignedGrid.getStore();
            
//            availableStore.setBaseParam('idproduct', Mtc.idproduct);
//            asignedStore.setBaseParam('idproduct', Mtc.idproduct);
            
            availableStore.load({
                params: {
                    idproduct: Mtc.idproduct
                }
            });
            asignedStore.load({
                params: {
                    idproduct: Mtc.idproduct
                }
            });
        }
    }
];

var productsPagingBar = new Ext.PagingToolbar({  
    pageSize: AppConfig.gridPageSize,  
    store: productsDataStore,  
    displayInfo: true  
});

var productsGrid = Ext.create('Ext.grid.Panel', {
    model: 'Mtc.model.Product',
    id: 'productsGrid',
    title: 'Productos',
    iconCls: 'boxes',
    flex: 1,
    store: productsDataStore,
    tbar: productsTopBar,
    bbar: productsPagingBar,
    columns: [
        {
            header: 'Producto',
            dataIndex: 'product',
            width: 150
        },
        {
            header: 'Categoria',
            dataIndex: 'productcategory',
            width: 100
        },
        {
            header: 'Sub Categoria',
            dataIndex: 'productsubcategory',
            width: 100
        },
        {
            header: 'Descripción',
            dataIndex: 'description',
            width: 150
        },
        {
            header: 'Activo',
            dataIndex: 'active',
            width: 50
        }
    ],
    enableColLock: false,
    height: AppConfig.gridHeight
});
mainPanel.add(productsGrid);



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
            name: 'product',
            colspan: 2,
            allowBlak: false,
            width: 412
        },
        {
            xtype: 'productcategory',  
            name: 'idproductcategory',
            fieldLabel: 'Categoría',
            id: 'cbocategory'
        },
        {
            xtype: 'productsubcategory',            
            name: 'idproductsubcategory',
            fieldLabel: 'Subcategoría',
            id: 'cbosubcategory',
            disabled: true
        },
        {
            xtype: 'textarea',
            name: 'description',
            fieldLabel: 'Descripción',
            colspan: 2,
            width: 412
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

var prodcat = Ext.getCmp('cbocategory');
var prodsubcat = Ext.getCmp('cbosubcategory');

prodcat.on('select', function(){
    prodsubcat.clearValue();
    prodsubcat.store.load({
        params: {
            idproductcategory: prodcat.getValue()
        }
    });
    prodsubcat.enable();
});
var productFormWin = Ext.create('Ext.window.Window', {
    id: 'productFormWin',
    title: 'Producto',
    closeAction: 'hide',
    items: productForm,
    modal: true
});
//Asignacion de proveedores a productos

var availableDataStore = new Ext.data.Store({
    storeId: 'providerAvailableDS',
    model: 'Mtc.model.Provider',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/admin/providers/getavailable',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    },
    autoLoad: false
});

var availablePagingBar = new Ext.PagingToolbar({  
    pageSize: AppConfig.gridPageSize,  
    store: availableDataStore,  
    displayInfo: true  
});

var providersAvailableGrid = Ext.create('Ext.grid.Panel', {
    model: 'Mtc.model.Provider',
    alias: 'widget.providersavailable',
    title: 'Proveedores Disponibles',
    bbar: availablePagingBar,
    columnWidth: 0.5,
    height: AppConfig.gridHeight,
    selModel: {
        mode: 'MULTI',
        allowDeselect: true
    },
    store: availableDataStore,
    columns: [
        {
            header: '#',
            dataIndex: 'idprovider',
            hidden: true
        },
        {
            header: 'Proveedor',
            dataIndex: 'provider',
            width: 200
        },
        {
            header: 'Tipo ID',
            dataIndex: 'typeid',
            width: 100
        },
        {
            header: 'Num ID',
            dataIndex: 'providernumid',
            width: 100
        },        
        {
            header: 'Ciudad',
            dataIndex: 'city',
            width: 100
        }
    ],
    pageSize: AppConfig.gridPageSize
});
//
//
var asignedDataStore = new Ext.data.Store({
    id: 'providerAsignedDS',
    model: 'Mtc.model.Provider',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/admin/providers/getasigned',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    },
    autoLoad: false
});

var asignedPagingBar = new Ext.PagingToolbar({  
    pageSize: AppConfig.gridPageSize,  
    store: asignedDataStore,  
    displayInfo: true  
});

var providersAsignedGrid = Ext.create('Ext.grid.Panel', {
    model: 'Mtc.model.Provider',
    title: 'Proveedores Seleccionados',
    alias: 'widget.providersasigned',     
    store: asignedDataStore,
    bbar: asignedPagingBar,
    baseParams: {
        idproduct: Mtc.idproduct
    },
    columnWidth: 0.5,
    height: AppConfig.gridHeight,
    selModel: {
        mode: 'MULTI',
        allowDeselect: true
    },
    columns: [
        {
            header: '#',
            dataIndex: 'idprovider',
            hidden: true
        },
        {
            header: 'Proveedor',
            dataIndex: 'provider',
            width: 200
        },
        {
            header: 'Tipo ID',
            dataIndex: 'typeid',
            width: 100
        },
        {
            header: 'Num ID',
            dataIndex: 'providernumid',
            width: 100
        },        
        {
            header: 'Ciudad',
            dataIndex: 'city',
            width: 100
        }
    ],
    pageSize: AppConfig.gridPageSize
});
//
var providersPanel = Ext.create('Ext.panel.Panel',{  
    closable: false,
    title: 'Proveedores',
    hidden: true,
    tbar: [
        '->',
        {
            text: 'Volver',
            iconCls: 'back',
            handler: function(){
                providersAsignedGrid.getStore().removeAll();
                providersAvailableGrid.getStore().removeAll();
                providersPanel.hide();
                productsGrid.show();
            }
        }
    ],
    layout: 'column',
    width: '100%',
    autoHeight: true,
    items: [
        providersAvailableGrid,
        {
            xtype: 'container',            
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'start'
            },
            width: 60,
            padding: 10,
            height: AppConfig.gridHeight,
            defaults: {
                style: {                    
                    margin: '5px'
                }
            },
            items: [
                {
                    xtype: 'button',
                    text: '>',
                    handler: function(){
                        var selection = providersAvailableGrid.getSelectionModel().getSelection();
                        if(selection.length > 0){
                            var idproviders = new Array();
                            for(var i = 0; i < selection.length; i++){
                                idproviders.push(selection[i].get('idprovider'));
                            }
                            Ext.Ajax.request({
                                url: '/admin/providers/asignproduct',
                                method: 'POST',
                                params: {
                                    idproduct: Mtc.idproduct,
                                    providers: Ext.encode(idproviders)
                                },
                                success: function(response){
                                    var obj = Ext.decode(response.responseText);
                                    if(obj.success){
                                        var availableStore = providersAvailableGrid.getStore();
                                        var asignedStore = providersAsignedGrid.getStore();
                                        
                                        asignedStore.loadRecords(selection, {addRecords: true});
                                        availableStore.remove(selection);
                                    }else{
                                        Ext.MessageBox.show({
                                            title: 'Error!!!',
                                            msg: obj.msg
                                        });                                        
                                    }
                                }
                            });
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: '<',
                    handler: function(){
                        var selection = providersAsignedGrid.getSelectionModel().getSelection();
                        if(selection.length > 0){
                            var idproviders = new Array();
                            for(var i = 0; i < selection.length; i++){
                                idproviders.push(selection[i].get('idprovider'));
                            }
                            Ext.Ajax.request({
                                url: '/admin/providers/unasignproduct',
                                method: 'POST',
                                params: {
                                    idproduct: Mtc.idproduct,
                                    providers: Ext.encode(idproviders)
                                },
                                success: function(response){
                                    var obj = Ext.decode(response.responseText);
                                    if(obj.success){
                                        var availableStore = providersAvailableGrid.getStore();
                                        var asignedStore = providersAsignedGrid.getStore();
                                        
                                        availableStore.loadRecords(selection, {addRecords: true});
                                        asignedStore.remove(selection);
                                    }else{
                                        Ext.MessageBox.show({
                                            title: 'Error!!!',
                                            msg: obj.msg
                                        });                                        
                                    }
                                }
                            });
                        }
                    }
                }
            ]
        },
        providersAsignedGrid
    ]
});
mainPanel.add(providersPanel);