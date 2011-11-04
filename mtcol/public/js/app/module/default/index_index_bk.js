var f = Ext.create('Ext.form.Panel', {
    renderTo: Ext.getBody(),
    title: 'Entrada al sistema',
    width: 250,
    height: 130,
    layout: 'absolute',
    url: '/index/login',
    defaultType: 'textfield',
    frame: true,
    items:[
        {
            x: 10,
            y: 10,
            xtype:'label',
            text: 'Usuario:'
        },
        {
            x: 80,
            y: 7,
            name: 'user',
            anchor:'90%'
        },
        {
            x: 10,
            y: 40,
            xtype:'label',
            text: 'Clave:'
        },
        {
            x: 80,
            y: 37,
            name: 'pass',
            inputType: 'password',
            anchor:'90%'
        }
    ],
    buttons: [
        {
            text: 'Entrar',
            formBind: true,
            handler: function(){
                var form = this.up('form').getForm();                
                var user = form.findField('user').getValue();
                var pass = form.findField('pass').getValue();
                Ext.Ajax.request({
                    url: '/index/login',
                    params: {
                        user: user,
                        pass: pass
                    },
                    success:function(response){
                        var obj = Ext.JSON.decode(response.responseText);                        
                        if(obj.status == 'S'){
                            document.localtion = document.location + '/modules';
                        }
                    }
                })
            }
        }
    ]
}).center();
Ext.dd.DragDrop(f);