Ext.define('Mtc.view.remission.WindowForm', {
    extend: 'Ext.window.Window',
    id: 'WindowForm',
    modal: true,
    items: [
        Ext.create('Mtc.view.remission.FormHeader'),
        Ext.create('Mtc.view.remission.FormItem'),
        Ext.create('Mtc.view.remission.GridDetail', {
            id: 'GridDetail'
        })
    ],
    buttons: [
        {
            text: 'Cancelar',
            iconCls: 'btn-cancel'
        },
        {
            text: 'Guardar',
            iconCls: 'btn-save'
        }
    ]
});