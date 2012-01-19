 Mtc.sections = {
    init: function() {
        Ext.create('Mtc.view.mine.SectionsGrid',{
           strore: Ext.create('Mtc.store.SectionsGrid',{
               storeId: 'sectionsGrid',
               autoLoad: true,
               pageSize: AppConfig.gridPageSize
           }),
           renderTo: Ext.get('slot1')
        });
    }
}
Mtc.sections.init.call(Mtc.sections);