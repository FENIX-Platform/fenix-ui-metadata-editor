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

            'jqueryui': "http://code.jquery.com/ui/1.10.3/jquery-ui.min",

            'jquery': '../node_modules/jquery/dist/jquery.min',
            'bootstrap': '../node_modules/bootstrap/dist/js/bootstrap.min',
            'nprogress': '../node_modules/nprogress/nprogress',
            //'bootstrap-validator': "http://cdn.jsdelivr.net/jquery.bootstrapvalidator/0.5.0/js/bootstrapValidator.min",
            'text': "../node_modules/text/text",
            'i18n': "../node_modules/i18n/i18n",
            'domReady': "../node_modules/domReady/domReady",
            'handlebars': "../node_modules/handlebars/dist/handlebars.min",
            'moment': "../node_modules/moment/min/moment-with-locales.min",

            'bootstrap-validator': "lib/bootstrapValidator",
            'pnotify': "lib/pnotify",
            'jstorage': "lib/jstorage",
            'json2': "lib/json2",
            'jqrangeslider': "lib/jqrangeslider",
            'bootstrap-tagsinput': "lib/bootstrap-tagsinput",
            'bootstrap-datetimepicker': "lib/bootstrap-datetimepicker",
            'jQuery.XDomainRequest': 'lib/jQuery.XDomainRequest'
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