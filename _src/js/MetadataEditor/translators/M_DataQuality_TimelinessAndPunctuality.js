define([
        'jquery',
        './MetaAdapterBase'
],
function ($, MetaAdapterBase) {
    var defConfig = {
    };

    var MetaAdapter = function (config) {
        this.parent.constructor.call(this, config);
        $.extend(true, this.config, defConfig);
    };
    MetaAdapter.prototype = Object.create(MetaAdapterBase.prototype);
    MetaAdapter.prototype.constructor = MetaAdapter;
    MetaAdapter.prototype.parent = MetaAdapterBase.prototype;

    var toCopy = [];
    var toCopyML = ["timeliness", "punctuality"];
    var toCopyDates = [];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.dataQuality_timelinessAndPunctuality)
            return null;
        var vals = meta.dataQuality_timelinessAndPunctuality;
        var toRet = {};

        this.copyValsToML(vals, toRet, toCopyML, lang);

        return { meDataQuality: { seTimelinessPunctuality: toRet } };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meDataQuality || !meta.meDataQuality.seTimelinessPunctuality)
            return null;
        var vals = meta.meDataQuality.seTimelinessPunctuality;
        var toRet = {};
        this.copyValsFromML(vals, toRet, toCopyML, lang);

        return { dataQuality_timelinessAndPunctuality: toRet };
    };

    return MetaAdapter;
});