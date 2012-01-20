Mtc.sections = {
    init: function() {
        
        Ext.create('Mtc.view.section.SectionsGrid',{
        store: Ext.create('Mtc.store.SectionsGrid',{
               storeId: 'sectionsGrid',
               autoLoad: false,
               pageSize: AppConfig.gridPageSize
           }),
           renderTo: Ext.get('slot1')           
    });
      
      var grid = Ext.getCmp('sectionsGrid');
      var store = grid.store;
         grid.store.load({
              params: {
                  idmine: 1
              }
          });         
      
     
     /*      //var grid = Ext.getCmp('sectionsGrid');
           var gridStore = Ext.getCmp('sectionsGrid');
           //var store = grid.getStore();
          // var store = grid.getStore();
           gridStore.loadData({
               params: {
                   idmine: 1
               }
           }); */
    }

}
Mtc.sections.init.call(Mtc.sections);