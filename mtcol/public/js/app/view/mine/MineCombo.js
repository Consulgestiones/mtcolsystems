Ext.define('Mtc.view.mine.MineCombo', {
    extend: 'Ext.form.field.ComboBox',
//    requires: ['Mtc.store.MineCombo'],
    alias: 'widget.minecombo',
    queryMode: 'local',
    store: Ext.create('Mtc.store.MineCombo', {
        autoLoad: true
    }),
    displayField: 'mine',
    valueField: 'idmine'
});