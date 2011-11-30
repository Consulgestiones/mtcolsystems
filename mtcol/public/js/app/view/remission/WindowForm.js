Ext.define('Mtc.view.remission.WindowForm', {
    extend: 'Ext.window.Window',
    id: 'WindowForm',
    items: [
        Ext.create('Mtc.view.remission.FormHeader')
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