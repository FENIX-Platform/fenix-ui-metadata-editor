if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
var locale = localStorage.getItem('locale' || 'en-us');

define(function () {
    var config = {
        paths: {
            'jsTree': '{FENIX_CDN}/js/jstree/3.0.8/dist/jstree.min',
            "bootstrap": "https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
            handlebars: "{FENIX_CDN}/js/handlebars/4.0.5/handlebars.min",
            'jquery': '{FENIX_CDN}/js/jquery/2.1.1/jquery.min',
            'pnotify': '{FENIX_CDN}/js/pnotify/pnotify.custom.min',
            'eonasdan-bootstrap-datetimepicker': '{FENIX_CDN}/js/bootstrap-datetimepicker/4.14.30/src/js/bootstrap-datetimepicker',
            'moment': '{FENIX_CDN}/js/moment/2.12.0/min/moment-with-locales.min',
            'alpaca': '{FENIX_CDN}/js/alpaca/1.5.18/dist/alpaca/bootstrap/alpaca.min',

            "fx-MetaEditor/config": "../src/config",
            "fx-MetaEditor/js": "../src/js",
            "fx-MetaEditor/start": "../src/js/start",
            "fx-MetaEditor/templates": "../templates",
            "fx-MetaEditor/multiLang": "../multiLang",
            'fx-MetaEditor/md-codelists' : '../src/config/CL/uid_codelists',
            'fx-MetaEditor/codelists/ClCodelist': "../src/config/CL/CL_CONF_STATUS"
        },
        config: { i18n: { locale: locale } },
        shim: {
            "bootstrap": { deps: ["jquery"] }
            , 'eonasdan-bootstrap-datetimepicker': { deps: ['moment', 'bootstrap'] }
            , "validate": { deps: ["jquery"] }
            //, 'handlebars404': { exports: "Handlebars" }
            , 'alpaca': { deps: ["jquery", "bootstrap", "handlebars", "moment", "eonasdan-bootstrap-datetimepicker"] }
        }
    };
    return config;
});