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
        text: 'Nueva',
        iconCls: 'add',
        handler: createCategory
    },
    {
        text: 'Editar',
        iconCls: 'edit',
        handler: editCategory
    },
    {
        text: 'Activar / Inactivar',
        iconCls: 'delete'
    },
    {
        text: 'Sub Categorias',
        iconCls: 'sub-cat'
    }
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
    renderTo: Ext.get('slot1'),
    autoSizeColumns: true
});

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
        {
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
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Descripción',
            name: 'description'
        },
        {
            xtype: 'hidden',
            name: 'idproductcategory',
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