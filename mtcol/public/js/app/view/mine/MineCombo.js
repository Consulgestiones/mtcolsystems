Ext.define('Mtc.view.mine.MineCombo', {
    extend: 'Ext.form.field.ComboBox',    
    requires: ['Mtc.store.MineCombo'],
    alias: 'widget.minecombo',
    queryMode: 'local',    
    displayField: 'mine',
    valueField: 'idmine',
    store: Ext.create('Mtc.store.MineCombo', {
        autoLoad: true
    }),
    emptyText: 'Seleccione'
});