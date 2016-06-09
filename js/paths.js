/*global requirejs, define*/
var locale = localStorage.getItem('locale' || 'en-us');

define(function () {
    var config = {
        paths: {
            "fx-MetaEditor2/start": "./start",
            "fx-MetaEditor2/config": "../config",
            "fx-MetaEditor2/js": "../js",
            "fx-MetaEditor2/templates": "../templates",
            "fx-MetaEditor2/multiLang": "../multiLang",
            "bootstrap": "https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
            'jquery': '{FENIX_CDN}/js/jquery/2.1.1/jquery.min',
            //'amplify': '../lib/amplify/amplify.min',
            //'text': '../lib/text',
            'pnotify': '../lib/pnotify/pnotify.custom.min',
            'datetimepicker': '../lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min',
            'moment': '../lib/moment-with-locales',
            //'validate': '../lib/parsley',
            'jsTree': '../lib/jsTree/jstree.min',
            handlebars: "{FENIX_CDN}/js/handlebars/4.0.5/handlebars.min",
            //The one on the CDN times out, check and reEnable it
            //'jsTree': '{FENIX_CDN}/js/jstree/3.0.8/dist/jstree.min',
            'alpaca': '{FENIX_CDN}/js/alpaca/1.5.17/dist/alpaca/bootstrap/alpaca.min',
            'fx-MetaEditor2/md-codelists' : '../config/CL/uid_codelists',
            //,'handlebars404': '../lib/handlebars-v4.0.4'

            'fx-MetaEditor2/codelists/ClCodelist': "../config/CL/CL_CONF_STATUS"
        },
        config: { i18n: { locale: locale } },
        shim: {
            "bootstrap": { deps: ["jquery"] }
            , 'datetimepicker': { deps: ['moment', 'bootstrap'] }
            , "validate": { deps: ["jquery"] }
            //, 'handlebars404': { exports: "Handlebars" }
            , 'alpaca': { deps: ["jquery", "bootstrap", "handlebars", "moment", "datetimepicker"] }
        }
    };
    return config;
});