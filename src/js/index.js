define([
    'loglevel',
    'jquery',
    'underscore',
    './converter',
    '../config/errors',
    '../config/events',
    '../config/config',
    '../config/metadata',
    '../html/template.hbs',
    '../html/sectionContent.hbs',
    '../html/sectionIndex.hbs'
], function (log, $, _, Converter, ERR, EVT, C, FenixMetadata, template, sectionContent, sectionIndex) {

    'use strict';

    var codePluginsFolder = "./selectors/",
        s = {
            INDEX: "[data-role='index']",
            CONTENT: "[data-role='content']"
        },
        ROOT = "root";

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
     * Return the current model
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

    /**
     * Disposition
     * */
    MetaDataEditor.prototype.dispose = function () {

        return this._dispose();
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

        this.initialSection = this.initial.initialSection || ROOT;

        this.model = Converter.toValues({model: this.initial.model, lang: this.lang}) || {};

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

        this.nls = this.initial.nls || C.nls;
    };

    MetaDataEditor.prototype._attach = function () {

        this.$el.html(this.$template);

        log.info("[MDE] template attached successfully");

    };

    MetaDataEditor.prototype._render = function () {

        this._renderSection(this.config, ROOT);

        log.info("[MDE] render success");
    };

    MetaDataEditor.prototype._renderSections = function (sections, parent) {
        log.info("[MDE] Render sections:");
        log.info(sections);

        _.each(sections, _.bind(function (s, id) {
            this._renderSection(s, id, parent);
        }, this))
    };

    MetaDataEditor.prototype._renderSection = function (section, id, parent) {

        if (this.sections.hasOwnProperty(id)) {
            log.error("Duplicated section id found: " + id);
            return;
        }

        section.id = id;
        section.parent = parent;
        section.path = this.sections[parent] && Array.isArray(this.sections[parent].path) ? this.sections[parent].path.slice(0).concat(section.id) : [section.id];

        this.sections[id] = section;

        log.info("Render section [" + id + "] with parent [" + parent + "]");

        section.el = this._attachSectionContent(section, id, parent); //TODO pluggable

        section.index = this._attachSectionIndex(section, id, parent); //TODO pluggable

        if (typeof section.sections === 'object') {
            this._renderSections(section.sections, id !== ROOT ? id : null);
        } else {
            section.isLeaf = true;
        }
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

            s.filter = {};

            _.each(s.selectors, _.bind(function (c, id) {

                //extend the selector type
                s.mode = c.mode || "standard";

                this._getSelectorRender(s, _.bind(function (Selector) {

                    var selectors = {};
                    selectors[id] = c;

                    s.filter[id] = new Selector({
                        el: s.el.find("[data-role='selectors']").first(),
                        cache: this.cache,
                        environment: this.environment,
                        selectors: selectors,
                        values: this._getInitialValues(id),
                        lang: this.lang,
                        nls: this.nls,
                        id : this.id
                    }).on("ready", function () {
                        s.initialized = true;
                    });

                }, this));

            }, this));

        }

        if (id === ROOT) {
            log.warn("Abort sections rendering because section is root");
            return;
        }

        _.each(s.sections, _.bind(function (sec, id) {
            this._renderSelectors(sec, id)
        }, this));

    };

    MetaDataEditor.prototype._getInitialValues = function (id) {

        var result = {values: {}},
            found = false;

        if (this.model[id]) {
            result.values[id] = this.model[id];
            found = true;
        }

        return found ? result : undefined;
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
            this._renderSelectors(section, root);
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

    MetaDataEditor.prototype._unbindEventListeners = function () {

        this.$index.find("." + this.sectionIndexClassName).off();

        log.info("Events bind success");
    };

    // values

    MetaDataEditor.prototype._getValues = function () {

        var result = {
            values: {},
            labels: {},
            valid: true,
            errors: []
        };

        this._getRootValues(result);

        if (Array.isArray(result.errors) && result.errors.length === 0) {
            delete result.errors;
        }

        return result
    };

    MetaDataEditor.prototype._getRootValues = function (result) {

        var section = this.config,
            values = {};

        if (section.hasOwnProperty('filter')) {

            var filter = this._getSelectorsValues(section);
            result.values = filter.values;
            result.labels = filter.labels;
            result.valid = result.valid && filter.valid;

            if (Array.isArray(filter.error)) {
                result.error = result.error.concat(filter.error);
            }
        }

        if (typeof section.sections === 'object') {

            _.each(section.sections, _.bind(function (s) {
                this._getSectionValues(s, result);
            }, this));
        }

        return values;

    };

    MetaDataEditor.prototype._getSelectorsValues = function (section) {

        var values = {
            values: {},
            labels: {},
            valid: true
        };

        _.each(section.filter, _.bind(function (selector, id) {

            var val = selector.getValues();
            $.extend(true, values.values, val.values);
            $.extend(true, values.labels, val.labels);
            values.valid = val.valid && values.valid;

        }));

        return values

    };

    MetaDataEditor.prototype._getSectionValues = function (section, result) {

        var values = {};

        var path = section.path.join(".");

        if (section.hasOwnProperty('filter')) {

            var filter = this._getSelectorsValues(section);
            this._assign(result.values, path, filter.values);
            this._assign(result.labels, path, filter.labels);
            result.valid = result.valid && filter.valid;

            if (Array.isArray(filter.error)) {
                result.error = result.error.concat(filter.error);
            }
        }

        if (typeof section.sections === 'object') {

            _.each(section.sections, _.bind(function (s) {
                this._getSectionValues(s, result);
            }, this));
        }

        return values

    };

    // values formatter

    MetaDataEditor.prototype._format_plain = function (values) {

        return values;
    };

    MetaDataEditor.prototype._format_metadata = function (values) {

        return Converter.toMetadata({
            values: values,
            config: this.config
        });
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

    // disposition

    MetaDataEditor.prototype._dispose = function () {

        var root = this.sections[ROOT];

        if (root.filter && typeof root.filter === "function") {
            root.filter.dispose();
        }

        _.each(root.sections, _.bind(function (s) {
            this._disposeSection(s);
        }, this));

        this._unbindEventListeners();

        this.$el.empty();

        log.info("Metadata [" + this.id + "] disposed successfully");
        return this;
    };

    MetaDataEditor.prototype._disposeSection = function (section) {

        if (section.filter && typeof section.filter === "function") {
            section.filter.dispose();
        }

        _.each(section.sections, _.bind(function (s) {
            this._disposeSection(s);
        }, this));

        log.info("Section [" + section.id + "] disposed");

        return this;
    };

    // selectors plugin

    MetaDataEditor.prototype._getSelectorRender = function (s, callback) {

        return require([this._getSelectorScriptPath(s) + ".js"], callback);
    };

    MetaDataEditor.prototype._getSelectorScriptPath = function (s) {

        var name = s.mode || "standard",
            corePlugins = this.corePlugins,
            registeredSelectors = $.extend(true, {}, this.pluginRegistry),
            path,
            conf,
            isCore;

        isCore = _.contains(corePlugins, name);

        if (isCore) {
            return codePluginsFolder + name;
        }

        conf = registeredSelectors[name];

        if (!conf) {
            log.error('Registration not found for "' + name + ' selector".');
        }

        if (conf.path) {
            path = conf.path;
        } else {
            log.error('Impossible to find path configuration for "' + name + ' selector".');
        }

        return path;
    };

    return MetaDataEditor;
});
