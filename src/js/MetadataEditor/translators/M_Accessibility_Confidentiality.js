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

    var toCopy = [];
    var toCopyML = ["confidentialityPolicy", "confidentialityDataTreatment"];
    var toCopyDates = [];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.accessibility_confidentiality)
            return null;
        var vals = meta.accessibility_confidentiality;
        var toRet = {};

        //CL confidentialityStatus  CL_CONF_STATUS  1.0
        toRet.confidentialityStatus = this.codeToCodelist(vals.confidentialityStatus, this.clists.confidentialityStatus.id, this.clists.confidentialityStatus.v);

        this.copyValsToML(vals, toRet, toCopyML, lang);

        return { meAccessibility: { seConfidentiality: toRet } };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meAccessibility || !meta.meAccessibility.seConfidentiality)
            return null;
        var vals = meta.meAccessibility.seConfidentiality;
        var toRet = {};
        
        toRet.confidentialityStatus = this.codelistToCode(vals.confidentialityStatus);

        this.copyValsFromML(vals, toRet, toCopyML, lang);

        return { accessibility_confidentiality: toRet };
    };
    
    return MetaAdapter;
});