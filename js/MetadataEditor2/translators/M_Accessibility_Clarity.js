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

    var toCopy = ["metadataCompletenessRate"];
    var toCopyML = ["clarity"];
    var toCopyDates = [];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.accessibility_clarity)
            return null;
        var vals = meta.accessibility_clarity;
        var toRet = {};

        this.copyVals(vals, toRet, toCopy);
        this.copyValsToML(vals, toRet, toCopyML, lang);

        return { meAccessibility: { seClarity: toRet  } };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meAccessibility || !meta.meAccessibility.seClarity)
            return null;
        var vals = meta.meAccessibility.seClarity;
        var toRet = {};

        this.copyVals(vals, toRet, toCopy);
        this.copyValsFromML(vals, toRet, toCopyML, lang);

        return { accessibility_clarity: toRet };
    };

    return MetaAdapter;
});