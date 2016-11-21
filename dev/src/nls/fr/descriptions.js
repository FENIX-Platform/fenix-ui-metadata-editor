/*global define*/
define(function () {

    'use strict';

    return {

        "root": "Métadonnées de Base",
        "root.uid": "Identificateur de ressource. Il s'agit d'un code qui crée la correspondance entre la ressource et les métadonnées auxquelles elle est associée.",
        "root.title": "Etiquette textuelle utilisée comme titre de la ressource.",
        "root.creationDate": "Date de création de la ressource.",
        "root.characterSet": "Nom complet de la norme de codage de caractères utilisée par la ressource.",
        "root.language": "Langue utilisée par la ressource pour les informations textuelles.",
        "root.languageDetails": "Commentaires et détails supplémentaires sur la langue utilisés pour les informations textuelles de la ressource. Ce champ est addressé à mettre en évidence des incohérences particulières dans la langue (ou langues) utilisée(s) dans la ressource, le cas échéant. Par exemple pour avertir que la ressource n'est pas complètement homogène dans la langue utilisée pour les informations textuelles. Sinon, il peut être laissé vide.",
        "root.metadataStandardName": "Nom des spécifications standard des métadonnées utilisées. Dans le cadre de FENIX ce champ serait pré-compilé par 'FENIX'.",
        "root.metadataStandardVersion": "Version des spécifications standards de métadonnées utilisée.",
        "root.metadataLanguage": "Langue(s) utilisée(s) pour les métadonnées",
        "root.noDataValue": "Valeur assignée aux cellules pour représenter l'absence de données. Les valeurs manquantes sont généralement mises en évidence par des étiquettes appropriées (tels que \'NA\', \'000\')",
        "root.contacts": "",
        "contacts.organization": "Nom de l'organisation responsable.",
        "contacts.organizationUnit": "Subdivision addressable dans l'organisation.",
        "contacts.position": "Rôle ou position de la personne responsable",
        "contacts.pointOfContact": "Nom, prénom, titre de la personne responsable séparés par un délimiteur. Il contient des informations sur la partie qui peut être contactée pour acquérir des connaissancer sur la ressource.",
        "contacts.role": "Fonctionne accomplie par la partie responsable concernant la ressource.",
        "contacts.specify": "Elément de métadonnées textuel qui permet de préciser le rôle de la partie responsable. Ce champ est conditionnel à l'élément",
        "contacts.phone": "Numéro de téléphone auquel l'organisation ou un individu peuvent être contactés.",
        "contacts.address": "Addresse physique à laquelle l'organisation ou l'individu peuvent être contactés.",
        "contacts.emailAddress": "Addresse élctronique à laquelle l'organisation ou l'individu peuvent être contactés.",
        "contacts.hoursOfService": "Période (y compris le fuseau horaire) dans laquelle les personnes peuvent contacter l'organisation ou l'individu.",
        "contacts.contactInstruction": "Instructions supplémentaires sur comment ou quand contacter l'organisation ou l'individu.",

        "meContent": "Cette section comprend un résumé du contenu de la ressource et la description de la couverture géographique, temporelle et sectorielle.",
        "meContent.keywords": "Mot(s), mot(s) formalisé(s) ou phrase(s) fréquemment utilisés pour décrire la ressource.",
        "meContent.description": "Aperçu des caractéristiques principales de la ressource et résumé des informations contenues dans la ressource, de manière facilement compréhensible, pour les utilisateurs techniques et non techniques.",
        "meContent.statisticalConceptsDefinitions": "Définitions des concepts statistiques (c'est-à-dire le domaine statistique) et des principales variables fournies. Les types de variables considérés (par exemple des chiffres brutes, des taux de croissance annuels, des indices, des données de stock,...) doivent être définis et décrits conformément aux normes, aux directives ou aux bonnes pratiques statistiques internationalement acceptées.",
        "meContent.seReferencePopulation": "",
        "meContent.seReferencePopulation.statisticalPopulation": "Population statistique cible (une ou plusieurs) à laquelle la ressource se réfère.",
        "meContent.seReferencePopulation.statisticalUnit": "Unité la plus simple pour laquelle des informations sont demandées et pour laquelle des statistiques sont compilées.",
        "meContent.seReferencePopulation.referencePeriod": "Périodes spécifiques (par exemple un jour, une semaine, un mois, une année fiscale, une année civile ou plusieurs années civiles) auxquelles les variables statistiques se réfèrent.",
        "meContent.seReferencePopulation.referenceArea": "Type d'unités géographiques la ressource représente ou auquel elle se réfère. Notez que la résolution spatiale doit se référer à l'unité de cartographie minimale dont les limites sont officiellement reconnues, indipendentement du processus de mesure du phénomène considéré. Des exemplent sont les suivantes: pays, niveau administratif 2, etc.",
        "meContent.seCoverage": "",
        "meContent.seCoverage.coverageSectors": "Secteur(s) auxquels la ressource se réfèrent, comme specifié dans la codeliste sélectionnée. Le mot \u0027Secteur\u0027 indique le domaine thématique auquel la ressource se réfère. Ces secteurs peuvent être des secteurs institutionnels, économiques, etc (par exemple le secteur des services publics, l'agriculture, les secteurs forestières, les entreprises locales, etc).",
        "meContent.seCoverage.coverageSectorsDetails": "Elément textuel qui délimite les résultats en ce qui concerne les principaux secteurs couverts.",
        "meContent.seCoverage.coverageGeographic": "Couverture géographique représentée par la ressource. Il est fortement recommandé de faire référence à des macro-zones officiellement reconnues ou facilement identifiables (par exemple l'Afrique subsaharienne, l'Amérique du Nord, les pays membres de l'OECD).",
        "meContent.seCoverage.coverageTime": "Informations sur la période pour laquelle les données sont disponibles. Il demande de rapporter la fenêtre de temps de référence (en rapportant la date de début et la date de fin) même si il présent quelques manques.",

        "meInstitutionalMandate": "",
        "meInstitutionalMandate.legalActsAgreements": "Références (citations ou liens de site web) aux actes juridiques ou aux accords formels ou informels qui assignent la responsabilité ainsi que l'autorité à une agence pour la collecte, le traitement et la diffusion de la ressource.",
        "meInstitutionalMandate.institutionalMandateDataSharing": "Références (citations ou liens de site web) aux dispositions ou aux procédures pour le partage et la coordination des données.",

        "meStatisticalProcessing": "",
        "meStatisticalProcessing.seDataSource": "Processus utilisé pour collecter les données. Il comprend une description détaillée de la collecte de données primaires (par exemple, type de collecte, méthode de collecte des données des répondants, procédures d'échantillonnage ...) et la collecte de données secondaires (informations sur les données déjà recueillies par une autre agence ou institution).",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection": "",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.typeOfCollection": "Elément codifié qui spécifie le type de méthode pour la collecte de données (par exemple recensement, échantillonnage aléatoire, etc.).",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.samplingProcedure": "Le type de plan d'échantillonnage utilisé pour sélectionner les répondants à l'enquête pour représenter la population. Il peut se référer aux informations sur le plan d'échantillonnage, la taille de l'échantillon, le cadre d'échantillonnage, la mise à jour de l'échantillon, etc.",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.dataCollection": "Méthodes utilisés pour recueillir les données des répondants (par exemple, enquête postale, CAPI, enquête en ligne, entrevues face-à-face, etc.) et description des méthodes de collecte des données. Cet élément de métadonnées inclut également des informations plus précises sur le type de questionnaire (structuré, non structuré, etc.) et, si nécessaire, des aspects notables du processus de collecte des données.",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.collectionPeriodicity": "Fréquence avec laquelle les données sont collectées à partir des sources.",
        "meStatisticalProcessing.seDataSource.sePrimaryDataCollection.organization": "L'organisation est obligatoire lorsque «Autres Organisations Internationales» a été choisie dans 'originOfCollectedData' *** Si l'élément origine des données collectées a généralement été spécifié comme étant d'autres organisations internationales, cet élément demande de rapporter la source exacte de la ressource.",

        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection": "Cette section est remplie lorsque l'agence qui compile et publie les données ne coïncide pas avec l'entité (sujet, agence ou institution) qui a mené la procédure de collecte des données. Elle fournit des informations sur la source qui a déjà collecté les données.",
        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection.originOfCollectedData": "Elément codifié qui permet de spécifier, de manière standard, l'origine de la ressource.",
        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection.rawDataDescription": "Caractéristiques et composantes des données statistiques brutes utilisées pour la compilationdes agrégats statistiques. Il indique si la base de données est basée sur une enquête ou sur une source des données administrative. Si les registres administratifs sont utilisés, la description des registres doit être donnée (source, année, objectif principal, lacunes potentielles...).",
        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection.organization": "Si l'élément origine des données collectées a généralement été spécifié comme étant d'autres organisations internationales, cet élément demande de rapporter la source exacte de la ressource.",
        "meStatisticalProcessing.seDataSource.seSecondaryDataCollection.dataCollection": "Détails de la collecte des données.",


        "meStatisticalProcessing.seDataCompilation": "Cette section décrit les actions statistiques principales exploitées sur les données (par exemple l'édition des données, l'imputation, la pondération, l'ajustement pour la non-réponse, le modèle utilisé, etc).",
        "meStatisticalProcessing.seDataCompilation.missingData": "Il décrit les circonstances dans lesquelles les données manquantes sont estimées ou imputées et quand les cellules sont laissées vides. Il décrit également les méthodologies utilisées pour estimer/imputer les valeurs manquantes.",
        "meStatisticalProcessing.seDataCompilation.weights": "Description du système de poids (le cas échéant) utilisé afin de produire des résultats statistiques précis. Ce champ rapporte les critères d'utilisation des poids dans l'analyse de la collecte, les formules et les coefficients développés et la façon dans laquelle ils sont appliqués aux données.",
        "meStatisticalProcessing.seDataCompilation.aggregationProcessing": "Informations sur la méthodologie utilisée pour les données agrégées.",
        "meStatisticalProcessing.seDataCompilation.aggregationFormula": "Formule utilisée pour agréger les données.",
        "meStatisticalProcessing.seDataCompilation.dataAdjustment": "Type d'ajustement utilisé représenté par un code.",
        "meStatisticalProcessing.seDataCompilation.dataAdjustmentDetails": "Ensemble de procédures utilisées pour modifier des données statistiques pour leur permettre d'être conformes aux normes nationales ou internationales (telles que les méthodes d'ajustement saisonnier, la décomposition des séries temporelles, ou autres méthodes similaires).",
        "meStatisticalProcessing.seDataCompilation.indexType": "Type d'indice utilisé dans le processus de production statistique.",
        "meStatisticalProcessing.seDataCompilation.basePeriod": "Période de temps utilisée comme base d'un indice ou à laquella une série temporelle se réfère (par exemple, année de référence 2000 pour des données annuelles).",

        "meStatisticalProcessing.seDataValidation": "",
        "meStatisticalProcessing.seDataValidation.dataValidationIntermediate": "Evaluation de la qualité et de l'exactitude des calculs intermédiaires conduisants à des produits statistiques.",
        "meStatisticalProcessing.seDataValidation.dataValidationOutput": "Evaluation des écarts et/ou des inexactitudes observés dans les produits statistiques.",
        "meStatisticalProcessing.seDataValidation.dataValidationSource": "Evaluation des écarts et/ou des imprécisions inhérents à la source des données.",


        "meDataQuality": "Cette section fournit une description et une évaluation de la qualité des données. Elle permet de décrire le processus d'assurance de la qualité des données, y compris les normes de validation des données, de complétude et d'exactitude. En outre, une évaluation de la comparabilité et de la cohérence interne de la ressource est considerée comme une dimensione qualitative.",
        "meDataQuality.qualityManagement": "Structure, responsabilités et procédures établies pour garantir la qualité des données.",
        "meDataQuality.qualityAssessment": "Evaluation qualitative globale de la qualité des produits statistiques.",
        "meDataQuality.qualityAssurance": "Description du processus qui assure que les processus de production des données sont conformes aux normes de qualité statistique.",
        "meDataQuality.seAccuracy": "Proximité entre les calculs ou les estimations et les valeurs exactes que les statistiques visaient à mesurer. L'exactitude peut contenir des mesures des résultats numériques des méthodes d'évaluation de l'exactitude des données ou des indicateurs d'évaluation qualitative. Il peut également être décrit en terms des principales sources d'erreur qui provoquent potentiellement des inexactitudes (par exemple échantillonnage, non-réponse, réponse).",
        "meDataQuality.seAccuracy.accuracyNonSampling": "Erreurs dans les estimations d'échantillons qui ne peuvent pas être attribuées à des fluctuations d'échantillonnage. (par exemple des défauts dans le cadre d'échantillonnage, démarcation défectueuse des unités d'échantillonnage, des défauts dans la sélection des unités d'échantillonnage, des erreurs dans la collecte des données dues à des variations personnelles, des malentendues, des biais, la négligence... etc).",
        "meDataQuality.seAccuracy.accuracySampling": "Si l'échantillonnage aléatoire est utilisé, l'exactitude est une évaluation de la différence entre une valeur réelle et sa estimation, dérivée d'un échantillonnage aléatoire (donc due au fait que seulement un sous-ensemble de la population est énuméré), normalement sous forme de coefficient de variation, d'erreur standard ou d'intervalles de confiance. Pour l'échantillonnage non-aléatoire, les erreurs aléatoires ne peuvent pas être calculées sans référence à une sorte de modèle. Dans ce cas-ci, des estimations d'exactitude, une motivation pour le modèle utilisé pour cette estimation et une brève discussion des biais d'échantillonnage doivent être fournis.",
        "meDataQuality.seAccuracy.completeness": "Etat d'intégralité de la ressource.",

        "meDataQuality.seDataRevision": "Cette section décrit la politique et la pratique pour identifier l'état de révision des données, ainsi que la disponibilité des études de révision et des analyses.",
        "meDataQuality.seDataRevision.revisionPolicy": "Politique concernant la révision périodique de la ressource et l'assurance de la transparence des données diffusées.",
        "meDataQuality.seDataRevision.revisionPractice": "Informations concernants la révision des données afin de donner aux compilateurs la possibilité d'intégrer des informations nouvelles et plus précises dans la ressource. Il décrit également l'état de révision des données disponibles. Les données peuvent aussi être soumises à des révisions régulières ou ad hoc à la suite de l'introduction de classifications, cadres de compilation et méthodoligies nouveaux afin d'améliorer l'exactitude de la ressource.",

        "meDataQuality.seComparability": "Degré de compatibilité des données entre les zones ou les régions géographiques référencées par la ressource. Les données peuvent être obtenues à partir des ênquetes qui sont généralement menées par des agences statistiques différentes. Ces ênquetes font souvent référence aux populations de différentes zones géographiques, parfois basées sur méthodologies différentes.",
        "meDataQuality.seComparability.comparabilityGeographical": "Degré de compatibilité des données entre les zones ou les régions géographiques référencées par la ressource. Les données peuvent être obtenues à partir des ênquetes qui sont généralement menées par des agences statistiques différentes. Ces ênquetes font souvent référence aux populations de différentes zones géographiques, parfois basées sur méthodologies différentes.",
        "meDataQuality.seComparability.comparabilityTime": "Mesure dans laquelle les données sont comparables ou conciliables dans le temps. Elle se réfère au degré de compatibilité entre les mesures d'une série temporelle (par exemple liée à un pays, à un produit et à une variable) incluses dans la ressource.",
        "meDataQuality.seComparability.coherenceIntern": "Estimation générale de la mesure dans laquelle les données sont cohérentes avec la ressource.",

        "meAccessibility": "",
        "meAccessibility.seDataDissemination": "",
        "meAccessibility.seDataDissemination.seDistribution": "Cette section rapporte la modalité de distribution de la ressource en mettant l'accent sur la façon d'accéder à la ressource et sur les formats supportés.",
        "meAccessibility.seDataDissemination.seDistribution.onlineResource": "Lien vers la ressource en ligne. Il est conditionnel à la politique régissant la distribution et au mécanisme de partage. Il n'est pas disponible pour les ressources \u0027restreintes\u0027",
        "meAccessibility.seDataDissemination.seDistribution.disseminationFormat": "Les formats disponibles pour télécharger la ressource (par exemple Excel, CSV, PDF, etc.)... Il est conditionnel à la politique régissant la distribution et au mécanisme de partage. Il n'est pas disponible pour les ressources \u0027restreintes\u0027.",
        "meAccessibility.seDataDissemination.seReleasePolicy": "",
        "meAccessibility.seDataDissemination.seReleasePolicy.releaseCalendar": "Politique concernant la diffusion de la ressource conformément au calendrier préétabli. Il fournit également des informations sur la disponibilité du calendrier de diffusion.",
        "meAccessibility.seDataDissemination.seReleasePolicy.releaseCalendarAccess": "Lien ou références au calendrier de diffusion.",
        "meAccessibility.seDataDissemination.seReleasePolicy.disseminationPeriodicity": "Fréquence de diffusion des données (par exemple quotidienne, mensuelle, trimestrelle, annuelle).",
        "meAccessibility.seDataDissemination.seReleasePolicy.embargoTime": "Intervalle de temps entre l'achèvement du processus de production des données statistiques et leur publication.",

        "meAccessibility.seClarity": "Cette section donne des informations sur la disponibilité des informations supplémentaires (documentation, métadonnées supplémentaires...) liées à la ressource.",
        "meAccessibility.seClarity.clarity": "Degré de compréhensibilité des métadonnées disponibles. Elle indique si la ressource est accompagnée par des métadonnées appropriées et par d'autres documents pertinents.",
        "meAccessibility.seClarity.metadataCompletenessRate": "Le pourcentage de complétude des métadonnées offre une évaluation numérique du degré auquel la ressource est documentée.",

        "meAccessibility.seConfidentiality": "Cette section informe sur le niveau de confidentialité et sur la politique appliquée pour la divulgation de la ressource. Cette sous-entité des métadonnées concerne la législation (ou toute autre disposition formelle) liée à la confidentialité des statistiques appliquée à la ressource, ainsi que la confidentialité réelle du traitement des données (aussi en ce qui concerne les données agrégées diffusées).",
        "meAccessibility.seConfidentiality.confidentialityPolicy": "Des mesures législatives ou des autres procédures formales qui empêchent la divulgation non autorisée des données qui identifient, directement ou indirectement, une personne ou une entité économique. Elle consiste en une description textuelle et en des références à la législation ou à des autres règles liées à la confidentialité statistique.",
        "meAccessibility.seConfidentiality.confidentialityDataTreatment": "Des règles appliquées pour le traitement de la ressource pour assurer la confidentialité et empêcher la divulgation non autorisée.",
        "meAccessibility.seConfidentiality.confidentialityStatus": "Des informations codifiées qui décrivent le degré de confidentialité de la ressource",

        "meMaintenance": "Cette section fournit des informations sur la fréquence de mise à jour de la ressource et sur la maintenance des métadonnées.",
        "meMaintenance.maintenanceAgency": "Organisation ou autre organisme expert qui maintient la ressource.",
        "meMaintenance.seUpdate": "Cette section comprend les opérations de maintenance concernants la mise à jour périodique de la ressource.",
        "meMaintenance.seUpdate.updateDate":  "Dernière date physique de mise à jour.",
        "meMaintenance.seUpdate.updatePeriodicity": "Intervalle de temps entre la fin du processus de production des données statistiques et leur publication.",
        "meMaintenance.seMetadataMaintenance": "Cette section comprend les opérations de maintenance concernants la mise à jour périodique des métadonnées afin d'assurer que la ressource est correctement décrite.",
        "meMaintenance.seMetadataMaintenance.metadataLastCertified": "Dernière date de certification des métadonnées.",
        "meMaintenance.seMetadataMaintenance.metadataLastPosted": "Dernière date de publication des métadonnées. Elle est généralement mise à jour automatiquement par le système de production des métadonnées.",
        "meMaintenance.seMetadataMaintenance.metadataLastUpdate": "Date la plus récente de mise à jour des métadonnées.",


    }
});