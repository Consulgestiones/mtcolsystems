login = new Ext.form.Panel({
   id: 'form-login',
   title: 'Ingresar a MTC',
   width: 330,
   height: 170,
   bodyPadding: 10,
   frame: true,
   defaultType: 'textfield',
   url: '/index/login',
   waitTitle: 'Validando',
   layout: {
       type: 'table',
       columns: 2
   },
   collapsible: false,
 
   items: [
       new Ext.Img({
           src: '/images/logo.png',
           width: 85
       }),
//        {
//            xtype: 'image',
//            url: '/images/header.jpg'
//        },
       {
           xtype: 'container',
           height: 70,          
           width: 300,
           bodyPadding: 10,
           layout: {
               type: 'vbox'
           },
           defaultType: 'textfield',
           items: [
               {
                   fieldLabel: 'Usuario',
                   id: 'txtuser',
                   name: 'user',
                   allowBlank: false,
                   autoHeight: true,
                   labelStyle: 'width: 50px'
               },
               {           
                   fieldLabel: 'Clave',
                   inputType: 'password',
                   id: 'txtpass',
                   name: 'pass',
                   allowBlank: false,
                   labelStyle: 'width: 50px'
               },
               {
                   xtype: 'label',
                   id: 'login-status',
                   text: ''
               }
           ]
       },
       
   ],
   buttons: [
       
       {
           id: 'btnlogin',           
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
Ext.get('form-login').on('keydown', function(e){      
   if(e.getKey() == 13){
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
});