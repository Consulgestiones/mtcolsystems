Ext.define('Mtc.view.application.CountryCombo', {
    extend: 'Ext.form.field.ComboBox',
    queryMode: 'local',    
    emptyText: 'Seleccione',
    alias: 'widget.country',
    displayField: 'country',
    valueField: 'idcountry',    
    editable: false,
    triggerAction: 'all',    
    store: Ext.create('Mtc.store.Country')/*,
    constructor: function(){
        var al = this.autoLoad || false;
        if(al)
            this.store.load();
        this.superclass.constructor.apply(this, arguments);
    }*/
});