Mtc.mines = {
    init: function(){
      
            Ext.create('Mtc.view.mine.MineGrid', {
            title: 'Minas',
            renderTo: Ext.get('slot1')
        });
        
    }
}
Mtc.mines.init.call(Mtc.mines);