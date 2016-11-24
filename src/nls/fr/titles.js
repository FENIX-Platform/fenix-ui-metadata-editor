/*global define*/
define(function () {

    'use strict';

    return {

        "root": "Métadonnées de Base",
        "root.uid": "Uid - Code d'identification de la ressource",
        "root.title": "Titre",
        "root.creationDate" : "Date de Création",
        "root.characterSet": "Jeu de caractères",
        "root.language": "Langue(s)",
        "root.languageDetails": "Détails sur la langue",
        "root.metadataStandardName": "Norme de métadonnées utilisée",
        "root.metadataStandardVersion": "Version des normes des métadonnées",
        "root.metadataLanguage": "Langue des métadonnées",
        "root.noDataValue": "Valeur assignée Value assigned au manque de donnée",
        "root.contacts" : "Informations de contact",
        "contacts.organization": "Organisation",
        "contacts.organizationUnit": "Unité/branche dans l'organisation",
        "contacts.position": "Position",
        "contacts.pointOfContact": "Point de contact",
        "contacts.role": "Rôle",
        "contacts.specify": "Specifiez",
        "contacts.phone": "Numéro de téléphone",
        "contacts.address": "Addresse",
        "contacts.emailAddress": "Addresse électronique",
        "contacts.hoursOfService": "Heures de service",
        "contacts.contactInstruction": "Instruction",

        "meContent": "Contenu",
        "meContent.keywords": "Mots-clés",
        "meContent.description": "Abstract",
        "meContent.statisticalConceptsDefinitions": "Concepts / définitions statistiques",
        "meContent.seReferencePopulation": "Population de référence",
        "meContent.seReferencePopulation.statisticalPopulation": "Population statistique",
        "meContent.seReferencePopulation.statisticalUnit": "Unité statistique",
        "meContent.seReferencePopulation.referencePeriod": "Période de référence",
        "meContent.seReferencePopulation.referenceArea": "Zone de référence",
        "meContent.seCoverage": "Couverture",
        "meContent.seCoverage.coverageSectors": "Secteur",
        "meContent.seCoverage.coverageSectorsDetails": "Secteur(s) principal(aux)",
        "meContent.seCoverage.coverageGeographic": "Etendue géographique",
        "meContent.seCoverage.coverageTime": "Période de couverture",

        "meInstitutionalMandate": "Mandat institutionnel",
        "meInstitutionalMandate.legalActsAgreements": "Actes/Accords juridiques",
        "meInstitutionalMandate.institutionalMandateDataSharing": "Dispositions pour le partage des données",

        "meStatisticalProcessing": "Traitement statistique",
        "meStatisticalProcessing.seDataSource": "Source de données",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection": "Collecte de données primaires",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.typeOfCollection": "Type de collecte",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.samplingProcedure": "Procédure d'échantillonnage",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.dataCollection": "Collecte de données",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.collectionPeriodicity": "Périodicité de la collecte de données",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.organization": "Organisation",

        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection": "Collecte de données secondaires",
        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection.originOfCollectedData": "Origine des données collectées",
        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection.rawDataDescription": "Description des données brutes",
        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection.organization": "Organisation",
        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection.dataCollection": "Collecte de données",

        "meStatisticalProcessing.seDataCompilation": "Compilation des données",
        "meStatisticalProcessing.seDataCompilation.missingData": "Données manquantes",
        "meStatisticalProcessing.seDataCompilation.weights": "Poids",
        "meStatisticalProcessing.seDataCompilation.aggregationProcessing": "Processus d'agrégation",
        "meStatisticalProcessing.seDataCompilation.aggregationFormula": "Formule d'agrégation",
        "meStatisticalProcessing.seDataCompilation.dataAdjustment": "Process d'ajustement",
        "meStatisticalProcessing.seDataCompilation.dataAdjustmentDetails": "Détails sur le processus d'ajustement",
        "meStatisticalProcessing.seDataCompilation.indexType": "Type d'indice",
        "meStatisticalProcessing.seDataCompilation.basePeriod": "Période de référence",

        "meStatisticalProcessing.seDataValidation": "Validation des données",
        "meStatisticalProcessing.seDataValidation.dataValidationIntermediate": "Validation intermédiaire des données",
        "meStatisticalProcessing.seDataValidation.dataValidationOutput": "Validation des données - sortie",
        "meStatisticalProcessing.seDataValidation.dataValidationSource": "Validation des données - source",


        "meDataQuality": "Qualité des données",
        "meDataQuality.qualityManagement": "Gestion de la qualité",
        "meDataQuality.qualityAssessment": "Evaluation de la qualité des données",
        "meDataQuality.qualityAssurance": "Assurance de la qualité",
        "meDataQuality.seAccuracy": "Exactitude",
        "meDataQuality.seAccuracy.accuracyNonSampling": "Exactitude - Erreurs non dues à l'échantillonnage",
        "meDataQuality.seAccuracy.accuracySampling": "Exactitude - Erreurs d'échantillonnage",
        "meDataQuality.seAccuracy.completeness": "Intégralité",

        "meDataQuality.seDataRevision": "Révision des données",
        "meDataQuality.seDataRevision.revisionPolicy": "Politique de révision",
        "meDataQuality.seDataRevision.revisionPractice": "Pratique de révision",

        "meDataQuality.seComparability": "Cohérence de compatibilité",
        "meDataQuality.seComparability.comparabilityGeographical": "Comparabilité géographique",
        "meDataQuality.seComparability.comparabilityTime": "Comparabilité dans le temps",
        "meDataQuality.seComparability.coherenceIntern": "Cohérence interne",

        "meAccessibility": "Accessibilité",
        "meAccessibility.seDataDissemination": "Diffusion des données",
        "meAccessibility.seDataDissemination.seDistribution": "Distribution",
        "meAccessibility.seDataDissemination.seDistribution.onlineResource": "Lien vers la ressource en ligne",
        "meAccessibility.seDataDissemination.seDistribution.disseminationFormat": "Formats de diffusion",
        "meAccessibility.seDataDissemination.seReleasePolicy": "Politique de diffusion",
        "meAccessibility.seDataDissemination.seReleasePolicy.releaseCalendar": "Calendrier de diffusion",
        "meAccessibility.seDataDissemination.seReleasePolicy.releaseCalendarAccess":  "Accès au calendrier de diffusion",
        "meAccessibility.seDataDissemination.seReleasePolicy.disseminationPeriodicity": "Périodicité de diffusion",
        "meAccessibility.seDataDissemination.seReleasePolicy.embargoTime": "Embargo",


        "meAccessibility.seClarity": "Clarté",
        "meAccessibility.seClarity.clarity": "Clarté",
        "meAccessibility.seClarity.metadataCompletenessRate": "Taux de complétude des métadonnées",


        "meAccessibility.seConfidentiality": "Confidentialité",
        "meAccessibility.seConfidentiality.confidentialityPolicy": "Politique de confidentialité",
        "meAccessibility.seConfidentiality.confidentialityDataTreatment": "Confidentialité du traitement des données",
        "meAccessibility.seConfidentiality.confidentialityStatus": "Etat de confidentialité",

        "meMaintenance": "Maintenance",
        "meMaintenance.maintenanceAgency": "Agence de maintenance",
        "meMaintenance.seUpdate": "Mise à jour",
        "meMaintenance.seUpdate.updateDate":  "Dernière date de mise à jour",
        "meMaintenance.seUpdate.updatePeriodicity": "Fréquence de mise à jour",

        "meMaintenance.seMetadataMaintenance": "Maintenance des métadonnées",
        "meMaintenance.seMetadataMaintenance.metadataLastCertified": "Dernière certification des métadonnées",
        "meMaintenance.seMetadataMaintenance.metadataLastPosted": "Dernière publication des métadonnées",
        "meMaintenance.seMetadataMaintenance.metadataLastUpdate": "Dernière mise à jour des métadonnées",



    }
});