Mtc.workorder = {
    init: function(){
        Ext.create('Mtc.view.workorder.WorkOrdersGrid', {
            title: 'Ordenes de Trabajo (Consumo de materiales)', 
            id: 'WorkOrderGrid',
            store: Ext.create('Mtc.store.WorkOrderHeader', {
                storeId: 'WorkOrderHeaderDS',
                autoLoad: true
            }),
            bbar: new Ext.PagingToolbar({  
                pageSize: AppConfig.gridPageSize,  
                store: Ext.data.StoreManager.lookup('WorkOrderHeaderDS'),  
                displayInfo: true  
            }),
            renderTo: Ext.get('slot1')
        });
    }
};
Mtc.workorder.init.call(Mtc.workorder);