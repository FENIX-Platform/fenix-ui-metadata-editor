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

    var toCopy = ["completenessPercentage"];
    var toCopyML = ["userNeeds", "userSatisfaction", "completeness"];
    var toCopyDates = [];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.dataQuality_relevance)
            return null;
        var vals = meta.dataQuality_relevance;
        var toRet = {};

        this.copyVals(vals, toRet, toCopy);
        this.copyValsToML(vals, toRet, toCopyML, lang);

        return { meDataQuality: { seRelevance: toRet } };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meDataQuality || !meta.meDataQuality.seRelevance)
            return null;
        var vals = meta.meDataQuality.seRelevance;
        var toRet = {};
        this.copyValsFromML(vals, toRet, toCopyML, lang);
        this.copyVals(vals, toRet, toCopy);

        return { dataQuality_relevance: toRet };
    };

    return MetaAdapter;
});