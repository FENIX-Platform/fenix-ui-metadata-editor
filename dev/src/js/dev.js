define([
    'loglevel',
    'jquery',
    '../../../src/js/index',
    '../../../src/js/converter',
    '../config/nested',
    '../models/fxMetadata',
    '../models/fxMetadataSchema',
    '../models/titleCreationDate',
    '../models/firstSection',
    '../models/firstSecondSections',
    '../models/firstSecondThirdSection',
    '../models/dropdown',
    'ajv'
], function (log, $, MetaDataEditor, Converter, Nested, fxMetadata, schema, Model1, Model2, Model3, Model4, DropdownModel,  Ajv) {

    'use strict';

    var s = {
            MDE: "#mde",
            VALUES: "#get-values-btn",
            DISPOSE: "#dispose-btn",
            ADD: "#add-btn"
        },
        cache = false,
        lang = "FR",
        environment = "develop"; //develop production

    function Dev() {

        console.clear();

        this._importThirdPartyCss();

        // silent trace
        log.setLevel('silent');

        this.start();
    }

    Dev.prototype.start = function () {
        log.trace("Test started");

        this._renderMDE();

        //this._renderNested();

        //this._toValues();

        //this._toMetadata();

    };

    Dev.prototype._toValues = function () {

        console.log(Converter.toValues({
            model: fxMetadata
        }));

    };

    Dev.prototype._toMetadata = function () {

        console.log(Converter.toMetadata({
            config: Nested,
            environment: environment,
            values: {
                "values": {
                    "a": {"textarea": ["Hello dani!"], "input": ["item_1"]},
                    "b": {"input": [], "bb": {"bba": {"dropdown": ["item_1"]}}}
                },
                "labels": {
                    "a": {"textarea": {"Hello dani!": "Hello dani!"}, "input": {"item_1": "Item 1"}},
                    "b": {"input": {}, "bb": {"bba": {"dropdown": {"item_1": "Item 1"}}}}
                },
                "valid": true
            }
        }));

    };

    Dev.prototype._renderMDE = function () {

        var self =this,
            ajv = new Ajv({
                extendRefs: true,
                allErrors: true
            }),
            validate,
            mde = new MetaDataEditor({
                el: s.MDE,
                lang: lang,
                //config: Nested,
                model: DropdownModel,
                cache: cache,
                environment: environment
            });

        log.warn("Compile FENIX metadata schema: start");

        validate = ajv.compile(schema);

        log.warn("Compile FENIX metadata schema: success");

        $(s.VALUES).on("click", function () {

            var data = mde.getValues(),
                valid;

            log.warn("Values:");

            valid = validate(data);

            log.warn("Valid FENIX metadata? " + valid);

            if (!valid) {
                log.error(validate.errors);
            }

        });

        $(s.DISPOSE).on("click", function () {
            mde.dispose();
        });

        $(s.ADD).on("click", function () {

            mde.setValues(DropdownModel);

           /* mde.dispose();
            $(s.VALUES).off();
            $(s.DISPOSE).off();
            $(s.ADD).off();

            self._renderMDE()*/

        });
    };

    Dev.prototype._renderNested = function () {

        var mde = new MetaDataEditor({
            el: s.MDE,
            lang: lang,
            config: Nested,
            cache: cache,
            environment: environment
        });

        $(s.VALUES).on("click", function () {

            var data = mde.getValues("plain");

            console.log(data);

        });

        $(s.DISPOSE).on("click", function () {
            mde.dispose();
        });
    };

    Dev.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');
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