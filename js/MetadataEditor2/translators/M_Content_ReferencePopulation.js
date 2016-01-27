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
    var toCopyML = ["statisticalPopulation", "statisticalUnit"];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.content_referencePopulation)
            return null;
        var vals = meta.content_referencePopulation;
        var toRet = {};

        toRet.referencePeriod = this.codeToCodelist(vals.referencePeriod, this.clists.faoPeriod.id, this.clists.faoPeriod.v);
        toRet.referenceArea = this.codeToCodelist(vals.referenceArea, this.clists.gaulReferenceArea.id, this.clists.gaulReferenceArea.v);

        this.copyValsToML(vals, toRet, toCopyML, lang);

        return { meContent: { seReferencePopulation: toRet } };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meContent || !meta.meContent.seReferencePopulation)
            return null;
        var vals = meta.meContent.seReferencePopulation;
        var toRet = {};

        toRet.referencePeriod = this.codelistToCode(vals.referencePeriod);
        toRet.referenceArea = this.codelistToCode(vals.referenceArea);

        this.copyValsFromML(vals, toRet, toCopyML, lang);

        return { content_referencePopulation: toRet };
    };

    return MetaAdapter;
});