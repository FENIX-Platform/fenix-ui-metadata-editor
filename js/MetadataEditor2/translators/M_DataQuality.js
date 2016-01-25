define([
        'jquery',
        'fx-MetaEditor2/js/MetadataEditor2/translators/MetaAdapterBase'
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
    var toCopyML = ["qualityManagement", "qualityAssessment", "qualityAssurance"];
    var toCopyDates = [];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.dataQuality)
            return null;
        var vals = meta.dataQuality;
        var toRet = {};

        this.copyValsToML(vals, toRet, toCopyML, lang);

        return { meDataQuality: toRet };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meDataQuality)
            return null;
        var vals = meta.meDataQuality;
        var toRet = {};
        this.copyValsFromML(vals, toRet, toCopyML, lang);

        return { dataQuality: toRet };
    };

    /*
    MetaAdapter.prototype.UIToMeta = function (uiVals) {
        var toRet = { meDataQuality: uiVals };
        return toRet;
    };
    */
    return MetaAdapter;
});