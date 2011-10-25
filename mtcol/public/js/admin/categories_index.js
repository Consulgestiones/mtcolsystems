Ext.define('Mtc.model.Category', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idproductcategory', type: 'int'},
        {name: 'productcategory', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'active', type: 'string'},
        {name: 'inactive', type: 'int'}
    ]
});

/**
 * Grilla de categorias
 */

var categoriesDataStore = Ext.create('Ext.data.Store', {
    model: 'Mtc.model.Category',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/admin/categories/getcategories',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    },
    autoLoad: 'true',
    pageSize: Mtc.config.gridPageSize
});

var categoriesTopBar = [
    {
        text: 'Nueva Categoria',
        iconCls: 'add',
        handler: createCategory
    },
    {
        text: 'Editar Categoria',
        iconCls: 'edit',
        handler: editCategory
    },
    {
        text: 'Activar / Inactivar',
        iconCls: 'delete',
        handler: inactiveCategory
    }/*,
    {
        text: 'Sub Categorias',
        iconCls: 'sub-cat',
        handler: subCategories
    }*/
];

var categoriesPagingBar = new Ext.PagingToolbar({  
    pageSize: Mtc.config.gridPageSize,  
    store: categoriesDataStore,  
    displayInfo: true  
});

var categoriesGrid = Ext.create('Ext.grid.Panel', {
    id: 'categoriesGrid',
    title: 'Categorias de Productos',
    iconCls: 'bifurc',
    store: categoriesDataStore,
    tbar: categoriesTopBar,
    bbar: categoriesPagingBar,
    columns: [
        Ext.create('Ext.grid.RowNumberer'),
        {
            header: 'Categoria',
            dataIndex: 'productcategory',
            width: 200
        },
        {
            header: 'Descripción',
            dataIndex: 'description',
            width: 300
        },
        {
            header: 'Activo',
            dataIndex: 'active',
            width: 100
        }
    ],
    enableColLock: false,
    stripeRows: true,
    height: Mtc.config.gridHeight,    
    autoSizeColumns: true,
    flex: 1
});
categoriesGrid.getSelectionModel().on('selectionchange', function(sm, selection){
    var record = selection[0];
    var idpc = record.get('idproductcategory');
    subCategories(idpc);
});
//categoriesGrid.on('rowclick', function(categoriesGrid, rowIndex, e) {
//    alert('hola');
//    var row = this.categoriesGrid.getView().getRow(rowIndex);
//    var record = this.ds.getAt(rowIndex);
//    subCategories(record.get('idproductcategory'));
//}); 

var panel = Ext.create('Ext.Panel', {
    border: 0,
    height: 400,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        categoriesGrid
    ],
    autoHeight: true,
    renderTo: Ext.get('slot1')
})


/**
 * Formulario de ingreso y edición de categorias
 */

var categoryForm = Ext.create('Ext.form.Panel', {
    id: 'categoryForm',
    defaultType: 'textfield',
    url: '/admin/categories/save',
    method: 'POST',
    bodyStyle: 'padding:10px',
    frame: true,
    layout: {
        type: 'table',
        columns: 1
    },
    items: [
        {
            fieldLabel: 'Categoria',
            name: 'productcategory',
            allowBlank: false
        },
        /*{
            fieldLabel: 'Activo',
            xtype: 'combo',
            name: 'inactive',
            queryMode: 'local',
            displayField: 'item',
            valueField: 'inactive',
            store: new Ext.data.SimpleStore({
                id: 0,
                fields: ['inactive', 'item'],
                data: [
                    [0, 'Activo'],
                    [1, 'Inactivo']
                ],
                autoLoad: true
            }),
            allowBlank: false
        },*/
        {
            xtype: 'textarea',
            fieldLabel: 'Descripción',
            name: 'description'
        },
        {
            xtype: 'hidden',
            name: 'idproductcategory',
            value: 0
        },
        {
            xtype: 'hidden',
            name: 'inactive',
            value: 0
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
            iconCls: 'btn-save',
            handler: function(btn){
                var win = btn.up('window');
                var form = win.down('form');
                var frm = form.getForm();
                if(frm.isValid()){
                    frm.submit({
                        success: function(form, request){
                            var obj = Ext.decode(request.response.responseText);
                            if(Mtc.formAction == 'create'){
                                var store = categoriesGrid.getStore();
                                store.insert(0, obj.data);                                
                            }else if(Mtc.formAction == 'edit'){
                                Mtc.record.set(obj.data);
                                Mtc.record.commit();
                            }
                            win.hide();
                        },
                        failure: function(form, request){
                            var obj = Ext.decode(request.response.responseText);
                            Ext.MessageBox.show({
                                title: 'Error!!!',
                                msg: obj.msg,
                                icon: Ext.MessageBox.ERROR
                            })
                        }
                    })
                }
            }
        }
    ]
});

var categoryFormWin = Ext.create('Ext.window.Window', {
    autoHeight: true,
    modal: true,
    items: categoryForm,
    closeAction: 'hide'
});

function createCategory(){
    categoryFormWin.setTitle('Crear Categoria');
    Mtc.formAction = 'create';
    categoryForm.getForm().reset();        
    categoryFormWin.show();
}
function editCategory(){
    categoryFormWin.setTitle('Modificar Categoria');
    Mtc.formAction = 'edit';
    var rows = categoriesGrid.getSelectionModel().getSelection();
    
    if(rows.length === 0)
        return;
    
    Mtc.record = rows[0];
    
    categoryForm.loadRecord(Mtc.record);
    
    categoryFormWin.show();
}
function inactiveCategory(){
    var rows = categoriesGrid.getSelectionModel().getSelection();
    if(rows.length === 0)
        return;
    
    Mtc.record = rows[0];
    
    Ext.Ajax.request({
        url: '/admin/categories/inactivate',
        method: 'POST',
        params: {
            idproductcategory: Mtc.record.get('idproductcategory')
        },
        success: function(response){
            var obj = Ext.decode(response.responseText);
            Mtc.record.set('active', obj.active);
            Mtc.record.commit();
        }
    });
}
function subCategories(idpc){    
    panel.remove(subcategoriesGrid, false);
    panel.add(subcategoriesGrid);
    
    subcategoriesGrid.getStore().load({
        params: {
            idproductcategory: idpc
        }
    })
}

/**
 * Sub categorias
 */
Ext.define('Mtc.model.SubCategory', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idproductsubcategory', type: 'int'},
        {name: 'idproductcategory', type: 'int'},
        {name: 'productsubcategory', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'active', type: 'string'},
        {name: 'inactive', type: 'int'},
    ]
});

var subcategoriesDataStore = Ext.create('Ext.data.Store', {
    model: 'Mtc.model.SubCategory',
    proxy: {
        type: 'ajax',
        url: '/admin/categories/getsubcategories',
        method: 'POST',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    },
    autoLoad: false
});

var subcategoriesTobBar = [
    {
        text: 'Nueva Sub Categoria',
        iconCls: 'add',
        handler: function(){
            var rows = categoriesGrid.getSelectionModel().getSelection();
            if(rows.length === 0)
                return;
            
            Mtc.category = rows[0];
            subcategoriesFormWin.setTitle('Nueva Sub Categoría');
            subcategoryForm.getForm().reset();
            subcategoriesFormWin.show();
        }
    },
    {
        text: 'Editar Sub Categoria',
        iconCls: 'edit',
        handler: function(){
            var rows = categoriesGrid.getSelectionModel().getSelection();
            if(rows.length === 0)
                return;
            Mtc.category = rows[0];
            
            rows = subcategoriesGrid.getSelectionModel().getSelection();
            if(rows.length === 0)
                return;
            
            Mtc.subcategory = rows[0];
            subcategoriesFormWin.setTitle('Modificar Categoría');
            var form = subcategoryForm.getForm();
            form.reset();
            form.loadRecord(Mtc.subcategory);
            subcategoriesFormWin.show();
        }
    },
    {
        text: 'Activar / Inactivar',
        iconCls: 'delete'
    }
];
var subcategoriesPagingBar = new Ext.PagingToolbar({  
    pageSize: Mtc.config.gridPageSize,  
    store: subcategoriesDataStore,  
    displayInfo: true  
});

var subcategoriesGrid = Ext.create('Ext.grid.Panel', {
    id: 'subcategoriesGrid',
    title: 'Sub Categorias',
    iconCls: 'sub-cat',
    tbar: subcategoriesTobBar,
    bbar: subcategoriesPagingBar,
    store: subcategoriesDataStore,
    columns: [
        Ext.create('Ext.grid.RowNumberer'),
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
            header: 'Activa',
            dataIndex: 'active',
            width: 100
        }
    ],
    flex: 1,
    closeAction: 'hide',    
    enableColLock: false,
    stripeRows: true,
    height: Mtc.config.gridHeight,    
    autoSizeColumns: true
});

var subcategoryForm = Ext.create('Ext.form.Panel', {
    id: 'categoryForm',
    defaultType: 'textfield',
    url: '/admin/categories/savesubcategory',
    frame: true,
    items: [
        {
            fieldLabel: 'Sub Categoría',
            allowBlank: false,
            name: 'productsubcategory'
        },        
        {
            xtype: 'textarea',
            fieldLabel: 'Descripción',
            name: 'description'
        },
        {
            xtype: 'hidden',
            name: 'idproductsubcategory',
            value: 0
        },
        {
            xtype: 'hidden',
            name: 'inactive',
            value: 0
        }        
    ],
    buttons: [
        {
            text: 'Cancelar',
            iconCls: 'btn-cancel',
            handler: function(btn){
                var win = btn.up('window');
                if(typeof win != 'undefined')
                    win.hide();
            }
        },
        {
            text: 'Guardar',
            iconCls: 'btn-save',
            handler: function(btn){
                var win = btn.up('window');
                var form = win.down('form').getForm();
                if(form.isValid()){                    
                    form.submit({
                        params: {
                            idproductcategory: Mtc.category.get('idproductcategory')
                        },
                        success: function(form, request){                            
                            var obj = Ext.decode(request.response.responseText);
                            if(Mtc.formAction == 'create'){
                                var store = subcategoriesGrid.getStore();
                                store.insert(0, obj.data);
                            }else if(Mtc.formAction == 'edit'){
                                Mtc.subcategory.set(obj.data);
                                Mtc.subcategory.commit();
                            }                         
                            win.hide();
                        },
                        failure: function(form, request){
                            var obj = Ext.decode(request.response.responseText);
                            Ext.MessageBox.show({
                                title: 'Error!!!',
                                msg: obj.msg,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    })
                }
            }
        }
    ]
});

var subcategoriesFormWin = Ext.create('Ext.window.Window', {
    iconCls: '',
    id: 'subcategoriesFormWin',
    autoHeight: true,
    items: subcategoryForm,
    closeAction: 'hide',
    modal: true
});