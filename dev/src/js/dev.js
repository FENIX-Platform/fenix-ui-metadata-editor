define([
    'loglevel',
    'jquery',
    'underscore',
    '../../../src/js/index',
    '../../../src/js/converter',
    '../config/nested',
    '../config/gift_metadata',
    '../models/fxMetadata',
    '../models/fxMetadataSchema',
    '../models/titleCreationDate',
    '../models/firstSection',
    '../models/firstSecondSections',
    '../models/firstSecondThirdSection',
    '../models/dropdown',
    '../models/gift',
    'ajv',
    '../nls/titles',
    '../nls/descriptions'
], function (log, $, _, MetaDataEditor, Converter, Nested, GIFT, fxMetadata, schema, Model1, Model2, Model3, Model4, DropdownModel, GiftModel, Ajv, i18nTitles, i18nDesc) {

    'use strict';

    var s = {
            MDE: "#mde",
            VALUES: "#get-values-btn",
            DISPOSE: "#dispose-btn",
            ADD: "#add-btn"
        },
        cache = false,
        lang = "EN",
        environment = "production"; //develop production

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
        /*
         _.each(i18nTitles, function(value, key){
         i18nTitles[key] = "MY CUSTOM " + value;
         });

         _.each(i18nDesc, function(value, key){
         i18nDesc[key] = "MY CUSTOM " + value;
         });
         */


        var self = this,
            ajv = new Ajv({
                extendRefs: true,
                allErrors: true
            }),
            validate,
            mde = new MetaDataEditor({
                el: s.MDE,
                lang: lang,
                //model : GiftModel,
                config: GIFT,
                cache: cache,
                environment: environment,
                converters: {
                    "array<resource>" : function( key, value, label, result, selectors, id, path) {

                        console.log('documents', value);

                        value = value.map(function (o) {

                            var codes = o['ResourceType'];
                            if (!Array.isArray(codes)) codes = [codes];
                            var labels = label['ResourceType'];
                            var ResourceType = null;

                            if (codes && codes.length > 0) {
                                ResourceType = {
                                    idCodeList : "GIFT_ResourceType",
                                    codes: []
                                };

                                $.each(codes, function(key,code){
                                    ResourceType.codes.push({
                                        "code" : code,
                                        "label" : {
                                            "EN" : labels[code]
                                        }
                                    });
                                });


                            }
                            var ResourceDetails = {};
                            ResourceDetails["EN"] = o.ResourceDetails;

                            var ResourceCite = {};
                            ResourceCite["EN"] = o.ResourceCite;

                            var ResourceLink = {};
                            ResourceLink["EN"] = o.ResourceLink;

                            return {
                                ResourceType : ResourceType,
                                ResourceDetails: ResourceDetails,
                                ResourceCite: ResourceCite,
                                ResourceLink: ResourceLink
                            }
                        });

                        this._assign(result, key, value ? value : undefined);
                    },
                    "array<label>" : function( key, value, label, result, selectors, id, path){
                        value = value.map(function (o) {
                            var ogg = {};
                            $.each(o, function(key, value){
                                var list = {};
                                list["EN"] = value;
                                ogg[key] = list;
                            });
                            return ogg;
                        });
                        this._assign(result, key, value ? value : undefined);
                    },
                    "array<yesno>" : function( key, value, label, result, selectors, id, path){
                        var c = {};
                        var empty = true;

                        $.each(value, function(key, v){
                            if (v[0]) {
                                empty = false;
                                c[key] = {
                                    idCodeList: "YesNo",
                                    codes: [{
                                        code: v[0],
                                        label: {"EN": label[key][v[0]]}
                                    }]
                                };
                            }
                        });
                        if (!empty) this._assign(result, key, c);
                    },
                    "array<number>" : function( key, value, label, result, selectors, id, path){
                        var ogg = {};
                        var empty = true;
                        $.each(value, function (ch, o) {
                            empty = false;
                            ogg[ch] = Number(o[0]);
                        });
                        this._assign(result, key, !empty ? ogg : undefined);
                    }
                }
                //titles: i18nTitles,
                //descriptions: i18nDesc
            });

        log.warn("Compile FENIX metadata schema: start");

        //validate = ajv.compile(schema);

        log.warn("Compile FENIX metadata schema: success");

        $(s.VALUES).on("click", function () {

            var data = mde.getValues(),
                valid;

            log.warn("Values:");
            console.log(JSON.stringify(data));
            /*
             valid = validate(data);

             log.warn("Valid FENIX metadata? " + valid);

             if (!valid) {
             log.error(validate.errors);
             }
             */

        });

        $(s.DISPOSE).on("click", function () {
            mde.dispose();
        });

        $(s.ADD).on("click", function () {

            mde.setValues(GiftModel.metadata ?GiftModel.metadata : GiftModel );

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