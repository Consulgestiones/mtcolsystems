Ext.define('Mtc.view.application.CityCombo', {
    extend: 'Ext.form.field.ComboBox',
    queryMode: 'local',
    id: 'cbocity',
    name: 'idcity',
    emptyText: 'Seleccione',
    alias: 'widget.city',
    displayField: 'city',
    triggerAction: 'all',
    valueField: 'idcity',
    fieldLabel: 'Ciudad',
    editable: false,
    frame: true,
    store: Ext.create('Mtc.store.City'),
    constructor: function(){
        var al = this.autoLoad || false;
        if(al)
            this.store.load();
        this.superclass.constructor.apply(this, arguments);
    }
});