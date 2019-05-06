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
    '../html/sectionIndex.hbs',
    '../nls/titles',
    '../nls/descriptions',
    '../nls/errors',
    'fenix-ui-filter'
], function (log, $, _, Converter, ERR, EVT, C, FenixMetadata, template, sectionContent, sectionIndex, TitlesI18n, DescriptionsI18n, ErrorsI18n, Filter) {

    'use strict';

    var s = {
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

            if (this.affix) {
                this._initAffix();
            }

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
     * Set model
     */
    MetaDataEditor.prototype._setValues = function (model) {

        this.model = Converter.toValues({model: model, lang: this.lang}) || {};
        this._setValuesToSection(ROOT);
    };

    MetaDataEditor.prototype._setValuesToSection = function (s) {

        var section = this.sections[s],
            values = {};

        if (!section || !section.initialized) {
            console.log(s + " is not initialized. Abort set values");
            log.warn(s + " is not initialized. Abort set values");
            return;
        }

        if (section.hasOwnProperty('selectors')) {
            var values = this._getInitialValues(section.selectors, section);
            if (values) section.filter.setValues(values);
        }

        if (typeof section.sections === 'object') {
            _.each(section.sections, _.bind(function (sec, name) {
                this._setValuesToSection(name);
            }, this));
        }

        return values;

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

    MetaDataEditor.prototype._initAffix = function () {

        this.$index.affix({
            offset: {
                top: this.$index.offset().top
            }
        });
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
        this.serviceProvider = this.initial.serviceProvider;
        this.cache = this.initial.cache || C.cache;

        this.sections = {};

        this.channels = {};

        this.constraints = this.initial.constraints || C.constraints;
        this.validators = $.extend(true, {}, this.validators, this.initial.validators);

        this.lang = this.initial.lang || C.lang;
        this.titles = this.initial.titles || TitlesI18n[this.lang.toLowerCase()];
        this.descriptions = this.initial.descriptions || DescriptionsI18n[this.lang.toLowerCase()];
        this.errors = this.initial.errors || ErrorsI18n[this.lang.toLowerCase()];

        this.affix = this.initial.affix || C.affix;

        log.info("[MDE] variable init success");

    };

    MetaDataEditor.prototype._parseInput = function () {

        this.$template = $(this.initial.template || template());

        this.$template.attr("data-fenix", "metadata-editor");

        this.config = !_.isEmpty(this.initial.config) ? this.initial.config : FenixMetadata;

        this.nls = this.initial.nls || C.nls;
        this.converters = this.initial.converters || {};

    };

    MetaDataEditor.prototype._attach = function () {

        this.$el.html(this.$template);

        log.info("[MDE] template attached successfully");

    };

    MetaDataEditor.prototype._render = function () {

        this._renderSection($.extend(true, {}, this.config), ROOT);

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
        section.path =
            this.sections[parent] && Array.isArray(this.sections[parent].path) ?
                this.sections[parent].path.slice(0).concat(section.id) : [section.id];

        this.sections[id] = section;

        log.info("Render section [" + id + "] with parent [" + parent + "]");

        section.el = this._attachSectionContent(section, id, parent); //TODO pluggable

        section.index = this._attachSectionIndex(section, id, parent); //TODO pluggable

        if(!section.selectors) {
            section.initialized = true;
        } else {
            this._renderSelectors(section, section.id);
        }

        if (typeof section.sections === 'object') {
            this._renderSections(section.sections, id !== ROOT ? id : null);
        } else {
            section.isLeaf = true;
        }

    };

    MetaDataEditor.prototype._attachSectionContent = function (s, id, parent) {

        if (this.titles) s.title = this.titles[this._findMEPath(s)];
        if (this.descriptions) s.description = this.descriptions[this._findMEPath(s)];
        //if (this.errors)

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

    MetaDataEditor.prototype._findMEPath = function (element) {
        var identifier = "";
        if (element.path) identifier = element.path.join('.');
        return identifier;
    };

    MetaDataEditor.prototype._attachSectionIndex = function (s, id, parent) {

        if (this.titles) {
            s.title = this.titles[this._findMEPath(s)]
        }

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

    MetaDataEditor.prototype._renderSelectors = function (s, sectionId) {
        log.info("Render section's selectors: " + sectionId);
        log.info(s);

        if (!s.selectors) {
            log.warn("Abort because section does not contains any selectors: " + sectionId);
        } else {

            s.filter = {};

            var selectors = {},
                filter;

            _.each(s.selectors, _.bind(function (c, id) {

                //extend the selector type
                s.mode = c.mode || "standard";

                selectors[id] = c;

                if (c.constraints) {
                    _.each(c.constraints, _.bind(function (idx, item) {
                        var opt = { "message" : ErrorsI18n[this.lang.toLowerCase()][item] };
                        if (ErrorsI18n[this.lang.toLowerCase()][item]) c.constraints[item] = opt;
                    }, this));
                }

                if (!selectors[id]['template'])  selectors[id]['template'] = {};

                $.extend(true, selectors[id].template, {
                    title: selectors[id].template.title ? selectors[id].template.title : this.titles[this._findMEPath(s) + "." + id],
                    description: selectors[id].template.description ? selectors[id].template.description : this.descriptions[this._findMEPath(s) + "." + id]
                });

                if (selectors[id].hasOwnProperty("selectors")) {

                    _.each(selectors[id].selectors, _.bind(function (sec, x) {
                        if (!sec.template) sec.template = {};

                        if (sec.constraints) {
                            _.each(sec.constraints, _.bind(function (idx, item) {
                                var opt = { "message" : ErrorsI18n[this.lang.toLowerCase()][item] };
                                if (ErrorsI18n[this.lang.toLowerCase()][item]) sec.constraints[item] = opt;
                            }, this));
                        }

                        $.extend(true, sec.template, {
                            title: sec.template.title ? sec.template.title : this.titles[this._findMEPath(s) + "." + id + "." + x],
                            description: sec.template.description ? sec.template.description : this.descriptions[this._findMEPath(s) + "." + id + "." + x]
                        });

                    }, this))

                }

            }, this));

            filter = new Filter({
                el: s.el.find("[data-role='selectors']").first(),
                cache: this.cache,
                environment: this.environment,
                serviceProvider: this.serviceProvider,
                selectors: selectors,
                values: this._getInitialValues(selectors, s),
                lang: this.lang,
                nls: this.nls,
                id: this.id
            });

            filter.on("ready", function () {
                s.initialized = true;
            });

            filter.on("click", _.bind(function (payload) {
                this._trigger("change", payload, s);
            }, this));

            s.filter = filter;

        }

    };

    MetaDataEditor.prototype._getInitialValues = function (selectors, s) {

        var result = {values: {}},
            found = false,
            path;

        _.each(selectors, _.bind(function (value, id) {

            var cleanPath = _.without(s.path || [], ROOT);
            cleanPath.push(id);

            path = cleanPath.join(".");

            var value = this.getNestedProperty(path, this.model);

            if (value) {
                result.values[id] = value;
                found = true;
            }


        }, this));

        return found ? result : undefined;
    };

    MetaDataEditor.prototype._showInitialSection = function () {

        log.info("Show initial section");

        return this._showSection(this.initialSection);
    };

    MetaDataEditor.prototype._showSection = function (id) {
        log.info("Show section: " + id);

        var section = this.sections[id] || {},
            root,
            rootSection;

        if (!section) {
            log.warn("Impossible to find section " + id);
            return;
        }

        root = section.path[0];
        rootSection = this.sections[root];

        if (this.currentSection === root) {
            //Scroll to the clicked section
            var aTag = this.$content.find("[data-section='" + id + "']");
            $('html,body').animate({scrollTop: aTag.offset().top},'slow');
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

        //Scroll to the clicked section
        var aTag = this.$content.find("[data-section='" + id + "']");
        $('html,body').animate({scrollTop: aTag.offset().top},'slow');
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
            errors: {},
            valid: true
        };

        this._untagSectionsWithErrors();
        this._getRootValues(result);

        if (result.valid === true) {
            //validate result but return it in any case
            var s = this._validateValues(result);
            return s;
        } else {
            this._tagSectionsWithErrors(result.errors);
            return result;
        }


    };

    MetaDataEditor.prototype._validateValues = function (s) {

        var values = process($.extend(true, {}, s.values)),
            errors = {};

        log.info("Selection constraints:");
        log.info(this.constraints);
        log.info("applied to:");
        log.info(values);

        _.each(this.constraints, _.bind(function (obj, key) {

            _.each(obj, _.bind(function (params, fn) {

                var validator = this.validators[fn],
                    valid;

                if (!$.isFunction(validator)) {
                    log.error("'" + fn + "' is not a valid validator. In order to use it, please add it to configuration.");
                    $.extend(true, errors[key], ["Unknown validator " + fn]);
                    return;
                }

                valid = validator.call(this, this.getNestedProperty(key, values), values, params, key);

                if (valid !== true) {
                    errors[key] = valid;
                }

            }, this));

        }, this));

        s.valid = s.valid && Object.keys(errors).length === 0;

        $.extend(true, s.errors, errors);

        return s;

        function process(v) {

            var cleaned = {};

            _.each(v, function (obj, key) {
                cleaned[key] = Array.isArray(obj) ? cleanArray(obj) : cleanObject(obj);
            });

            return cleaned;

            function cleanArray(actual) {

                var newArray = [];
                for (var i = 0; i < actual.length; i++) {
                    if (actual[i] && actual[i] !== "") {

                        newArray.push(actual[i]);
                    }
                }
                return newArray;
            }

            function cleanObject(actual) {
                var newObj = {};
                _.each(actual, function (value, key) {
                    newObj[key] = cleanArray(value);
                });
                return newObj;
            }
        }

    };

    MetaDataEditor.prototype._tagSectionsWithErrors = function (errors) {

        _.each(errors, _.bind(function (value, path) {

            var split = path.split(".") || [],
                parents;

            split.pop();

            parents = split.slice(0, split.length - 1);

            _.each(parents, _.bind(function (p) {
                this.$index.find("[data-section='" + p + "']").addClass(C.hasErrorParentClassName)
            }, this));


            this.$index.find("[data-section='" + split[split.length - 1] + "']").addClass(C.hasErrorClassName)

        }, this));

    };

    MetaDataEditor.prototype._untagSectionsWithErrors = function () {

        this.$index.find("[data-section]").removeClass(C.hasErrorClassName);
        this.$index.find("[data-section]").removeClass(C.hasErrorParentClassName);
    };

    MetaDataEditor.prototype._getRootValues = function (result) {

        var section = this.sections[ROOT],
            values = {};

        if (section.hasOwnProperty('filter')) {

            var filter = this._getSelectorsValues(section);
            result.values = filter.values;
            result.labels = filter.labels;
            result.valid = result.valid && filter.valid;
            _.each(filter.errors, function (value, key) {
                result.errors[ROOT + "." + key] = value
            });
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
            errors: {},
            valid: true
        };

        var val = section.filter.getValues();
        $.extend(true, values.values, val.values);
        $.extend(true, values.labels, val.labels);
        values.valid = val.valid && values.valid;
        $.extend(true, values.errors, val.errors);

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
            _.each(filter.errors, function (value, key) {
                result.errors[section.path.join(".") + "." + key] = value
            });

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

        if (values.valid !== true) {
            return {
                valid: false,
                errors: values.errors
            }
        }

        return Converter.toMetadata({
            values: values,
            config: this.config,
            converters : this.converters
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

    MetaDataEditor.prototype.getNestedProperty = function (path, obj) {

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

    return MetaDataEditor;
});
