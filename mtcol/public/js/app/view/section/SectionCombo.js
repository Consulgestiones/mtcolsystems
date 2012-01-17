Ext.define('Mtc.view.section.SectionCombo', {
    extend: 'Ext.form.field.ComboBox',
    requires: ['Mtc.store.SectionCombo'],
    alias: 'widget.sectioncombo',
    queryMode: 'local',
    store: Ext.create('Mtc.store.SectionCombo', {
        autoLoad: true
    }),
    displayField: 'section',
    valueField: 'idsection',
    emptyText: 'Seleccione'
});