Ext.define('Mtc.view.transpcompany.ComboTranspCompany', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.cbotranspcompany',
    displayField: 'transpcompany',
    valueField: 'idtranspcompany',
    store: Ext.create('Mtc.store.TranspCompany', {
        autoLoad: true
    }),
    queryMode: 'local',
    editable: true
});