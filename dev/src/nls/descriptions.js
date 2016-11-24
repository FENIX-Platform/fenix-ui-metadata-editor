/*global define*/
define(function () {

    'use strict';

    return {

        "root": "Basic Metadata",
        "root.uid": "Resource identifier. It is a code that creates the match between the resource and the metadata it is associated to.",
        "root.title": "Textual label used as title of the resource.",
        "root.creationDate": "Creation date of the resource.",
        "root.characterSet": "Full name of the character coding standard used by the resource.",
        "root.language": "Language used by the resource for textual information.",
        "root.languageDetails": "Comments and additional details about the language used for the textual information of the resource. This field is addressed to highlight some particular inconsistencies in the language (or languages) used in the resource, if any. For example to alert that the resource is not completely homogeneous in the language used for textual information. Otherwise it can be leaved empty.",
        "root.metadataStandardName": "Name of the metadata standard specifications used. In FENIX framework this field would be pre-compiled by 'FENIX'.",
        "root.metadataStandardVersion": "Version of the metadata standard specifications used.",
        "root.metadataLanguage": "Language(s) used for metadata",
        "root.noDataValue": " Value assigned to the cells to represent the absence of data. Missing values are usually highlight through apposite ags, however the data matrix does not report empty cells but a predefined combination of characters (such as 'NA', '000' . . . ) indicating the absence of data.",
        "root.contacts": "",
        "contacts.organization": "Name of the responsible organization.",
        "contacts.organizationUnit": "Addressable subdivision of an organization.",
        "contacts.position": "Role or position of the responsible person.",
        "contacts.pointOfContact": "Responsible person-surname, given name, title separated by a delimiter. It contains information about the party who can be contacted for acquiring knowledge the resource.",
        "contacts.role": "Textual metadata element that allows to specify the role performed by the responsible party. This field is conditional to the element \u003crole\u003e.",
        "contacts.specify": "Textual metadata element that allows to specify the role performed by the responsible party. This field is conditional to the element \u003crole\u003e.",
        "contacts.phone": "Telephone numbers at which the organization or individual may be contacted.",
        "contacts.address": "Physical address at which the organization or individual may be contacted.",
        "contacts.emailAddress": "E-mail address at which the organization or individual may be contacted.",
        "contacts.hoursOfService": "Time period (including time zone) when individuals can contact the organization or individual.",
        "contacts.contactInstruction": "Supplemental instructions on how or when to contact the individual or organization.",

        "meContent": "This section includes a summary of the content of the resource and the description of the geographical, time and sector coverage.",
        "meContent.keywords": "Commonly used word(s), formalized word(s) or phrase(s) used to describe the resource.",
        "meContent.description": "Overview of the main characteristics of the resource and summary of the information contained in the resource, in an easily understandable manner, for technical and non-technical users.",
        "meContent.statisticalConceptsDefinitions": "Definitions of the statistical concepts under measure (i.e. the statistical domain) and the main variables provided. The considered types of variables (e.g. raw figures, annual growth rates, index, ow or stock data, ...) should be defined and described in accordance with internationally accepted statistical standards, guidelines, or good practices.",
        "meContent.seReferencePopulation": "",
        "meContent.seReferencePopulation.statisticalPopulation": "Target statistical population (one or more) the resource refers to.",
        "meContent.seReferencePopulation.statisticalUnit": "Simplest unit for which information is sought and for which statistics are ultimately compiled.",
        "meContent.seReferencePopulation.referencePeriod": "Specific time periods (e.g. a day, a week, a month, a fiscal year, a calendar year or several calendar years) the statistical variables refer to.",
        "meContent.seReferencePopulation.referenceArea": "Type of geographical units the resource represents or refers to. Note that the spatial resolution must refer to the minimum mapping unit whose bounds are officially recognized indipendently from the measurement process of the phonomenon taken into account. Examples are: countries, administrative level 2, etc.",
        "meContent.seCoverage": "",
        "meContent.seCoverage.coverageSectors": "Sector(s) the resource refers to as specified in the selected codelist. The word 'Sector' indicates the subject area the resource refers to. These sectors can be institutional sectors, economic or other sectors (e.g. local government sector, agriculture, forestry, business services, etc.).",
        "meContent.seCoverage.coverageSectorsDetails": "Textual element delimiting the statistical results with regard to the main sectors covered.",
        "meContent.seCoverage.coverageGeographic": "Geographical coverage represented by the resource. It is highly recommended to make reference to officially recognized or easily identifiable macro-areas (e.g. South Saharan Africa, North America, OECD member countries..).",
        "meContent.seCoverage.coverageTime": "Information about the time period for which data are available. It requests to report the time window of reference (reporting the starting date and the ending date) even if it presents some lacks.",

        "meInstitutionalMandate": "",
        "meInstitutionalMandate.legalActsAgreements": "References (citations or website link) to legal acts or other formal or informal agreements that assign responsibility as well as authority to an agency for the collection, processing, and dissemination of the resource.",
        "meInstitutionalMandate.institutionalMandateDataSharing": "References (citations or website link) to arrangements or procedures for data sharing and coordination.",

        "meStatisticalProcessing": "",
        "meStatisticalProcessing.seDataSource": "Process used to collect data. It includes a detailed description both of the primary data collection (e.g. type of collection, method to gather data from respondents, sampling procedures..) and the secondary data collection (information about data that have been already collected by another agency or institution).",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection": "",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.typeOfCollection": "Coded element which specifies the type of data collection method (e.g. census, random sampling, etc.).",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.samplingProcedure": "The type of sample design used to select the survey respondents to represent the population. It may refer to information on sample design, sample size, sample frame, sample updating etc.",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.dataCollection": "Methods used to gather data from the respondents (e.g. postal survey, CAPI, on-line survey, face-to-face interviews etc.) and description of data collection methods. This metadata element also includes more precise information about the kind of questionnaire (structured, unstructured etc.) and if necessary somenoteworthy aspects of the data collection process.",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.collectionPeriodicity": "Frequency with which the data are collected from the sources.",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.organization": "Organization is mandatory when 'Other International Organizations' has been chosen in originOfCollectedData *** If the element \u003c\u003coriginOfCollectedData\u003e\u003e has been generally specified as \u0027other International Organizations\u0027 this element requests to report the exact source of the resource.",

        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection": "This section is filled when the agency compiling and publishing data does not coincide with the entity (subject, agency or institution) who has conducted the procedure of collecting data. It reports information about the source that have already collected data.",
        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection.originOfCollectedData": "Coded element which allows to specify in a standard way the origin of the resource.",
        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection.rawDataDescription": "Characteristics and components of the raw statistical data used for compiling statistical aggregates. It indicates if data set is based on a survey or on administrative data source. If administrative registers are used, the description of registers should be given (source, year, primary purpose, potential deficiencies, etc. ).",
        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection.organization": "If the element \u003c\u003coriginOfCollectedData\u003e\u003e has been generally specified as \u0027other International Organizations\u0027 this element requests to report the exact source of the resource.",
        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection.dataCollection": "Data collection details.",


        "meStatisticalProcessing.seDataCompilation": "",
        "meStatisticalProcessing.seDataCompilation.missingData": "It describe under which circumstance missing data are estimated or imputed and when the cells are left empty. It also describe methodologies used to estimate/impute missing values.",
        "meStatisticalProcessing.seDataCompilation.weights": "Description of weights system (if any) used in order to produce accurate statistical results. This field reports the criteria for using weights in analysis of collection, the formulas and coefficients developed and how they are applied to data.",
        "meStatisticalProcessing.seDataCompilation.aggregationProcessing": "Information about the methodology used to aggregate data.",
        "meStatisticalProcessing.seDataCompilation.aggregationFormula": "Formula used to aggregate data.",
        "meStatisticalProcessing.seDataCompilation.dataAdjustment": "Type of adjustment used represented by a code.",
        "meStatisticalProcessing.seDataCompilation.dataAdjustmentDetails": "Set of procedures employed to modify statistical data to enable it to be conform with national or international standards (such as seasonal adjustment methods, time series decomposition, or other similar methods).",
        "meStatisticalProcessing.seDataCompilation.indexType": "Data collection details.",
        "meStatisticalProcessing.seDataCompilation.basePeriod": "Period of time used as a base of an index number or to which a time series refers (e.g. base year 2000 for certain annual data).",

        "meStatisticalProcessing.seDataValidation": "",
        "meStatisticalProcessing.seDataValidation.dataValidationIntermediate": "Assessment of the quality and correctness of intermediate calculations leading to statistical outputs.",
        "meStatisticalProcessing.seDataValidation.dataValidationOutput": "Assessment of discrepancies and/or inaccuracies observed in the statistical outputs.",
        "meStatisticalProcessing.seDataValidation.dataValidationSource": "It describe under which circumstance missing data are estimated or imputed and when the cells are left empty. It also describe methodologies used to estimate/impute missing values.",


        "meDataQuality": "This section provides a description and evaluation of the data quality. It allows to describe the data quality assurance process, inclusive of data validation, completeness and accuracy standards. In addition an assessment of the comparability and intern coherence of the resource is considered a quality dimension.",
        "meDataQuality.qualityManagement": "Structure, responsibilities and procedures established for guaranteeing the quality of the data.",
        "meDataQuality.qualityAssessment": "Overall qualitative assessment of the quality of the statistical outputs.",
        "meDataQuality.qualityAssurance": "Description of the process assuring that the data production processes conforms to the statistical quality standards.",
        "meDataQuality.seAccuracy": "Closeness of computations or estimates to the exact values that the statistics were intended to measure. Accuracy can contain either measures of numerical results of the methods for assessing the accuracy of data or qualitative assessment indicators. It may also be described in terms of the major sources of error that potentially cause inaccuracy (e.g. sampling, non-response, response error).",
        "meDataQuality.seAccuracy.accuracyNonSampling": "Error in sample estimates which cannot be attributed to sampling fluctuations. (e.g. defects in the sampling frame, faulty demarcation of sample units, defects in the selection of sample units, mistakes in the collection of data due to personal variations, misunderstanding, bias, negligence . . . etc.)",
        "meDataQuality.seAccuracy.accuracySampling": "If probability sampling is used, the accuracy is an evaluation of difference between a population value and an estimate thereof, derived from a random sample (so due to the fact that only a subset of the population is enumerate), normally in the form of coefficient of variation, standard error or confidence intervals. For non-probability sampling, random errors cannot be calculated without reference to some kind of model, in this case estimates of the accuracy, a motivation for the invoked model for this estimation and brief discussion of sampling bias should be provided.",
        "meDataQuality.seAccuracy.completeness": "State of completeness of the resource.",

        "meDataQuality.seDataRevision": "This section describes the policy and practice for identifying the revision status of the data, as well as the availability of revision studies and analysis.",
        "meDataQuality.seDataRevision.revisionPolicy": "Policy concerning the periodically revision of the resource and ensuring the transparency of disseminated data.",
        "meDataQuality.seDataRevision.revisionPractice": "Information concerning the revision of data in order to give compilers the possibility of incorporating new and more accurate information in the resource. It also describes the revision status of available data. Data may also be subject to regular or ad hoc revisions as a result of the introduction of new classification, compilation frameworks and methodologies in order to improve the accuracy of the resource.",

        "meDataQuality.seComparability": "Degree of data comparability across the geographic areas or regions referenced by the resource. Data might be derived from surveys that in general are conducted by different statistical agencies. These surveys often refer to populations of different geographical areas, sometimes based on different methodologies.",
        "meDataQuality.seComparability.comparabilityGeographical": "Degree of data comparability across the geographic areas or regions referenced by the resource. Data might be derived from surveys that in general are conducted by different statistical agencies. These surveys often refer to populations of different geographical areas, sometimes based on different methodologies.",
        "meDataQuality.seComparability.comparabilityTime": "Extent to which data are comparable or reconcilable over time. It refers to the degree of comparability between the measures of a time series (e.g. related to a country, a commodity and a variable) included in the resource.",
        "meDataQuality.seComparability.coherenceIntern": "General estimate of the extent to which data are consistent within the resource.",

        "meAccessibility": "",
        "meAccessibility.seDataDissemination": "",
        "meAccessibility.seDataDissemination.seDistribution": "This section reports the mode of distribution of the resource with a focus on how to access the resource, the supported formats.",
        "meAccessibility.seDataDissemination.seDistribution.onlineResource": "Link to the on-line resource. It is conditional to the policy governing distribution and sharing mechanism. For \u0027restricted\u0027 resources it is not available.",
        "meAccessibility.seDataDissemination.seDistribution.disseminationFormat": "Formats available for downloading the resources (e.g. excel, csv, pdf, etc.). . . It is conditional to the policy governing distribution and sharing mechanism. For \u0027restricted\u0027 resources it is not available.",
        "meAccessibility.seDataDissemination.seReleasePolicy": "",
        "meAccessibility.seDataDissemination.seReleasePolicy.releaseCalendar": "Policy regarding the release of the resource in accordance with the pre-announced schedule. It also provides information on the availability of the release calendar.",
        "meAccessibility.seDataDissemination.seReleasePolicy.releaseCalendarAccess": "Link or references to the release calendar.",
        "meAccessibility.seDataDissemination.seReleasePolicy.disseminationPeriodicity": "Frequency of data dissemination (e.g. daily, monthly, quarterly, yearly)",
        "meAccessibility.seDataDissemination.seReleasePolicy.embargoTime": "Time span between the completion of the production process of statistical data and their publication.",

        "meAccessibility.seClarity": "This section gives information about the availability of additional information (documentation, further metadata, ... ) linked to the resource.",
        "meAccessibility.seClarity.clarity": "Extent to which easily comprehensible metadata are available. It indicates whether a resource is accompanied by appropriate metadata and other relevant documentation.",
        "meAccessibility.seClarity.metadataCompletenessRate": "The percentage of completeness of metadata offers a numerical evaluation of the extent to which the resource is documented.",

        "meAccessibility.seConfidentiality": "This section information on the level of confidentiality and the applied policy for releasing the resource. This metadata sub-entity concerns legislation (or any other formal provision) related to statistical confidentiality applied to the resource as well as the actual confidentiality data treatment applied (also with regard to the aggregated data disseminated).",
        "meAccessibility.seConfidentiality.confidentialityPolicy": "Legislative measures or other formal procedures which prevent unauthorized disclosure of data that identify a person or economic entity either directly or indirectly. It consists in textual description and references to legislation or other rules related to statistical confidentiality.",
        "meAccessibility.seConfidentiality.confidentialityDataTreatment": "Rules applied for treating the resource to ensure confidentiality and prevent unauthorized disclosure.",
        "meAccessibility.seConfidentiality.confidentialityStatus": "Coded information describing the degree of confidentiality of the resource",

        "meMaintenance": "This section provides information about the frequency of resource upgrade and metadata maintenance.",
        "meMaintenance.maintenanceAgency": "Organization or other expert body that maintains the resource.",
        "meMaintenance.seUpdate": "This section involves maintenance operations concerning the periodic update of the resource.",
        "meMaintenance.seUpdate.updateDate":  "Last physical update date.",
        "meMaintenance.seUpdate.updatePeriodicity": "Time span between the completion of the production process of statistical data and their publication.",
        "meMaintenance.seMetadataMaintenance": "This section involves maintenance operations concerning the periodic update of metadata to ensure that the resource is properly described.",
        "meMaintenance.seMetadataMaintenance.metadataLastCertified": "Latest date of certification of the metadata.",
        "meMaintenance.seMetadataMaintenance.metadataLastPosted": "Latest date of publication of the metadata. It is usually automatically updated by the metadata production system.",
        "meMaintenance.seMetadataMaintenance.metadataLastUpdate": "Most recent date of update of the metadata.",


    }
});