Ext.define('Mtc.view.mine.WindowEditMine',{
    extend: 'Ext.window.Window',
    closeAction: 'hide',
    items: [
        Ext.create('Mtc.view.mine.CreateMine')
    ],
    modal: true
})