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
    var toCopyML = ["revisionPolicy", "revisionPractice"];
    var toCopyDates = [];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.dataQuality_dataRevision)
            return null;
        var vals = meta.dataQuality_dataRevision;
        var toRet = {};

        this.copyValsToML(vals, toRet, toCopyML, lang);

        return { meDataQuality: { seDataRevision: toRet } };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meDataQuality || !meta.meDataQuality.seDataRevision)
            return null;
        var vals = meta.meDataQuality.seDataRevision;
        var toRet = {};
        this.copyValsFromML(vals, toRet, toCopyML, lang);

        return { dataQuality_dataRevision: toRet };
    };
    
    return MetaAdapter;
});