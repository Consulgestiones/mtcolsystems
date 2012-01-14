Ext.define('Mtc.view.mine.MineGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.minegrid',
    title: 'Minas',
   // queyMode: 'local',
    store: Ext.create('Mtc.store.MineGrid',{
        autoload: true
    }),
    displayField: 'mine',
    valueField: 'idmgrid',
    columns: [
        {
            header: 'Nombre de la mina',
            dataIndex: 'mine'
        },
        {
            header: 'Descripcion',
            dataIndex: 'description'
        }
    ]
    
});






