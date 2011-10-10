login = new Ext.form.Panel({
   id: 'form-login',
   title: 'Ingresar',
   width: 300,
   height: 130,
   defaultType: 'textfield',
   anchor: 'absolute',
   url: '/index/login',
   waitTitle: 'Validando',
   collapsible: true,
   items: [       
       {
           fieldLabel: 'Usuario',
           x:5,
           y:5,
           id: 'txtuser',
           name: 'user',
           allowBlank: false
       },
       {           
           fieldLabel: 'Clave',
           inputType: 'password',
           x:5,
           y:10,
           id: 'txtpass',
           name: 'pass',
           allowBlank: false
       },
       {
           xtype: 'label',
           id: 'login-status',
           text: ''
       },
       {
           xtype: 'button',
           x: 217,
           y: 15,
           id: 'btnlogin',
           name: 'login',
           text: 'Entrar',
           handler: function(){
               Ext.getCmp('login-status').text = 'Comprobando...';
               var form = Ext.getCmp('form-login').getForm();
               form.submit({
                   success:function(form, request){
                       var usr = Ext.decode(request.response.responseText).user;
                       console.log(Ext.encode(usr));
                       setGlobal('user', usr);
                       setGlobal('menu', usr.menu);
                       if(usr.applications.length == 1){
                           var app = usr.applications[0];
                           window.location = window.location + app.module + '/' + app.controller + '/' + app.action
                       }else{
                           window.location = window.location + 'applications';
                       }
                   },
                   failure: function(form, request){
                       Ext.MessageBox.show({
                           title: 'Error',
                           msg: 'Error de autenticación',
                           buttons: Ext.MessageBox.OK,
                           icon: Ext.MessageBox.ERROR
                       })
                   }
               });
           }
       }
   ],
   renderTo:Ext.getBody()
}).center();
//var viewport = new Ext.Viewport({
//    layout: 'absolute',
//    items: [login]
//})