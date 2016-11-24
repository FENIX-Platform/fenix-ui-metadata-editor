/*global define*/
define(function () {

    'use strict';

    return {

        "root": "Identification",
        "root.uid": "Uid - Resource identification code",
        "root.title": "Title",
        "root.creationDate" : "Creation Date",
        "root.characterSet": "Character-set",
        "root.language": "Language(s)",
        "root.languageDetails": "Language details",
        "root.metadataStandardName": "Used metadata standard",
        "root.metadataStandardVersion": "Version of metadata standard",
        "root.metadataLanguage": "Metadata Language",
        "root.noDataValue": "Value assigned to No-data",
        "root.contacts" : "Contacts",

        "contacts.organization": "Organization",
        "contacts.organizationUnit": "Organization unit/division",
        "contacts.position": "Position",
        "contacts.pointOfContact": "Point of contact",
        "contacts.role": "Role",
        "contacts.specify": "Specify",
        "contacts.phone": "Telephone",
        "contacts.address": "Address",
        "contacts.emailAddress": "E-mail address",
        "contacts.hoursOfService": "Hour of service",
        "contacts.contactInstruction": "Instruction",

        "meContent": "Content",
        "meContent.keywords": "Keywords",
        "meContent.description": "Abstract",
        "meContent.statisticalConceptsDefinitions": "Statistical concepts / definitions",
        "meContent.seReferencePopulation": "Reference Population",
        "meContent.seReferencePopulation.statisticalPopulation": "Statistical population",
        "meContent.seReferencePopulation.statisticalUnit": "Statistical unit",
        "meContent.seReferencePopulation.referencePeriod": "Period of reference",
        "meContent.seReferencePopulation.referenceArea": "Area of reference",
        "meContent.seCoverage": "Coverage",
        "meContent.seCoverage.coverageSectors": "Sector",
        "meContent.seCoverage.coverageSectorsDetails": "Coverage Sector Details",
        "meContent.seCoverage.coverageGeographic": "Geographic extent",
        "meContent.seCoverage.coverageTime": "Coverage period",

        "meInstitutionalMandate": "Institutionale Mandate",
        "meInstitutionalMandate.legalActsAgreements": "Legal acts/agreements",
        "meInstitutionalMandate.institutionalMandateDataSharing": "Data sharing arrangements",

        "meStatisticalProcessing": "Statistical Processing",
        "meStatisticalProcessing.seDataSource": "Data source",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection": "Primary Data Collection",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.typeOfCollection": "Type of collection",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.samplingProcedure": "Sampling procedure",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.dataCollection": "Data collection",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.collectionPeriodicity": "Periodicity of data collection",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.organization": "Organization",

        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection": "Secondary Data Collection",
        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection.originOfCollectedData": "Origin of collected data",
        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection.rawDataDescription": "Description of raw data",
        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection.organization": "Organization",
        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection.dataCollection": "Data collection",

        "meStatisticalProcessing.seDataCompilation": "Data Compilation",
        "meStatisticalProcessing.seDataCompilation.missingData": "Missing data",
        "meStatisticalProcessing.seDataCompilation.weights": "Weights",
        "meStatisticalProcessing.seDataCompilation.aggregationProcessing": "Process of aggregation",
        "meStatisticalProcessing.seDataCompilation.aggregationFormula": "Aggregation formula",
        "meStatisticalProcessing.seDataCompilation.dataAdjustment": "Process of adjustment",
        "meStatisticalProcessing.seDataCompilation.dataAdjustmentDetails": "Details on process of adjustment",
        "meStatisticalProcessing.seDataCompilation.indexType": "Type of index",
        "meStatisticalProcessing.seDataCompilation.basePeriod": "Base period",

        "meStatisticalProcessing.seDataValidation": "Data Validation",
        "meStatisticalProcessing.seDataValidation.dataValidationIntermediate": "Data validation - intermediate",
        "meStatisticalProcessing.seDataValidation.dataValidationOutput": "Data validation - output",
        "meStatisticalProcessing.seDataValidation.dataValidationSource": "Data validation - source",


        "meDataQuality": "Data Quality",
        "meDataQuality.qualityManagement": "Quality management",
        "meDataQuality.qualityAssessment": "Data quality assessment",
        "meDataQuality.qualityAssurance": "Quality assurance",
        "meDataQuality.seAccuracy": "Accuracy",
        "meDataQuality.seAccuracy.accuracyNonSampling": "Accuracy - non sampling error",
        "meDataQuality.seAccuracy.accuracySampling": "Accuracy - sampling error",
        "meDataQuality.seAccuracy.completeness": "Completeness",

        "meDataQuality.seDataRevision": "Data Revision",
        "meDataQuality.seDataRevision.revisionPolicy": "Revision policy",
        "meDataQuality.seDataRevision.revisionPractice": "Revision practice",

        "meDataQuality.seComparability": "Comparability Coherence",
        "meDataQuality.seComparability.comparabilityGeographical": "Geographic comparability",
        "meDataQuality.seComparability.comparabilityTime": "Time comparability",
        "meDataQuality.seComparability.coherenceIntern": "Internal coherence",

        "meAccessibility": "Accessibility",
        "meAccessibility.seDataDissemination": "Data Dissemination",
        "meAccessibility.seDataDissemination.seDistribution": "Distribution",
        "meAccessibility.seDataDissemination.seDistribution.onlineResource": "Link to the on-line resource",
        "meAccessibility.seDataDissemination.seDistribution.disseminationFormat": "Dissemination formats",
        "meAccessibility.seDataDissemination.seReleasePolicy": "Release Policy",
        "meAccessibility.seDataDissemination.seReleasePolicy.releaseCalendar": "Release calendar",
        "meAccessibility.seDataDissemination.seReleasePolicy.releaseCalendarAccess": "Access to the release calendar",
        "meAccessibility.seDataDissemination.seReleasePolicy.disseminationPeriodicity": "Dissemination periodicity",
        "meAccessibility.seDataDissemination.seReleasePolicy.embargoTime": "Embargo time",


        "meAccessibility.seClarity": "Clarity",
        "meAccessibility.seClarity.clarity": "Clarity",
        "meAccessibility.seClarity.metadataCompletenessRate": "Metadata completeness rate",


        "meAccessibility.seConfidentiality": "Confidentiality",
        "meAccessibility.seConfidentiality.confidentialityPolicy": "Confidentiality - Policy",
        "meAccessibility.seConfidentiality.confidentialityDataTreatment": "Confidentiality - Data treatment",
        "meAccessibility.seConfidentiality.confidentialityStatus": "Status of confidentiality",

        "meMaintenance": "Maintenance",
        "meMaintenance.maintenanceAgency": "Maintenance agency",
        "meMaintenance.seUpdate": "Update",
        "meMaintenance.seUpdate.updateDate":  "Last update date",
        "meMaintenance.seUpdate.updatePeriodicity": "Frequency of update",

        "meMaintenance.seMetadataMaintenance": "Metadata Maintenance",
        "meMaintenance.seMetadataMaintenance.metadataLastCertified": "Metadata last certified",
        "meMaintenance.seMetadataMaintenance.metadataLastPosted": "Metadata last posted",
        "meMaintenance.seMetadataMaintenance.metadataLastUpdate": "Metadata last update"



    }
});