define([
        'jquery',
        'fx-MetaEditor/js/MetadataEditor/translators/MetaAdapterBase'
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


    var toCopy = ["aggregationFormula"];
    var toCopyML = ["missingData", "weights", "aggregationProcessing", "dataAdjustmentDetails", "indexType"];
    var toCopyDates = ["basePeriod"];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.statisticalProcessing_dataCompilation)
            return null;
        var vals = meta.statisticalProcessing_dataCompilation;
        var toRet = {};

        toRet.dataAdjustment = this.codeToCodelist(vals.dataAdjustment, this.clists.clAdjustment.id, this.clists.clAdjustment.v);

        this.copyVals(vals, toRet, toCopy, lang);
        this.copyValsToML(vals, toRet, toCopyML, lang);
        this.copyDatesToMeta(vals, toRet, toCopyDates);

        return { meStatisticalProcessing: { seDataCompilation: toRet } };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meStatisticalProcessing || !meta.meStatisticalProcessing.seDataCompilation)
            return null;
        var vals = meta.meStatisticalProcessing.seDataCompilation;
        var toRet = {};
        toRet.dataAdjustment = this.codelistToCode(vals.dataAdjustment);

        this.copyVals(vals, toRet, toCopy, lang);
        this.copyValsFromML(vals, toRet, toCopyML, lang);
        this.copyDatesFromMeta(meta, toRet.identification, toCopyDates);

        return { statisticalProcessing_dataCompilation: toRet };
    };

    return MetaAdapter;
});