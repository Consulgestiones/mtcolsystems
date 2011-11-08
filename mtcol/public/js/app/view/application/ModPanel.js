/**
 * Panel que renderiza el menu para cada aplicación
 * @param String appimage url de la imagen de la aplicación
 * @param Integer appdisabled 1 si esta habilitado 0 de lo contrario
 * @param String apphref url a la cual lo debe redirigir el panel
 * @param String appname nombre que se ve debajo de la imagen
 */

Ext.define('Mtc.view.application.ModPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.appmod',
    boder: 1,
    bodyPadding: 3,
    autoHeight: true,
    height: 400,
    config: {
        appimage: '/images/blank.gif',
        appdisabled: 0,
        apphref: '',
        appname: '',
        border: 0,
        width: 400
    },    
    constructor: function(config){
        this.initConfig(config);
        var tpl;
        if(this.appdisabled == 1){
            var parts = this.appimage.split('.');
            this.appimage = parts[0] + '_disabled.' + parts[1];
            tpl = Ext.XTemplate('<center><img src="{img}" /><br /><span><h2>{application}</h2></span></center>');
        }else{            
            tpl = Ext.XTemplate('<center><a href="{href}"><img src="{img}" /></a><br /><span><h2>{application}</h2></span></center>');
        }
        this.tpl = tpl;
        this.update({
            href: this.apphref,
            img: this.appimage,
            application: this.appname
        });
        this.superclass.constructor.apply(this, arguments);
    }
    
});
