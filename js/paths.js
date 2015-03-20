define(function () {

    var config = {

        paths:  {
            'fx-editor/start': './start',
            'fx-editor/controllers': "./editor/controllers",
            'fx-editor/js': "./",
            'fx-editor/utils': "./editor/utils",
            'fx-editor/conf/json': "../conf/json",
            'fx-editor/conf/js': "../conf/js",
            'fx-editor/conf/nls': "../conf/nls",
            'fx-editor/widgets': "./editor/widgets",
            'fx-editor/plugins': "./editor/widgets/bridge/plugins",
            'fx-editor/templates': "../templates",
            'fx-editor/nls': "../nls",
            'jquery-serialize-object': "./editor/utils/Fx-jquery-serialize-object",

            'jqueryui': "//code.jquery.com/ui/1.10.3/jquery-ui.min",
            'jquery': '{FENIX_CDN}/js/jquery/2.1.1/jquery.min',
            domReady: "{FENIX_CDN}/js/requirejs/plugins/domready/2.0.1/domReady",
            i18n: "{FENIX_CDN}/js/requirejs/plugins/i18n/2.0.4/i18n",
            text: "{FENIX_CDN}/js/requirejs/plugins/text/2.0.12/text",
            bootstrap: "//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min",
            pnotify: '{FENIX_CDN}/js/pnotify/2.0.1/pnotify.custom.min',

            'nprogress': '{FENIX_CDN}/js/nprogress/0.1.6/nprogress',
            'handlebars': "{FENIX_CDN}/js/handlebars/2.0.0/handlebars",

            'moment': "{FENIX_CDN}/js/moment/2.9.0/moment-with-locales.min",

            'bootstrap-validator': "{FENIX_CDN}/js/bootstrap-validator/0.5.0/bootstrapValidator",
            'jstorage': "{FENIX_CDN}/js/jstorage/jstorage",
            'json2': "{FENIX_CDN}/js/json2/1.0/json2",
            'jqrangeslider': "{FENIX_CDN}/js/jqrangeslider/5.7.0/jQRangeSlider",

            'bootstrap-tagsinput': "{FENIX_CDN}/js/bootstrap-tagsinput/bootstrap-tagsinput",
            'bootstrap-datetimepicker': "{FENIX_CDN}/js/bootstrap-datetimepicker/3.1.3/bootstrap-datetimepicker",
            'jQuery.XDomainRequest': '{FENIX_CDN}/js/jQuery.XDomainRequest/jQuery.XDomainRequest'

        },
        locale: 'en',
        shim: {
            "jqrangeslider": {
                deps: ["jquery", "jqueryui"]
            },
            "bootstrap": {
                deps: ["jquery"]
            },
            "jquery-serialize-object": {
                deps: ["jquery"]
            },
            "bootstrap-validator": {
                deps: ["jquery", "moment"]
            },
            "jstorage": {
                deps: ["jquery", "json2"]
            },
            "bootstrap-tagsinput": {
                deps: ["jquery", "bootstrap"]
            },
            "bootstrap-datetimepicker": {
                deps: ["jquery", "moment"]
            },
            "handlebars": {
                exports: 'Handlebars'
            },
            "jQuery.XDomainRequest": {
                deps: ["jquery"]
            }
        }
    };

    return config;
});