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
    var toCopyDates = ["updateDate"];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.maintenance_update)
            return null;
        var vals = meta.maintenance_update;
        var toRet = {};

        toRet.updatePeriodicity = this.codeToCodelist(vals.updatePeriodicity, this.clists.faoPeriod.id, this.clists.faoPeriod.v);
        this.copyDatesToMeta(vals, toRet, toCopyDates);

        return { meMaintenance: { seUpdate: toRet } };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meMaintenance || !meta.meMaintenance.seUpdate)
            return null;
        var vals = meta.meMaintenance.seUpdate;
        var toRet = {};

        toRet.updatePeriodicity = this.codelistToCode(vals.updatePeriodicity);
        this.copyDatesFromMeta(vals, toRet, toCopyDates);

        return { maintenance_update: toRet };
    };

    return MetaAdapter;
});