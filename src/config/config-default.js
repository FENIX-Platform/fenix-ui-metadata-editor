define(function () {

    'use strict';
    return {

        LANG : "EN",
        LOCALE : "en_EN",

        METADATA_PATH: {
            //schemaPath: '../config/schemas/',
            schemaPath: 'fx-MetaEditor/config/schemas/'
        },

        METADATA_SEC: [
            {
                id: "identification", text: "Identification", icon: "img/fenix-catalog-sprite-small.svg",
                state: {
                    selected: true
                }
            },
            {id: "contacts", text: "Contacts"},
            {
                id: "content", text: "Content", children: [
                {id: 'content_ReferencePopulation', text: "Reference Population"},
                {id: 'content_Coverage', text: "Coverage"}
            ]
            },
            {id: "institutionalMandate", text: "Institutional Mandate"},
            {
                id: "statisticalProcessing",
                text: "Statistical Processing",
                state: {disabled: true, opened: true},
                children: [
                    {id: 'statisticalProcessing_primaryDataCollection', text: "Primary Data Collection"},
                    {id: 'statisticalProcessing_secondaryDataCollection', text: "Secondary Data Collection"},
                    {id: 'statisticalProcessing_dataCompilation', text: "Data Compilation"},
                    {id: 'statisticalProcessing_dataValidation', text: "Data Validation"}
                ]
            },
            {
                id: "dataQuality", text: "Data Quality", children: [
                {id: "dataQuality_accuracy", text: "Accuracy"},
                {id: "dataQuality_dataRevision", text: "Data Revision"},
                {id: "dataQuality_relevance", text: "Relevance"},
                {id: "dataQuality_compatibilityCoherence", text: "Compatibility Coherence"},
                {id: "dataQuality_timelinessAndPunctuality", text: "Timeliness and Puctuality"}
            ]
            },
            {
                id: "accessibility", text: "Accessibility", state: {disabled: true, opened: true}, children: [
                {
                    id: "accessibility_dataDissemination",
                    text: "Data Dissemination",
                    state: {disabled: true, opened: true},
                    children: [
                        {id: "accessibility_dataDissemination_distribution", text: "Distribution"},
                        {id: "accessibility_dataDissemination_releasePolicy", text: "Release Policy"}
                    ],

                },
                {id: "accessibility_clarity", text: "Clarity"},
                {id: "accessibility_confidentiality", text: "Confidentiality"}
            ]
            },
            {
                id: "maintenance", text: "Maintenance", children: [
                {id: "maintenance_update", text: "Update"},
                {id: "maintenance_metadataMaintenance", text: "Metadata Maintenance"}
            ]
            }
            //,{ id: "documents", text: "Documents" }
        ],

    };
});
