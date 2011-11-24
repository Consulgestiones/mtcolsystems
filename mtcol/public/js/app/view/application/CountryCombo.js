Ext.define('Mtc.view.application.CountryCombo', {
    extend: 'Ext.form.field.ComboBox',
    requires: ['Mtc.store.Country'],
    queryMode: 'local',    
    emptyText: 'Seleccione',
    alias: 'widget.country',
    displayField: 'country',
    valueField: 'idcountry',    
    editable: true,
    triggerAction: 'all',    
    store: Ext.create('Mtc.store.Country')/*,
    constructor: function(){
        var al = this.autoLoad || false;
        if(al)
            this.store.load();
        this.superclass.constructor.apply(this, arguments);
    }*/
});