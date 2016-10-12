define([
    "loglevel",
    "jquery",
    "underscore",
    "fenix-ui-filter"
], function (log, $, _, Filter) {

    'use strict';

    var s = {
        SECTIONS : "#mde_sections",
        SECTIONS_LIST : "#mde_sections_list",
        ITEMS : "#mde_items"
    },
        items = {},
        filters = {};

    function MetaDataEditor(obj) {
        log.info("[MDE] Meta Data Editor", obj);
        $.extend(true, this, {initial: obj || {}, $el: $(obj.el)});
        var valid = this._validateInput(obj);

        if (valid === true) {
            this._initVariables();
            this._createContainers();
            this._readConfiguration(obj);
            this._renderOutput();
            this._bindEventListeners();
            this.valid = true;
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
        items = {};
        filters = {};
    };

    MetaDataEditor.prototype._bindEventListeners = function () {
        log.info("[MDE] _bindEventListeners");
        var self = this;
        $(s.SECTIONS_LIST).on("click", function(e){
            self._activateSection($(e.target).data("section"));
        });
    };

    MetaDataEditor.prototype._createContainers = function () {
        this.$el.html('' +
            '<div class="col-xs-3" id="mde_sections"><div id="mde_sections_list" class="list-group"> </div></div>' +
            '<div class="col-xs-9" id="mde_items"></div>');
    };

    MetaDataEditor.prototype._elementsReader = function (obj) {
        log.info("[MDE] _elementsReader ", obj);
        var self = this;
        //$.extend(true, filters, item);
        filters[obj.title] = {};
        if ( (_.size(obj.sections)) && (typeof obj !== 'undefined')  ) { // we have sections
            $.each(obj.sections, function (index, object) {
                self._elementsReader(object); // read the subsection
            });
        } else if ( (_.size(obj.items)) && (typeof obj.items !== 'undefined') ) { // we have items
            $.each(obj.items, function (index, object) {
                var item = {};
                item[index] = object;
                $.extend(true, filters[obj.title], item);
            });
        }
    };
    
    MetaDataEditor.prototype._readConfiguration = function (obj) {
        log.info("[MDE] _readConfiguration",obj);
        this.config = obj.config;
        var self = this;
        // Read all the sections
        $.each(this.config, function (index, object){
            self._elementsReader(object);
        });
    };

    MetaDataEditor.prototype.getValues = function () {
        log.info("[MDE] getValues");
        console.log(filters);
        //return JSON.stringify(this.filter.getValues('plain',true));
    };

    MetaDataEditor.prototype._renderSections = function() {
        log.info("[MDE] _renderSections");
        $.each(filters, function(index, object) {
            $(s.SECTIONS_LIST).append('<button type="button" class="list-group-item" data-section="'+index+'">'+index+'</button>');
        });
    };

    MetaDataEditor.prototype._activateSection = function(section) {
        log.info("[MDE] _activateSection",section);
        console.log("creating into "+s.ITEMS, section, filters[section]);
        var fillo = new Filter({
            el : s.ITEMS,
            items: filters[section]
        });
    };

    MetaDataEditor.prototype._renderOutput = function () {
        log.info("[MDE] _renderOutput");
        this._renderSections();

        $.each(filters, function(index, object) {
            console.log("creating ",index, object);
            /*
            filters[index] = new Filter({
                el : s.ITEMS,
                items: object
            });
            */
        });

    };

    return MetaDataEditor;
});
