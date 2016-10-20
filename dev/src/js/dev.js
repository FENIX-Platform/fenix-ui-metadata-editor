define([
    'loglevel',
    'jquery',
    '../../../src/js/index',
    '../config/nested'
], function (log, $, MetaDataEditor, Nested) {

    'use strict';

    var s = {
            MDE: "#mde",
            VALUES: "#get-values-btn"
        },
        cache = false,
        lang = "EN",
        environment = "develop";

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

        var mde = new MetaDataEditor({
            el: s.MDE,
            lang: lang,
            config: Nested,
            model: {
                a: {
                    textarea: ["Hello dani!"],
                    input: ["item_1"]
                },
                b: {
                    bb: {
                        bba: {
                            dropdown: ["item_1"]
                        }
                    }
                }
            },
            cache: cache,
            environment: environment
        });

        $(s.VALUES).on("click", function () {
            console.log(mde.getValues())
        });

    };

    Dev.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require("bootstrap-loader");

        //dropdown selector
        require("../../../node_modules/selectize/dist/css/selectize.bootstrap3.css");
        //tree selector
        require("../../../node_modules/jstree/dist/themes/default/style.min.css");
        //range selector
        require("../../../node_modules/ion-rangeslider/css/ion.rangeSlider.css");
        require("../../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css");
        //time selector
        require("../../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");
        // fenix filter
        require("../../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");

    };

    return new Dev();

});