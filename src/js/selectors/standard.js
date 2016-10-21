define([
    'loglevel',
    'jquery',
    'underscore',
    '../../config/errors',
    '../../config/events',
    '../../config/config',
    'fenix-ui-filter'
], function (log, $, _, ERR, EVT, C, Filter) {

    'use strict';

    function Standard( obj ) {

        $.extend(true, this, C, {initial: obj || {}, $el: $(obj.el)});

        this.channels = {};

        this.filter = new Filter({
            el : this.$el,
            cache: this.initial.cache,
            environment: this.initial.environment,
            values : this.initial.values,
            selectors: this.initial.selectors,
            lang : this.lang
        }).on("ready", _.bind(function () {
            this._trigger("ready");
        }, this));

        return this;
    }

    /**
     * pub/sub
     * @return {Object} component instance
     */
    Standard.prototype.on = function (channel, fn, context) {
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
    Standard.prototype.getValues = function(format) {

        return this.filter.getValues(format);
    };

    /**
     * set selector values
     * @return {Object} values
     */
    Standard.prototype.setValues = function(values) {

        return this.filter.setValues(values);
    };

    /**
     * disposition
     * @return {Object}
     */
    Standard.prototype.dispose = function() {

        return this.filter.dispose();

    };

    Standard.prototype._trigger = function (channel) {

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

    return Standard;

});