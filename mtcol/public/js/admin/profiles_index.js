/**
 * Grilla de perfiles
 */
Ext.define('Profile', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idprofile', type: 'int'},
        {name: 'profile', type: 'string'},
        {name: 'description', type: 'string'}
    ]
});

var profilesDataStore = new Ext.data.Store({
    id: 'profilesDS',
    model: 'Profile',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/admin/profiles/getprofiles',
        api: {
            read: '/admin/profiles/getprofiles',
            create: '/admin/profiles/create',
            update: '/admin/profiles/update',
            destroy: '/admin/profiles/destroy'
        },
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    },
    pageSize: Mtc.config.gridPageSize,
    autoLoad: true
});

var profilesPagingBar = new Ext.PagingToolbar({  
    pageSize: Mtc.config.gridPageSize,  
    store: profilesDataStore,  
    displayInfo: true  
});

var profilesTopBar = [
    { 
        text: 'Nuevo',
        iconCls: 'add',
        handler: createProfile
    },
    {
        text: 'Editar',
        iconCls: 'edit',
        handler: editProfile
    },
    {
        text: 'Eliminar',
        iconCls: 'delete',
        handler: deleteProfile
    },
    {
        text: 'Permisos',
        iconCls: 'btn-key'
    }
];

var profilesGrid = new Ext.grid.GridPanel({
    id: 'profiles-grid',
    title: 'Perfiles',
    iconCls: 'user-profile',
    store: profilesDataStore,
    bbar: profilesPagingBar,
    tbar: profilesTopBar,
    viewConfig: {
        forceFit: true
    },
    columns: [
        Ext.create('Ext.grid.RowNumberer'),
        {
            header: 'ID',
            dataIndex: 'idprofile',
            hidden: true            
        },
        {
            header: 'Perfil',
            dataIndex: 'profile'
        },
        {
            header: 'Descripción',
            dataIndex: 'description'
        }
    ],
    enableColLock: false,
    height: Mtc.config.gridHeight,
    renderTo: Ext.get('slot1')
});

var profileForm = Ext.create('Ext.form.Panel', {
    id: 'profileForm',
    defaultType: 'textfield',
    url: '/admin/profiles/save',
    frame: true,
    layout: {
        type: 'table',
        columns: 1
    },
    items: [
        {
            fieldLabel: 'Perfil',
            name: 'profile',
            allowBlank: false
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Descripción',
            name: 'description'
        },
        {
            xtype: 'hidden',
            name: 'idprofile',
            value: 0
        }
    ],
    buttons: [
        {
            text: 'Cancelar',
            handler: function(btn){
                var win = btn.up('window');
                win.hide();
            }
        },
        {
            text: 'Guardar',
            handler: function(){
                var win = this.up('window');
                var form = win.down('form').getForm();
                if(form.isValid()){
                    form.submit({
                        success: function(form, request){
                            var obj = Ext.decode(request.response.responseText);
                            if(Mtc.formAction == 'create'){
                                var store = profilesGrid.getStore();
                                store.insert(0, obj.data);                                
                            }else if(Mtc.formAction == 'edit'){
                                Mtc.record.set(obj.data);
                                Mtc.record.commit();
                            }
                            form.reset();
                            win.hide();
                        },
                        failure: function(form, request){
                            var obj = Ext.decode(request.response.responseText);
                            Ext.MessageBox.show({
                                title: 'Error!!!',
                                msg: obj.msg
                            });
                        }
                    });
                }else{
                    return false;
                }
            }
        }
    ]
});
var profileFormWin = Ext.create('Ext.window.Window', {
    iconCls: 'users-admin',
    modal: true,
    items: [
        profileForm
    ],
    closeAction: 'hide',
    autoHeight: true
});
function createProfile(){
    profileFormWin.setTitle('Nuevo Perfil');
    var frm = profileForm.getForm();
    frm.reset();
    Mtc.formAction = 'create';
    profileFormWin.show();
}
function editProfile(){    
    var rows = profilesGrid.getSelectionModel().getSelection();
    if(rows.length !== 0){
        profileFormWin.setTitle('Editar Perfil');
        Mtc.formAction = 'edit';
        Mtc.record = rows[0];
        profileForm.loadRecord(Mtc.record);
        profileFormWin.show();
    }   
}
function deleteProfile(){
    var rows = profilesGrid.getSelectionModel().getSelection();
    if(rows.length !== 0){
        var record = rows[0];
        Ext.MessageBox.show({
            title: 'Eliminar perfil?',
            msg: 'Esta seguro de eliminar el perfil ' + record.get('profile'),
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.MessageBox.WARNING,
            fn: function(confirm){
                if(confirm == 'ok'){
                    Ext.Ajax.request({
                        url: '/admin/profiles/delete',
                        method: 'POST',
                        params: {
                            idprofile: record.get('idprofile')
                        },
                        success: function(response){
                            var obj = Ext.decode(response.responseText);
                            if(obj.success){
                                var store = profilesGrid.getStore();
                                store.remove(record);
                            }else{
                                Ext.MessageBox.show({
                                    title: 'Error!!!',
                                    msg: obj.msg,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }                         
                        }
                    })
                }
            }
        });
    }
}