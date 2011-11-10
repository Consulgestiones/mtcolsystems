Ext.define('Mtc.model.User', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'iduser', type: 'int'}, 
       {name: 'idprofile', type: 'int'}, 
       {name: 'profile', type: 'string'}, 
       {name: 'firstname', type: 'string'}, 
       {name: 'lastname', type: 'string'}, 
       {name: 'username', type: 'string'},
       {name: 'idtypeid', type: 'int'},
       {name: 'typeid', type: 'string'},
       {name: 'usernumid', type: 'int'},
       {name: 'useremail', type: 'string'},
       {name: 'userphonehome', type: 'string'},
       {name: 'userphonework', type: 'string'},
       {name: 'userphonemobile', type: 'string'},
       {name: 'userphoneworkext', type: 'string'},
       {name: 'useraddress', type: 'string'},
       {name: 'creationdate', type: 'date', dateFormat: 'Y-m-d H:i:s'},
       {name: 'isactive', type: 'string'},
       {name: 'active', type: 'int'},
       {name: 'userworkemail', type: 'string', vtype: 'email'},
       {name: 'position', type: 'string'},
       {name: 'boss', type: 'string'},
       {name: 'office', type: 'string'}
    ]
});