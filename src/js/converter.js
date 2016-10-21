define([
    'loglevel',
    'jquery',
    'underscore'
], function (log, $, _) {

    'use strict';

    var lang = "EN",
        langs = ["EN", "FR", "ES", "PR", "AR", "RU", "CZ"];

    function Converter() {
        log.info("FENIX Metadata Converter:");

        return this;
    }

    // Extract values from FENIX metadata in FENIX plain format

    Converter.prototype.toValues = function (obj) {
        log.info("Convert FENIX metadata to Questionnaire values: start");

        var result = {},
            config = obj || {},
            model = config.model || {},
            metadata = model.metadata || model;

        this.lang = config.lang || lang;

        var valid = this._isValidMetadata(metadata);

        if (valid === true) {
            log.info("Valid model");

            var cleaned = this._cleanMetadata(metadata);

            this._processObject(cleaned, result);

            log.info("Convert FENIX metadata to Questionnaire configuration: finish");

            return result;

        } else {

            this.valid = false;

            log.error("Impossible to create MDE");
            log.error(JSON.stringify(valid))
        }
    };

    Converter.prototype._isValidMetadata = function (metadata) {

        var valid = true,
            errors = [];

        if (!metadata) {
            errors.push({code: "empty_metadata"});
            log.warn("Resource metadata is empty");
        }

        return errors.length > 0 ? errors : valid;
    };

    Converter.prototype._cleanMetadata = function (model) {

        //enumerate the attributes to omit
        var forbidden = ["dsd"],
            result = _.omit(model, forbidden);


        return result;

    };

    Converter.prototype._processObject = function (obj, result, path) {

        _.each(obj, _.bind(function (v, k) {

            var key = path ? path.concat(".").concat(k) : k,
                value = this._getValue(v);

            if (value) {
                this._assign(result, key, value)
            } else {
                this._processObject(v, result, key);
            }

        }, this));

    };

    Converter.prototype._getValue = function (obj) {

        var value = obj || {};

        if (typeof value === "string" || typeof value === "number") {
            return [value];
        }

        if (Array.isArray(obj) && obj.every(function (i) {
                return typeof i === "string";
            })) {
            return obj;
        }

        if (typeof value === "object") {

            //check if label
            var keys = Object.keys(value),
                isLabel = false,
                isCode = value.idCodeList && Array.isArray(value.codes),
                label = "";

            _.each(langs, _.bind(function (l) {
                isLabel = isLabel || _.contains(keys, l);
                if (l === this.lang) {
                    label = value[l];
                }
            }, this));

            if (isLabel) {
                label = label ? label : value[keys[0]];
                return label ? [label] : undefined;
            }

            if (isCode) {
                return value.codes.map(function (v) {
                    return v.code
                })
            }

        }

        return false;
    };

    // Convert FENIX plain format to FENIX metadata

    Converter.prototype.toMetadata = function (obj) {
        log.info("Convert Questionnaire values to FENIX metadata: start");

        var result = {},
            c = obj || {},
            config = c.config || {},
            values = c.values,
            valid;

        this.lang = config.lang || lang;

        //check valid values
        valid = this._isValidValues(values);

        if (!valid) {
            log.error("Invalid values");
            log.error(valid);
            return
        }

        valid = this._isValidConfig(config);

        if (!valid) {
            log.error("Invalid questionnaire configuration");
            log.error(valid);
            return
        }

        //get root values
        if (typeof config.selectors === 'object') {
            this._processSelectors(config.selectors, values, result);
        }

        if (typeof config.sections === 'object') {
            this._processSections(config.sections, values, result);
        }

        log.info("Convert Questionnaire values to FENIX metadata: sucess");

        return result;
    };

    Converter.prototype._isValidValues = function (values) {

        var valid = true,
            errors = [];

        if (!values.hasOwnProperty("values")) {
            errors.push({code: "missing_values"});
            log.warn("Impossible to find metadata");
        }

        return errors.length > 0 ? errors : valid;
    };

    Converter.prototype._isValidConfig = function (config) {

        var valid = true,
            errors = [];

        if (typeof config !== "object") {
            errors.push({code: "configuration_is_not_object"});
            log.warn("Questionnaire configuration is not an object");
        }

        return errors.length > 0 ? errors : valid;
    };

    Converter.prototype._isValidValues = function (config) {

        var valid = true,
            errors = [];

        if (!config.valid) {
            errors.push({code: "invalid_values"});
            log.warn("Values are invalid");
        }

        if (!config.hasOwnProperty("values")) {
            errors.push({code: "missing_values"});
            log.warn("Impossible to find metadata");
        }

        return errors.length > 0 ? errors : valid;
    };

    Converter.prototype._processSections = function (sections, values, result, p) {

        _.each(sections, _.bind(function (sec, id) {

            var path = p ? p.concat(".").concat(id) : id;

            if (typeof sec.selectors === 'object') {
                this._processSelectors(sec.selectors, values, result, path);
            }

            if (typeof sec.sections === 'object') {
                this._processSections(sec.sections, values, result, path);
            }

        }, this));
    };

    Converter.prototype._processSelectors = function (selectors, values, result, path) {

        _.each(selectors, _.bind(function (sel, id) {

            var format = sel.format || {},
                output = format.output || "",
                key = path ? path.concat(".").concat(id) : id,
                value = this._getNestedProperty(key, values.values),
                label = this._getNestedProperty(key, values.labels),
                c;

            if (!value || (Array.isArray(value) && value.length === 0)) {
                log.warn(key + " has not value");
                return;
            }

            switch (output.toLowerCase()) {

                case "label" :
                    c = {};
                    c[this.lang] = value[0];
                    this._assign(result, key, c);
                    break;

                case "string" :
                    this._assign(result, key, Array.isArray(value) && value[0] ? value[0] : undefined);
                    break;

                case "date" :
                    console.log(value);
                    log.error("Date format to be implemented");
                    break;

                case "period" :
                    console.log(value)
                    log.error("period format to be implemented");
                    break;

                case "array<string>" :

                    this._assign(result, key, c ? [c] : undefined);

                    break;

                case "codes" :

                    c = {};

                    var cl = sel.cl || {},
                        idCodelist = cl.uid || format.uid,
                        version = cl.version || format.version,
                        codes = [];

                    if (!idCodelist) {
                        log.error("Impossible to find codelist uid configuration for selector: " + id);
                        return;
                    }

                    c.idCodelist = idCodelist;
                    c.version = version;

                    _.each(value, function (v) {
                        codes.push({code: v});
                    });

                    c.codes = codes;

                    this._assign(result, key, c);
                    break;

                default :
                    log.error("'" + id + "' in '" + key + "' has not a valid format configuration. Please check questionnaire configuration");
            }

        }, this));

    };

    // utils

    Converter.prototype._assign = function (obj, prop, value) {
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

    Converter.prototype._getNestedProperty = function (path, obj) {

        var obj = $.extend(true, {}, obj),
            arr = path.split(".");

        while (arr.length && (obj = obj[arr.shift()]));

        return obj;

    };

    return new Converter();
});
