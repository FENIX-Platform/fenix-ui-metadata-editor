define([
        'jquery',
        'fx-MetaEditor2/js/MetadataEditor2/translators/MetaAdapterBase'
    ],
    function ($, MetaAdapterBase) {
        //console.log("M_Content_Coverage_MDG")
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
            //console.log("convertUIToMeta: ",meta,lang);
            if (!meta)
                return null;
            if (!meta.content_Coverage)
                return null;
            var vals = meta.content_Coverage;
            //console.log("vals: ",vals);
            var toRet = {};


            if (    vals.prodStats || vals.foodStats || vals.tradeStats || vals.machStats ||
                vals.popStats || vals.priceStats || vals.valStats || vals.landStats ||
                vals.empStats || vals.waterStats || vals.liveStats || vals.natStats || vals.fishStats
            ) {
                var target = null;
                if (vals.prodStats) target = vals.prodStats;
                if (vals.foodStats) target = vals.foodStats;
                if (vals.tradeStats) target = vals.tradeStats;
                if (vals.machStats) target = vals.machStats;
                if (vals.popStats) target = vals.popStats;
                if (vals.priceStats) target = vals.priceStats;
                if (vals.valStats) target = vals.valStats;
                if (vals.landStats) target = vals.landStats;
                if (vals.empStats) target = vals.empStats;
                if (vals.waterStats) target = vals.waterStats;
                if (vals.liveStats) target = vals.liveStats;
                if (vals.natStats) target = vals.natStats;
                if (vals.fishStats) target = vals.fishStats;
                toRet.coverageSectors = {};
                toRet.coverageSectors.codes = [];
                toRet.coverageSectors.idCodeList = "CountrySTAT_Indicators";
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
            //console.log("toRet: ",toRet);
            return { meContent: { seCoverage: toRet } };
        };


        MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
            //console.log("convertMetaToUi");
            if (!meta || !meta.meContent || !meta.meContent.seCoverage) return null;
            var vals = meta.meContent.seCoverage;
            var toRet = {};
            var target = vals.coverageSectors;

            if (target && target.codes && target.codes.length > 0 && target.codes[0].code) {
                toRet.coverageSectors = {};
                var code = target.codes[0].code.substring(0,2);

                if (code == "01") {
                    toRet.prodStats = target.codes[0].code;
                    toRet.sector = "Production";
                }
                if (code == "02"){
                    toRet.foodStats = target.codes[0].code;
                    toRet.sector = "Food availability";
                }
                if (code == "03") {
                    toRet.tradeStats = target.codes[0].code;
                    toRet.sector = "Trade";
                }
                if (code == "04") {
                    toRet.machStats = target.codes[0].code;
                    toRet.sector = "Machinery";
                }
                if (code == "05"){
                    toRet.popStats = target.codes[0].code;
                    toRet.sector = "Population";
                }
                if (code == "06") {
                    toRet.priceStats = target.codes[0].code;
                    toRet.sector = "Prices";
                }
                if (code == "07") {
                    toRet.valStats = target.codes[0].code;
                    toRet.sector = "Value added";
                }
                if (code == "08"){
                    toRet.landStats = target.codes[0].code;
                    toRet.sector = "Land use";
                }
                if (code == "09") {
                    toRet.empStats = target.codes[0].code;
                    toRet.sector = "Employment";
                }
                if (code == "10") {
                    toRet.waterStats = target.codes[0].code;
                    toRet.sector = "Water";
                }
                if (code == "11") {
                    toRet.liveStats = target.codes[0].code;
                    toRet.sector = "Livestock";
                }
                if (code == "12"){
                    toRet.natStats = target.codes[0].code;
                    toRet.sector = "National account";
                }
                if (code == "13") {
                    toRet.fishStats = target.codes[0].code;
                    toRet.sector = "Fishery";
                }
            }


            if (vals.coverageTime) {
                toRet.coverageTime = {};
                this.copyDatesFromMeta(vals.coverageTime, toRet.coverageTime, ["from", "to"]);
            }

            if (vals.coverageGeographic) {
                toRet.coverageGeographic = this.codelistToCode(vals.coverageGeographic);
                // console.log(toRet.coverageGeographic)
            }

            this.copyVals(vals, toRet, toCopy);
            this.copyValsFromML(vals, toRet, toCopyML, lang);

            //console.log("toRet: ",toRet);
            return { content_Coverage: toRet };
        };
        return MetaAdapter;
    });