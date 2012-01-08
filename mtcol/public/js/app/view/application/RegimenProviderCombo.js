Ext.define('Mtc.view.application.RegimenProviderCombo', {
    extend: 'Ext.form.field.ComboBox',
    fieldLabel: 'Regimen',
    alias: 'widget.regimenprovider',
    store: Ext.create('Mtc.store.RegimenProvider', {
        storeId: 'RegimenProviderDS',
        autoLoad: true
    }),
    queryMode: 'local',
    displayField: 'regimenprovider',
    valueField: 'idregimenprovider'
});