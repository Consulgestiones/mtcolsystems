Ext.define('Mtc.view.section.SectionsGrid',{
    extend: 'Ext.grid.Panel',
    title: 'Secciones Minas',
    
    columns: [
        {
            header: 'Nombre Seccion',
            dataIndex: 'section',
            width: 150
        },
        {
            header: 'Descripción',
            dataIndex: 'description',
            width: 150
        }
    ],
    stripeRows: true,
    height: AppConfig.gridHeight,
    bbar: new Ext.PagingToolbar({  
        pageSize: AppConfig.gridPageSize,        
        store: Ext.data.StoreManager.lookup('sectionsGrid'),  
        displayInfo: true  
    }),
    
    tbar: [
        {
            text: 'Agregar',
            iconCls: 'add'
        },
        {
            text: 'Editar',
            iconCls: 'edit'
        }
        
    ]

    
});