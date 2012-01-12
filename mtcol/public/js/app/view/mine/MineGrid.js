Ext.define('Mtc.view.mine.MineGrid',{
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.minegrid',
    queyMode: 'local',
    store: Ext.create('Mtc.store.MineGrid',{
        autoload: true
    }),
    displayField: 'mine',
    valueField: 'idmgrid'
});

