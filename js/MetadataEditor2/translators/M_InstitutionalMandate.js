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
    var toCopyDates = [];
    var toCopyML = ["legalActsAgreements", "institutionalMandateDataSharing"];

    MetaAdapter.prototype.convertUIToMeta = function (uiVals, lang) {
        if (!uiVals.institutionalMandate)
            return null;
        var toRet = {};
        var vals = uiVals.institutionalMandate;
        this.copyValsToML(vals, toRet, toCopyML, lang);
        return { meInstitutionalMandate: toRet };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        var toRet = {};
        var vals = meta.meInstitutionalMandate;
        this.copyValsFromML(vals, toRet, toCopyML, lang);

        return { institutionalMandate: toRet };
    };

    return MetaAdapter;
});