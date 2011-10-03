Ext.ns('com.mtcol');
com.mtcol.Crud = {
    init: function(){
        var proxy = new Ext.data.HttpProxy({
            api: {
                read: '/admin/users/getusers.php',
                create: '/admin/users/createuser.php',
                update: '/admin/users/updateuser.php',
                destroy: '/admin/users/destroyuser.php'
            }
        });
        var reader = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data'
        })
    }
}