Mtc.mines = {
    init: function(){
      
            Ext.create('Mtc.view.mine.MineGrid', {
            store: Ext.create('Mtc.store.MineGrid',{
                storeId: 'minaspag',
                autoLoad: true,
                pageSize: AppConfig.gridPageSize 
            }),
           
            renderTo: Ext.get('slot1')
        });
        
    }
}
Mtc.mines.init.call(Mtc.mines);

