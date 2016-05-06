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



    // "sector", "demoStats", "ecoStats", "envStats" ?????
    var toCopy = [];
    var toCopyML = ["coverageSectorsDetails"];


    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.content_Coverage)
            return null;
        var vals = meta.content_Coverage;

        var toRet = {};

        if (vals.demoStats || vals.envStats || vals.ecoStats) {
            var target = null;
            if (vals.demoStats) target = vals.demoStats;
            if (vals.envStats) target = vals.envStats;
            if (vals.ecoStats) target = vals.ecoStats;
            toRet.coverageSectors = {};
            toRet.coverageSectors.codes = [];
            var topush = {"code":target};
            toRet.coverageSectors.codes.push(topush);
        }

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
        if (!meta || !meta.meContent || !meta.meContent.seCoverage) return null;
        var vals = meta.meContent.seCoverage;
        var toRet = {};
        var target = vals.coverageSectors;

        if (target && target.codes && target.codes.length > 0 && target.codes[0].code) {
            toRet.coverageSectors = {};
            var code = target.codes[0].code.substring(0,2);

            if (code == "01") {
                toRet.demoStats = target.codes[0].code;
                toRet.sector = "Demographic and social statistics";
            }
            if (code == "02"){
                toRet.ecoStats = target.codes[0].code;
                toRet.sector = "Economic statistics";
            }
            if (code == "03") {
                toRet.envStats = target.codes[0].code;
                toRet.sector = "Environment and multi-domain statistics";
            }
        }


        if (vals.coverageTime) {
            toRet.coverageTime = {};
            this.copyDatesFromMeta(vals.coverageTime, toRet.coverageTime, ["from", "to"]);
        }

        if (vals.coverageGeographic)toRet.coverageGeographic = this.codelistToCode(vals.coverageGeographic);

        this.copyVals(vals, toRet, toCopy);
        this.copyValsFromML(vals, toRet, toCopyML, lang);
        return { content_coverage: toRet };
    };
    return MetaAdapter;
});