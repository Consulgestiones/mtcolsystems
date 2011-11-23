Ext.Loader.setConfig({
        enabled:true,
        paths: {
            Mtc: '/js/app'
        }
    }
);
Ext.ns('Mtc');
Ext.BLANK_IMAGE_URL = '../ext-2.2/resources/images/default/s.gif';
Ext.define('AppConfig', {
    singleton: true,
    gridPageSize: 15,
    gridHeight: 400,
    appsColumns: 3,
    appsWidthItem: 400
});
//Mtc.config = {
//    gridPageSize: 15,
//    gridHeight: 400,
//    appsColumns: 3,
//    appsWidthItem: 400
//};
/**
 * Modelos
 */
Ext.define('Mtc.model.TypeId', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idtypeid', type: 'int'},
        {name: 'typeid', type: 'string'}
    ]        
});

Ext.define('Mtc.model.Country', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idcountry', type: 'int'},
        {name: 'country', type: 'string'}
    ]
});
Ext.define('Mtc.model.City', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idcity', type: 'int'},
        {name: 'city', type: 'string'}
    ]
});
Ext.define('Mtc.model.Provider', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idprovider', type: 'int'},
        {name: 'idtypeid', type: 'int'},
        {name: 'providertypeid', type: 'string'},
        {name: 'idcity', type: 'int'},
        {name: 'city', type: 'string'},
        {name: 'idcountry', type: 'int'},
        {name: 'country', type: 'string'},
        {name: 'provider', type: 'string'},
        {name: 'typeid', type: 'string'},
        {name: 'providernumid', type: 'string'},
        {name: 'providerphone', type: 'string'},
        {name: 'provideremail', type: 'string'},
        {name: 'provideraddress', type: 'string'},
        {name: 'contact', type: 'string'},
        {name: 'contacttitle', type: 'string'},
        {name: 'contactphonehome', type: 'string'},
        {name: 'contactphonework', type: 'string'},
        {name: 'contactphonemobile', type: 'string'},
        {name: 'contactphoneworkext', type: 'string'},
    ]
});

/**
 * /Modelos
 */
/**
 * Widgets
 */
//Combo de tipos de identificacion
Ext.define('Mtc.widgets.TypeidCombo', {
    extend: 'Ext.form.field.ComboBox',
    queryMode: 'local',
    id: 'cbotypeid',
    name: 'idtypeid',
    emptyText: 'Seleccione',
    alias: 'widget.typeid',
    displayField: 'typeid',
    valueField: 'idtypeid',
    triggerAction: 'all',
    fieldLabel: 'Tipo ID',
    frame: true,
    store: {
        model: 'Mtc.model.TypeId',
        proxy: {
            type: 'ajax',
            url: '/typesid/gettypes',
            model: 'Mtc.model.TypeId',
            reader: {
                type: 'json',
                successProperty: 'success',
                root: 'data'
            }
        },
        autoLoad: true
    }
});
//Combo de paises
Ext.define('Mtc.widgets.CountryCombo', {
    extend: 'Ext.form.field.ComboBox',
    queryMode: 'local',    
    emptyText: 'Seleccione',
    alias: 'widget.country',
    displayField: 'country',
    valueField: 'idcountry',    
    editable: false,
    triggerAction: 'all',
    frame: true,
    store: {
        model: 'Mtc.model.Country',
        proxy: {
            type: 'ajax',
            url: '/countries/read',
            model: 'Mtc.model.Country',
            reader: {
                type: 'json',
                successProperty: 'success',
                root: 'data'
            }
        },
        autoLoad: true
    }
});

//Combo de ciudades

Ext.define('Mtc.widgets.CityCombo', {
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
    store: {
        model: 'Mtc.model.City',
        proxy: {
            type: 'ajax',
            url: '/cities/read',
            model: 'Mtc.model.City',
            reader: {
                type: 'json',
                successProperty: 'success',
                root: 'data'
            }
        },
        autoLoad: false
    }
});

/**
 * /Widgets
 */