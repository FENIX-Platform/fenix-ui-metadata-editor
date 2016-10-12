define([
    'loglevel',
    'jquery',
    '../../../src/js/index',
    '../config/config.json'
], function (log, $, MetaDataEditor, Config) {

    'use strict';

    var s = {
            CODE : "#mdeCode",
            FILTER : "#mde",
            BUTTON : "#getFilter",
            SHOWCODE : "#showCode",

        },
        cache = false,
        lang = "EN",
        environment = "develop",
        config = Config;

    function Dev() {

        console.clear();
        this._importThirdPartyCss();
        // silent trace
        log.setLevel('silent');
        this.start();
    }

    Dev.prototype.start = function () {
        log.trace("Test started");
        this._render();

    };

    Dev.prototype._render = function () {

        this.MDE = new MetaDataEditor({
            environment: environment,
            el: s.FILTER,
            lang: lang,
            config: config
        });

        var self = this;

        $(s.CODE).html(JSON.stringify(this.MDE.config));
        $(s.BUTTON).on("click", function () {
           // console.log(self.MDE);
           $(s.CODE).html(self.MDE.getValues());
        })
        $(s.SHOWCODE).on("click", function(){
            $(s.CODE).toggle();
        });

    };

    Dev.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require("bootstrap-loader");


    };

    return new Dev();

});