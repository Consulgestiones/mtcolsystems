Mtc.sections = {
    init: function() {
        Ext.create('Mtc.view.section.SectionsGrid',{
           store: Ext.create('Mtc.store.SectionsGrid',{
               storeId: 'sectionsGrid',
               autoLoad: true,
               pageSize: AppConfig.gridPageSize
           }),
           renderTo: Ext.get('slot1')           
    });
           var grid = Ext.getCmp('sectionsGrid');
           grid.getStore().Load({
               params: {
                   idmine:1
               }
           }); 
    }

}
Mtc.sections.init.call(Mtc.sections);