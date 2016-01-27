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

    var toCopy = ["onlineResource"];
    var toCopyML = [];
    var toCopyDates = [];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.accessibility_dataDissemination_distribution)
            return null;
        var vals = meta.accessibility_dataDissemination_distribution;
        var toRet = {};

        if (vals.disseminationFormat && vals.disseminationFormat.length > 0) {
            toRet.disseminationFormat = [];
            for (var i = 0; i < vals.disseminationFormat.length; i++) {
                toRet.disseminationFormat.push(vals.disseminationFormat[i]);
            }
        }
        this.copyVals(vals, toRet, toCopy);

        return { meAccessibility: { seDataDissemination: { seDistribution: toRet } } };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meAccessibility || !meta.meAccessibility.seDataDissemination || !meta.meAccessibility.seDataDissemination.seDistribution)
            return null;
        var vals = meta.meAccessibility.seDataDissemination.seDistribution;
        var toRet = {};

        if (vals.disseminationFormat && vals.disseminationFormat.length > 0) {
            toRet.disseminationFormat = [];
            for (var i = 0; i < vals.disseminationFormat.length; i++) {
                toRet.disseminationFormat.push(vals.disseminationFormat[i]);
            }
        }
        this.copyVals(vals, toRet, toCopy);

        return { accessibility_dataDissemination_distribution: toRet };
    };

    return MetaAdapter;
});