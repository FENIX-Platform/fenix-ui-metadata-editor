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
    var toCopyML = ["organization", "dataCollection", "rawDataDescription"];
    var toCopyDates = [];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.statisticalProcessing_secondaryDataCollection)
            return null;
        var vals = meta.statisticalProcessing_secondaryDataCollection;
        var toRet = {};

        toRet.originOfCollectedData = this.codeToCodelist(vals.originOfCollectedData, this.clists.faoStatOriginData.id, this.clists.faoStatOriginData.v);

        this.copyValsToML(vals, toRet, toCopyML, lang);

        return { meStatisticalProcessing: { seDataSource: { seSecondaryDataCollection: toRet } } };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meStatisticalProcessing || !meta.meStatisticalProcessing.seDataSource || !meta.meStatisticalProcessing.seDataSource.seSecondaryDataCollection)
            return null;
        var vals = meta.meStatisticalProcessing.seDataSource.seSecondaryDataCollection;
        var toRet = {};
        toRet.originOfCollectedData = this.codelistToCode(vals.originOfCollectedData);
        this.copyValsFromML(vals, toRet, toCopyML, lang);

        return { statisticalProcessing_secondaryDataCollection: toRet };
    };

    return MetaAdapter;
});