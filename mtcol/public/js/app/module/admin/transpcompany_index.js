Mtc.transpCompanyIndex = {
    init: function(){
        
        
        Ext.create('Mtc.view.transpcompany.Panel', {
            title: 'Compañias de Transporte',
            renderTo: Ext.get('slot1')
        });
        
        
    }
};
Mtc.transpCompanyIndex.init.call(Mtc.transpCompanyIndex);