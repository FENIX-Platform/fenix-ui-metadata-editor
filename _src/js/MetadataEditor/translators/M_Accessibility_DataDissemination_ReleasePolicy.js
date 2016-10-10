define([
        'jquery',
        './MetaAdapterBase'
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


    var toCopy = ["releaseCalendarAccess"];
    var toCopyML = ["releaseCalendar"];
    var toCopyDates = ["from", "to"];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.accessibility_dataDissemination_releasePolicy)
            return null;
        var vals = meta.accessibility_dataDissemination_releasePolicy;
        var toRet = {};
        toRet.disseminationPeriodicity = this.codeToCodelist(vals.disseminationPeriodicity, this.clists.faoPeriod.id, this.clists.faoPeriod.v);

        toRet.embargoTime = {};
        this.copyDatesToMeta(vals.embargoTime, toRet.embargoTime, toCopyDates);
        this.copyVals(vals, toRet, toCopy);
        this.copyValsToML(vals, toRet, toCopyML, lang);

        return { meAccessibility: { seDataDissemination: { seReleasePolicy: toRet } } };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meAccessibility || !meta.meAccessibility.seDataDissemination || !meta.meAccessibility.seDataDissemination.seReleasePolicy)
            return null;
        var vals = meta.meAccessibility.seDataDissemination.seReleasePolicy;
        var toRet = {};

        toRet.disseminationPeriodicity = this.codelistToCode(vals.disseminationPeriodicity);

        toRet.embargoTime = {};
        this.copyDatesFromMeta(vals.embargoTime, toRet.embargoTime, toCopyDates);

        this.copyVals(vals, toRet, toCopy);
        this.copyValsFromML(vals, toRet, toCopyML, lang);

        return { accessibility_dataDissemination_releasePolicy: toRet };
    };

    return MetaAdapter;
});