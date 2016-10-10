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
    var toCopyML = ["dataValidationIntermediate", "dataValidationOutput", "dataValidationSource"];
    var toCopyDates = [];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.statisticalProcessing_dataValidation)
            return null;
        var vals = meta.statisticalProcessing_dataValidation;
        var toRet = {};

        this.copyValsToML(vals, toRet, toCopyML, lang);

        return { meStatisticalProcessing: { seDataValidation: toRet } };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meStatisticalProcessing || !meta.meStatisticalProcessing.seDataValidation)
            return null;
        var vals = meta.meStatisticalProcessing.seDataValidation;
        var toRet = {};
        this.copyValsFromML(vals, toRet, toCopyML, lang);

        return { statisticalProcessing_dataValidation: toRet };
    };

    return MetaAdapter;
});