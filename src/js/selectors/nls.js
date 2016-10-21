define([
    'loglevel',
    'jquery',
    'underscore',
    '../../config/errors',
    '../../config/events',
    '../../config/config',
    '../../html/selectors/nls.hbs',
    'fenix-ui-filter'
], function (log, $, _, ERR, EVT, C, template, Filter) {

    'use strict';

    function Nls(obj) {

        $.extend(true, this, C, {initial: obj || {}, $el: $(obj.el)});

        this._initVariables();

        this._attach();

        this._renderFilter();

        this._activateCurrentLang();

        return this;
    }

    /**
     * pub/sub
     * @return {Object} component instance
     */
    Nls.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    /**
     * get selector values
     * @return {Object} values
     */
    Nls.prototype.getValues = function (format) {

        var filter = this.filter.getValues(format),
            values = {},
            labels = {},
            result = {};

        values[this.selectorId] = {};
        labels[this.selectorId] = {};

        _.each(this.nls, _.bind(function (l) {
            values[this.selectorId][l] = filter.values[this.selectorId + "_" + l];
            labels[this.selectorId][l] = filter.labels[this.selectorId + "_" + l];
        }, this));

        result.values = values;
        result.labels = labels;
        result.valid = filter.valid;

        return result;
    };

    /**
     * set selector values
     * @return {Object} values
     */
    Nls.prototype.setValues = function (values) {

        return this.filter.setValues(values);
    };

    /**
     * disposition
     * @return {Object}
     */
    Nls.prototype.dispose = function () {

        return this.filter.dispose();
    };

    Nls.prototype._initVariables = function () {

        this.channels = {};

        this.cache = this.initial.cache;
        this.environment = this.initial.environment;
        this.values = this.initial.values;
        this.selectors = this.initial.selectors;
        this.selectorId = Object.keys(this.initial.selectors)[0];
        this.lang = this.initial.lang;
        this.nls = this.initial.nls;

        //set filter id
        if (!this.id) {
            window.fx_mde_nls_id >= 0 ? window.fx_mde_nls_id++ : window.fx_mde_nls_id = 0;
            this.id = this.initial.id.concat("-").concat(String(window.fx_mde_nls_id));
            log.info("Set MDE id: " + this.id);
        }

    };

    Nls.prototype._attach = function () {

        this.$el.append(template({
            nls: this.nls,
            id: this.id,
            selector: this.selectorId
        }));
    };

    Nls.prototype._renderFilter = function () {

        this.filter = new Filter({
            el: this.$el,
            cache: this.cache,
            environment: this.environment,
            values: this.values,
            selectors: this._getSelectors(),
            lang: this.lang
        }).on("ready", _.bind(function () {
            this._trigger("ready");
        }, this));
    };

    Nls.prototype._getSelectors = function () {

        var result = {},
            selector = this.selectors;

        _.each(this.nls, _.bind(function (l) {
            result[this.selectorId + "_" + l] = selector[this.selectorId];
        }, this));

        return result;
    };

    Nls.prototype._activateCurrentLang = function () {

        this.$el.find('[data-lang="' + this.lang + '"]').tab('show');

        log.info("Lang shown: " + this.lang);
    };

    Nls.prototype._trigger = function (channel) {

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

    return Nls;

});