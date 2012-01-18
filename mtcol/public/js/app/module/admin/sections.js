Mtc.sections = {
    init: function() {
        Ext.create('Mtc.view.mine.SectionsGrids',{
           strore: Ext.create('Mtc.store,Sections',{
               storeId: 'sections',
               autoload:true,
               pageSize: AppConfig.gridPageSize
           }),
           renderTo: Ext.get('slot1')
        });
    }
}
Mtc.sections.init.call(Mtc.sections);