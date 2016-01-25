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
    var toCopyML = ["maintenanceAgency"];
    var toCopyDates = [];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.maintenance)
            return null;
        var vals = meta.maintenance;
        var toRet = {};

        this.copyValsToML(vals, toRet, toCopyML, lang);

        return { meMaintenance: toRet };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meMaintenance)
            return null;
        var vals = meta.meMaintenance;
        var toRet = {};

        this.copyValsFromML(vals, toRet, toCopyML, lang);

        return { maintenance: toRet };
    };

    return MetaAdapter;
});