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
    var toCopyML = [];
    var toCopyDates = ["metadataLastCertified", "metadataLastPosted", "metadataLastUpdate"];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.maintenance_metadataMaintenance)
            return null;
        var vals = meta.maintenance_metadataMaintenance;
        var toRet = {};

        this.copyDatesToMeta(vals, toRet, toCopyDates);

        return { meMaintenance: { seMetadataMaintenance: toRet } };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meMaintenance || !meta.meMaintenance.seMetadataMaintenance)
            return null;
        var vals = meta.meMaintenance.seMetadataMaintenance;
        var toRet = {};

        this.copyDatesFromMeta(vals, toRet, toCopyDates);

        return { maintenance_metadataMaintenance: toRet };
    };

    return MetaAdapter;
});