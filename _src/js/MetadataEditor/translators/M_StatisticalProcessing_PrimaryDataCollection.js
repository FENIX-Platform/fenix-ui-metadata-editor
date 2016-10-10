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

    var toCopy = [];
    var toCopyML = ["dataCollection", "samplingProcedure"];
    var toCopyDates = [];

    var toCopyCollector = ["pointOfContact", "role"];
    var toCopyCollectorML = ["organization", "organizationUnit", "position", "specify"];

    var toCopyCollectorContacts = ["phone", "address", "emailAddress"];
    var toCopyCollectorContactsML = ["hoursOfService", "contactInstruction"];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        //var lang = uiVals.language;
        if (!meta)
            return null;
        if (!meta.statisticalProcessing_primaryDataCollection)
            return null;
        var vals = meta.statisticalProcessing_primaryDataCollection;
        var toRet = {};
        var toRetCollector = {};
        var toRetContactInfo = {};

        toRet.typeOfCollection = this.codeToCodelist(vals.typeOfCollection, this.clists.faostatCollection.id, this.clists.faostatCollection.v);
        toRet.collectionPeriodicity = this.codeToCodelist(vals.collectionPeriodicity, this.clists.faoPeriod.id, this.clists.faoPeriod.v);

        this.copyVals(vals, toRet, toCopy);
        this.copyValsToML(vals, toRet, toCopyML, lang);

        this.copyVals(vals.dataCollector, toRetCollector, toCopyCollector);
        this.copyValsToML(vals.dataCollector, toRetCollector, toCopyCollectorML,lang);

        this.copyVals(vals.dataCollector.contactInfo, toRetContactInfo, toCopyCollectorContacts);
        this.copyValsToML(vals.dataCollector.contactInfo, toRetContactInfo, toCopyCollectorContactsML, lang);

        toRet.dataCollector = toRetCollector;
        toRet.dataCollector.contactInfo = toRetContactInfo;

        

        return { meStatisticalProcessing: { seDataSource: { sePrimaryDataCollection: toRet } } };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meStatisticalProcessing || !meta.meStatisticalProcessing.seDataSource || !meta.meStatisticalProcessing.seDataSource.sePrimaryDataCollection)
            return null;
        var vals = meta.meStatisticalProcessing.seDataSource.sePrimaryDataCollection;
        var toRet = {};
        var toRetCollector = {};
        var toRetContactInfo = {};

        toRet.typeOfCollection = this.codelistToCode(vals.typeOfCollection);
        toRet.collectionPeriodicity = this.codelistToCode(vals.collectionPeriodicity);

        this.copyVals(vals, toRet, toCopy);
        this.copyValsFromML(vals, toRet, toCopyML, lang);

        this.copyVals(vals.dataCollector, toRetCollector, toCopyCollector);
        this.copyValsFromML(vals.dataCollector, toRetCollector, toCopyCollectorML, lang);

        this.copyVals(vals.dataCollector.contactInfo, toRetContactInfo, toCopyCollectorContacts);
        this.copyValsFromML(vals.dataCollector.contactInfo, toRetContactInfo, toCopyCollectorContactsML, lang);

        toRet.dataCollector = toRetCollector;
        toRet.dataCollector.contactInfo = toRetContactInfo;

        return { statisticalProcessing_primaryDataCollection: toRet };
    };

    return MetaAdapter;
});