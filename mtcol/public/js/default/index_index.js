login = new Ext.Panel({
   title: 'Ingresar',
   width: 300,
   height: 130,
   defaultType: 'textfield',
   anchor: 'absolute',
   items: [       
       {
           fieldLabel: 'Usuario',
           x:5,
           y:5,
           id: 'txtuser',
           name: 'user'
       },
       {
           fieldLabel: 'Clave',
           x:5,
           y:10,
           id: 'txtpass',
           name: 'pass'
       },
       {
           xtype: 'button',
           x: 217,
           y: 15,
           id: 'btnlogin',
           name: 'login',
           text: 'Entrar'
       }
   ],
   renderTo:Ext.getBody()
}).center();
//var viewport = new Ext.Viewport({
//    layout: 'absolute',
//    items: [login]
//})