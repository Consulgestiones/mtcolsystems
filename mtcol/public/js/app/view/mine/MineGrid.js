Ext.define('Mtc.view.mine.MineGrid',{
    extend: 'Ext.grid.Panel',
    title: 'Minas',

    columns: [
        {
            header: 'Nombre de la mina',
            dataIndex: 'mine',
            width:150
        },
        {
            header: 'Descripcion',
            dataIndex: 'description',
            width:150
        }
    ],
    stripeRows: true,
    height: AppConfig.gridHeight,
    bbar: new Ext.PagingToolbar({  
        pageSize: AppConfig.gridPageSize,        
        store: Ext.data.StoreManager.lookup('minaspag'),  
        displayInfo: true  
    }),
    tbar: [
        {
            text: 'Agregar',
            iconCls: 'add',
            handler: function(){
                var w = Ext.create('Mtc.view.mine.AddMine');
                w.setTitle('Agregar Nueva Mina');
                var form = w.down('form').getForm();
                form.reset();
                w.show();
            }            
        },
        {
            text: 'Editar',
            iconCls: 'edit',
            handler: function(){
                var w = Ext.create('Mtc.view.mine.WindowEditMine');
                    w.setTitle('Editar Mina');
                var form = w.down('form').getForm();
                form.reset();
                w.show();
            } 
        },
        {
            text: 'Secciones',
            iconCls: 'car'
        }
    ]
    
});
