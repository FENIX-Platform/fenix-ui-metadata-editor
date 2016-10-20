define([
    'loglevel',
    'jquery',
    'underscore',
    '../config/errors',
    '../config/events',
    '../config/config',
    '../config/metadata',
    '../html/template.hbs',
    '../html/sectionContent.hbs',
    '../html/sectionIndex.hbs',
    'fenix-ui-filter'
], function (log, $, _, ERR, EVT, C, FenixMetadata, template, sectionContent, sectionIndex, Filter) {

    'use strict';

    var s = {
        INDEX: "[data-role='index']",
        CONTENT: "[data-role='content']"
    };

    function MetaDataEditor(obj) {
        log.info("[MDE] Meta Data Editor", obj);

        require("../css/fenix-ui-metadata-editor.css");

        $.extend(true, this, C, {initial: obj || {}, $el: $(obj.el)});

        var valid = this._validateInput(obj);

        if (valid === true) {

            this._parseInput();

            this._attach();

            this._initVariables();

            this._render();

            this._bindEventListeners();

            this._showInitialSection();

            this.valid = true;

            this._trigger(EVT.ready);

            return this;
        } else {

            this.valid = false;

            log.error("Impossible to create MDE");
            log.error(JSON.stringify(valid))
        }
    }

    /**
     * Return the current selection
     * @return {Object} Selection
     */
    MetaDataEditor.prototype.getValues = function (format) {

        var candidate = format || this.outputFormat,
            call = this["_format_" + candidate];

        if ($.isFunction(call)) {
            return call.call(this, this._getValues());
        } else {
            log.error("Impossible to find the output format: " + candidate);
        }
    };

    /**
     * Set model
     */
    MetaDataEditor.prototype.setValues = function (model) {

        return this._setValues(model);
    };

    /**
     * pub/sub
     * @return {Object} component instance
     */
    MetaDataEditor.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    /**
     * Show a section programmatically
     * */
    MetaDataEditor.prototype.showSection = function (id) {

        return this._showSection(id);

    };

    //end API

    MetaDataEditor.prototype._validateInput = function () {

        var valid = true,
            errors = [];

        //set filter id
        if (!this.id) {

            window.fx_mde_id >= 0 ? window.fx_mde_id++ : window.fx_mde_id = 0;
            this.id = String(window.fx_mde_id);
            log.info("Set MDE id: " + this.id);
        }

        //Check if $el exist
        if (this.$el.length === 0) {
            errors.push({code: ERR.MISSING_CONTAINER});
            log.warn("Impossible to find filter container");
        }

        return errors.length > 0 ? errors : valid;
    };

    MetaDataEditor.prototype._initVariables = function () {

        //init index container
        this.$index = this.$el.find(s.INDEX);
        if (this.$index.length === 0) {
            this.$index = this.$el.append("<ol data-role='index'></ol>");
        }

        //init content container
        this.$content = this.$el.find(s.CONTENT);
        if (this.$content.length === 0) {
            this.$content = this.$el.append("<div data-role='content'></div>");
        }

        this.initialSection = this.initial.initialSection || Object.keys(this.config)[0];

        this.model = this.initial.model || {};

        this.environment = this.initial.environment;
        this.cache = this.initial.cache || C.cache;

        this.sections = {};

        this.channels = {};

        log.info("[MDE] variable init success");

    };

    MetaDataEditor.prototype._parseInput = function () {

        this.$template = $(this.initial.template || template());

        this.$template.attr("data-fenix", "metadata-editor");

        this.config = this.initial.config || FenixMetadata;

        this.nls = this.initial.nls || {};
    };

    MetaDataEditor.prototype._attach = function () {

        this.$el.html(this.$template);

        log.info("[MDE] template attached successfully");

    };

    MetaDataEditor.prototype._render = function () {

        this._renderSections(this.config);

        log.info("[MDE] render success");

    };

    MetaDataEditor.prototype._renderSections = function (sections, parent) {
        log.info("[MDE] Render sections:");
        log.info(sections);

        _.each(sections, _.bind(function (s, id) {

            if (this.sections.hasOwnProperty(id)) {
                log.error("Duplicated section id found: " + id);
                return;
            }

            s.id = id;
            s.parent = parent;
            s.path = this.sections[parent] && Array.isArray(this.sections[parent].path) ? this.sections[parent].path.slice(0).concat(s.id) : [s.id];

            this.sections[id] = s;

            log.info("Render section [" + id + "] with parent [" + parent + "]");

            s.el = this._attachSectionContent(s, id, parent); //TODO pluggable

            s.index = this._attachSectionIndex(s, id, parent); //TODO pluggable

            if (typeof s.sections === 'object') {
                this._renderSections(s.sections, id)
            } else {
                s.isLeaf = true;
            }

        }, this))
    };

    MetaDataEditor.prototype._attachSectionContent = function (s, id, parent) {

        var $parentEl = this.$content.find("[data-section='" + parent + "']"),
            template = s.template || {},
            $template = $(template.contentTemplate || sectionContent($.extend(true, {}, s, template)));

        if ($template.length === 0) {
            log.error(id + " section has not a valid content template configuration");
            log.error(s.template);
            return;
        }

        //if parent is not already attached, use $content
        if ($parentEl.length === 0) {
            $parentEl = this.$content;
        }

        $template.attr("data-section", id);

        //add custom class
        $template.addClass(s.className);
        $template.addClass(this.sectionContentClassName);
        $template.append("<div data-role='selectors'></div>");

        $parentEl.append($template);

        return $template

    };

    MetaDataEditor.prototype._attachSectionIndex = function (s, id, parent) {

        var $parentEl = this.$index.find("[data-section='" + parent + "']"),
            template = s.template || {},
            $template = $(template.contentTemplate || sectionIndex($.extend(true, {}, s, template)));

        if ($template.length === 0) {
            log.error(id + " section has not a valid index template configuration");
            log.error(s.index);
            return;
        }

        //if parent is not already attached, use $index
        if ($parentEl.length === 0) {
            $parentEl = this.$index;
        }

        var $ol = $parentEl.find("ol");

        if ($ol.length === 0) {
            $parentEl.append("<ol></ol>");
        }

        $parentEl = $parentEl.find("ol").first();

        //add section id for retrieve
        $template.attr("data-section", id);

        //add custom class
        $template.addClass(s.className);
        $template.addClass(this.sectionIndexClassName);

        $parentEl.append($template);

        return $template

    };

    MetaDataEditor.prototype._renderSelectors = function (s, id) {
        log.info("Render section's selectors: " + id);
        log.info(s);

        if (!s.selectors) {
            log.warn("Abort because section does not contains any selectors: " + id);
        } else {

            s.filter = new Filter({
                el: s.el.find("[data-role='selectors']").first(),
                cache: this.cache,
                environment: this.environment,
                selectors: s.selectors,
                values : this._getInitialValues(s)
            });
        }

        _.each(s.sections, _.bind(function (sec, id) {
            this._renderSelectors(sec, id)
        }, this));

        s.initialized = true;
    };

    MetaDataEditor.prototype._getInitialValues = function(s) {

        return {
            values : this._getNestedProperty(s.path.join("."), this.model)
        }
    };

    MetaDataEditor.prototype._showInitialSection = function () {

        log.info("Show initial section");

        return this._showSection(this.initialSection);
    };

    MetaDataEditor.prototype._showSection = function (id) {
        log.info("Show section: " + id);

        var section = this.sections[id],
            root = section.path[0];

        if (!section) {
            log.warn("Impossible to find section " + id);
            return;
        }

        if (this.currentSection === root) {
            log.warn("Abort show section. Section already active");
            return;
        }

        this.currentSection = root;

        // activate index
        this.$index.find("[data-section]").removeClass("active");
        this.$index.find("[data-section='" + root + "']").addClass("active");
        this.$index.find("[data-section='" + root + "']").find("[data-section]").addClass("active");

        //activate content
        this.$content.find("[data-section]").removeClass("active");
        this.$content.find("[data-section='" + root + "']").addClass("active");
        this.$content.find("[data-section='" + root + "']").find("[data-section]").addClass("active");

        if (!section.initialized) {
            this._renderSelectors(this.sections[root], root);
        }

    };

    MetaDataEditor.prototype._bindEventListeners = function () {

        var self = this;

        this.$index.find("." + this.sectionIndexClassName).on("click", function (e) {
            e.stopPropagation();

            var target = $(e.target).data("section") || $(e.target).parent().data("section");

            if (target) {
                self.showSection(target); //Note: is an API
            }
        });

        log.info("Events bind success");
    };

    MetaDataEditor.prototype._getValues = function () {

        var result = {
            values: {},
            labels: {},
            valid: true,
            errors: []
        };

        this._getSectionsValues(this.config, result);

        if (Array.isArray(result.errors) && result.errors.length === 0) {
            delete result.errors;
        }

        return result
    };

    MetaDataEditor.prototype._getSectionsValues = function (sections, result) {

        var values = {};

        _.each(sections, _.bind(function (section) {

            var path = section.path.join(".");

            if (section.hasOwnProperty('filter')) {

                var filter = section.filter.getValues();
                this._assign(result.values, path, filter.values);
                this._assign(result.labels, path, filter.labels);
                result.valid = result.valid && filter.valid;

                if (Array.isArray(filter.error)) {
                    result.error = result.error.concat(filter.error);
                }
            }

            if (typeof section.sections === 'object') {
                this._getSectionsValues(section.sections, result);
            }

        }, this));

        return values

    };

    // values formatter

    MetaDataEditor.prototype._format_plain = function (values) {

        return values;
    };

    // utils

    MetaDataEditor.prototype._assign = function (obj, prop, value) {
        if (typeof prop === "string")
            prop = prop.split(".");

        if (prop.length > 1) {
            var e = prop.shift();
            this._assign(obj[e] =
                    Object.prototype.toString.call(obj[e]) === "[object Object]"
                        ? obj[e]
                        : {},
                prop,
                value);
        } else {
            obj[prop[0]] = value;
        }
    };

    MetaDataEditor.prototype._getNestedProperty = function (path, obj) {

        var obj = $.extend(true, {}, obj),
            arr = path.split(".");

        while (arr.length && (obj = obj[arr.shift()]));

        return obj;

    };

    MetaDataEditor.prototype._trigger = function (channel) {

        if (!this.channels[channel]) {
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };

    return MetaDataEditor;
});
