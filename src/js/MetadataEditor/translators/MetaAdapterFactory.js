define([
        'jquery',
        './M_Identification',
        './M_Contacts',
        './M_Content',
        './M_Content_ReferencePopulation',
        './M_Content_Coverage',
        './M_InstitutionalMandate',
        './M_StatisticalProcessing_PrimaryDataCollection',
        './M_StatisticalProcessing_SecondaryDataCollection',
        './M_StatisticalProcessing_DataCompilation',
        './M_StatisticalProcessing_DataValidation',
        './M_DataQuality',
        './M_DataQuality_Accuracy',
        './M_DataQuality_DataRevision',
        './M_DataQuality_Relevance',
        './M_DataQuality_ComparabilityCoherence',
        './M_DataQuality_TimelinessAndPunctuality',
        './M_Accessibility_Clarity',
        './M_Accessibility_Confidentiality',
        './M_Accessibility_DataDissemination_Distribution',
        './M_Accessibility_DataDissemination_ReleasePolicy',
        './M_Maintenance',
        './M_Maintenance_MetadataMaintenance',
        './M_Maintenance_Update'
],
function ($,
    Identification,
    Contacts,
    Content,
    Content_ReferencePopulation,
    Content_Coverage,
    InstitutionalMandate,
    StatProc_PrimaryDataCollection,
    StatProc_SecondaryDataCollection,
    StatProc_DataCompilation,
    StatProc_DataValidation,
    DataQuality,
    DataQuality_Accuracy,
    DataQuality_DataRevision,
    DataQuality_Relevance,
    DataQuality_ComparabilityCoherence,
    DataQuality_TimelinessAndPunctuality,
    Accessibility_Clarity,
    Accessibility_Confidentiality,
    Accessibility_DataDissemination_Distribution,
    Accessibility_DataDissemination_ReleasePolicy,
    Maintenance,
    Maintenance_MetadataMaintenance,
    Maintenance_Update

    ) {
    var defConfig = {
        identification: Identification,
        contacts: Contacts,
        content: Content,
        content_ReferencePopulation: Content_ReferencePopulation,
        content_Coverage: Content_Coverage,
        institutionalMandate: InstitutionalMandate,
        statisticalProcessing_primaryDataCollection: StatProc_PrimaryDataCollection,
        statisticalProcessing_secondaryDataCollection: StatProc_SecondaryDataCollection,
        statisticalProcessing_dataCompilation: StatProc_DataCompilation,
        statisticalProcessing_dataValidation: StatProc_DataValidation,
        dataQuality: DataQuality,
        dataQuality_accuracy: DataQuality_Accuracy,
        dataQuality_dataRevision: DataQuality_DataRevision,
        dataQuality_relevance: DataQuality_Relevance,
        dataQuality_compatibilityCoherence: DataQuality_ComparabilityCoherence,
        dataQuality_timelinessAndPuctuality: DataQuality_TimelinessAndPunctuality,
        accessibility_clarity: Accessibility_Clarity,
        accessibility_confidentiality: Accessibility_Confidentiality,
        accessibility_dataDissemination_distribution: Accessibility_DataDissemination_Distribution,
        accessibility_dataDissemination_releasePolicy: Accessibility_DataDissemination_ReleasePolicy,
        maintenance: Maintenance,
        maintenance_metadataMainenance: Maintenance_MetadataMaintenance,
        maintenance_update: Maintenance_Update
    };

    var metaLangCodes = {
        "eng": "EN",
        "fre": "FR",
        "por": "PT",
        "spa": "ES",
        "ara": "AR"
    };

    var MetaAdapterFactory = function (config) {
        this.config = {};
        $.extend(true, this.config, defConfig, config);
    };

    MetaAdapterFactory.prototype.create = function (name) {
        if (!this.config[name])
            return null;
        return new this.config[name]();
    }

    MetaAdapterFactory.prototype.uiToMeta = function (meta) {
        if (!meta || $.isEmptyObject(meta))
            return {};

        var lang = "EN";
        if (meta.identification && meta.identification.language)
            //&& meta.identification.language.codes && meta.identification.language.codes[0])
            //var lang = this.langCode_clistToMeta(meta.identification.language.codes[0]);
            var lang = this.langCode_clistToMeta(meta.identification.language);
        var toRet = {};
        for (var k in this.config) {
            var ad = new this.config[k]();
            if (ad.convertUIToMeta) {
                var toMerge = ad.convertUIToMeta(meta, lang);
                $.extend(true, toRet, toMerge);
            }
        }

        if (!toRet.meContent) {
            toRet.meContent = {};
            if (!toRet.meContent.resourceRepresentationType) {
                toRet.meContent.resourceRepresentationType = "dataset";
            }
        }

        return toRet;
    }

    MetaAdapterFactory.prototype.metaToUi = function (meta) {
        if (!meta || $.isEmptyObject(meta))
            return {};

        var lang = "EN";
        if (meta.language && meta.language.codes && meta.language.codes[0])
             lang = this.langCode_clistToMeta(meta.language.codes[0].code);

        var toRet = {};
        for (var k in this.config) {
            var ad = new this.config[k]();
            if (ad.convertMetaToUi) {
                var toMerge = ad.convertMetaToUi(meta, lang);
                $.extend(true, toRet, toMerge);
            }
        }
        return toRet;

    }

    MetaAdapterFactory.prototype.langCode_clistToMeta = function (code) {
        if (metaLangCodes[code])
            return metaLangCodes[code];
        return null;
    };
    MetaAdapterFactory.prototype.langCode_metaToClist = function (code) {
        for (var k in metaLangCodes)
            if (metaLangCodes.hasOwnProperty(k))
                if (metaLangCodes[k] == code)
                    return k;
        return null;
    };

    return MetaAdapterFactory;
});