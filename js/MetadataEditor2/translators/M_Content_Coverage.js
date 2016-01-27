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


    //"sector", "demoStats", "ecoStats", "envStats" ?????
    var toCopy = [];
    var toCopyML = ["coverageSectorsDetails"];


    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.content_coverage)
            return null;
        var vals = meta.content_coverage;
        var toRet = {};

        if (vals.coverageTime) {
            toRet.coverageTime = {};
            this.copyDatesToMeta(vals.coverageTime, toRet.coverageTime, ["from", "to"]);
        }

        if (vals.coverageGeographic)
            toRet.coverageGeographic = this.codeToCodelist(vals.coverageGeographic, this.clists.gaul0.id, this.clists.gaul0.v);

        this.copyVals(vals, toRet, toCopy);
        this.copyValsToML(vals, toRet, toCopyML, lang);

        return { meContent: { seCoverage: toRet } };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meContent || !meta.meContent.seCoverage)
            return null;
        var vals = meta.meContent.seCoverage;
        var toRet = {};

        if (vals.coverageTime) {
            toRet.coverageTime = {};
            this.copyDatesFromMeta(vals.coverageTime, toRet.coverageTime, ["from", "to"]);
        }

        if (vals.coverageGeographic)
            toRet.coverageGeographic = this.codelistToCode(vals.coverageGeographic);

        this.copyVals(vals, toRet, toCopy);
        this.copyValsFromML(vals, toRet, toCopyML, lang);

        return { content_coverage: toRet };
    };
    return MetaAdapter;
});