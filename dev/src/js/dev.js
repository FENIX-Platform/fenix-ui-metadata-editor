define([
    'loglevel',
    'jquery',
    '../../../src/js/index',
    '../config/config.json'
], function (log, $, MetaDataEditor, Config) {

    'use strict';

    var s = {
            MDE: "#mde"
        },
        cache = false,
        lang = "EN",
        environment = "develop",
        config = Config;

    function Dev() {

        console.clear();
        this._importThirdPartyCss();
        log.setLevel('trace');
        this.start();
    }

    Dev.prototype.start = function () {
        log.trace("Test started");
        this._render();

    };

    Dev.prototype._render = function () {

        this.MDE = new MetaDataEditor({
            environment: environment,
            el: s.MDE,
            lang: lang,
            config: config
        });
    };

    Dev.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require("bootstrap-loader");


    };

    return new Dev();

});