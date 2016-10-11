define([
    "loglevel",
    "jquery",
    "underscore",
    "fenix-ui-filter"
], function (log, $, _, Filter) {

    'use strict';

    var s = {
        CODE : "#mdeCode",
        FILTER : "#mde"
    };

    function MetaDataEditor(obj) {
        log.info("[MDE] Meta Data Editor", obj);
        $.extend(true, this, {initial: obj || {}, $el: $(obj.el)});
        var valid = this._validateInput(obj);

        if (valid === true) {
            this._readConfiguration(obj);
            this._initVariables();
            this._bindEventListeners();
            this._renderOutput();
            this.valid = true;
            this.filterConfig = {};
            return this;
        } else {
            this.valid = false;
            log.error("Impossible to create MDE", valid);
        }
    }

    MetaDataEditor.prototype._validateInput = function () {
        //TODO: Validate
        return true;
    };

    MetaDataEditor.prototype._initVariables = function () {
        log.info("[MDE] _initVariables");
    };

    MetaDataEditor.prototype._bindEventListeners = function () {
        log.info("[MDE] _bindEventListeners");
    };

    MetaDataEditor.prototype._sectionReader = function (obj) {
        log.info("[MDE] _sectionReader ", obj);
        var items = {};
        if ( (typeof obj !== 'undefined') && _.size(obj.sections) ) { // we have sections
        var self = this;
            console.log("[");
            $.each(obj.sections, function (index, object) {
                self._sectionReader(object);
            });
            console.log("]");
        } else if ( (_.size(obj.items)) && (typeof obj.items !== 'undefined') ) { // we have items
            $.each(obj.items, function (index, object) {
                console.log( obj.title + " >>> ["+index+"] ", object);
                $.extend(true, items, object);

            });
        }
        var fil = new Filter({
            el : s.FILTER,
            items: items
        });
        // console.log(object.hasOwnProperty('sections'));
    };
    
    MetaDataEditor.prototype._readConfiguration = function (obj) {
        log.info("[MDE] _readConfiguration",obj);
        this.config = obj.config;
        var self = this;
        // Read all the sections
        $.each(this.config, function (index, object){
            self._sectionReader(object);
        });
    };

    MetaDataEditor.prototype._renderOutput = function () {
        log.info("[MDE] _renderOutput");
        $(s.CODE).html(JSON.stringify(this.config));
    };

    return MetaDataEditor;
});
