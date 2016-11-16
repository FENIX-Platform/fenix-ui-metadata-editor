define({
        "title" : {
            "EN" : "Travail"
        },
        "dsd" : {
            "contextSystem" : "cstat_mli",
            "datasources" : [ "D3S" ],
            "columns" : [ {
                "dataType" : "year",
                "title" : {
                    "FR" : "Année"
                },
                "subject" : "time",
                "key" : true,
                "id" : "DIMENSION0"
            }, {
                "dataType" : "code",
                "title" : {
                    "FR" : "Indicateurs"
                },
                "domain" : {
                    "codes" : [ {
                        "idCodeList" : "CountrySTAT_Indicators"
                    } ]
                },
                "subject" : "indicator",
                "key" : true,
                "id" : "DIMENSION1"
            }, {
                "dataType" : "code",
                "title" : {
                    "FR" : "Etiquettes"
                },
                "domain" : {
                    "codes" : [ {
                        "version" : "2.1",
                        "idCodeList" : "CPC"
                    } ]
                },
                "subject" : "item",
                "key" : true,
                "id" : "DIMENSION2"
            }, {
                "dataType" : "number",
                "title" : {
                    "FR" : "Valeurs"
                },
                "subject" : "value",
                "key" : false,
                "id" : "VALUE0"
            }, {
                "dataType" : "code",
                "title" : {
                    "FR" : "Unités"
                },
                "domain" : {
                    "codes" : [ {
                        "idCodeList" : "CountrySTAT_UM"
                    } ]
                },
                "subject" : "um",
                "key" : false,
                "id" : "OTHER0"
            }, {
                "dataType" : "code",
                "title" : {
                    "FR" : "Flag"
                },
                "domain" : {
                    "codes" : [ {
                        "idCodeList" : "Flag"
                    } ]
                },
                "subject" : "flag",
                "key" : false,
                "id" : "OTHER1"
            } ]
        },
        "meContent" : {
            "resourceRepresentationType" : "dataset"
        },
        "languageDetails" : {
            "EN" : ""
        },
        "characterSet" : {
            "codes" : [ {
                "code" : "106"
            } ],
            "idCodeList" : "IANAcharacterSet"
        },
        "metadataStandardName" : "FENIX",
        "metadataStandardVersion" : "1.0",
        "metadataLanguage" : {
            "version" : "1998",
            "codes" : [ {
                "code" : "fre"
            } ],
            "idCodeList" : "ISO639-2"
        },
        "contacts" : [ {
            "organization" : {
                "EN" : "CPS/SDR"
            },
            "position" : {
                "EN" : "CHEF D'UNITE"
            },
            "role" : "owner",
            "contactInfo" : {
                "phone" : "00223 66 85 24 05",
                "emailAddress" : "hawasow@cps-sdr.gouv.ml",
                "hoursOfService" : {
                    "EN" : "7H30 à 16H00"
                },
                "contactInstruction" : {
                    "EN" : ""
                },
                "address" : "CPS/SDR"
            },
            "pointOfContact" : "SOW Hawa",
            "specify" : {
                "EN" : ""
            },
            "organizationUnit" : {
                "EN" : "UNITE INFORMATIQUE"
            }
        } ],
        "meMaintenance" : {
            "seUpdate" : { }
        },
        "language" : {
            "version" : "1998",
            "codes" : [ {
                "code" : "fre"
            } ],
            "idCodeList" : "ISO639-2"
        }
})