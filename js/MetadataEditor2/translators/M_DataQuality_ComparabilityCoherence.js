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
    var toCopyML = ["comparabilityGeographical", "comparabilityTime", "coherenceIntern"];
    var toCopyDates = [];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.dataQuality_compatibilityCoherence)
            return null;
        var vals = meta.dataQuality_compatibilityCoherence;
        var toRet = {};

        this.copyValsToML(vals, toRet, toCopyML, lang);

        return { meDataQuality: { seComparability: toRet } };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meDataQuality || !meta.meDataQuality.seComparability)
            return null;
        var vals = meta.meDataQuality.seComparability;
        var toRet = {};
        this.copyValsFromML(vals, toRet, toCopyML, lang);

        return { dataQuality_compatibilityCoherence: toRet };
    };

    return MetaAdapter;
});