module.exports = {
    "title": {
        "EN": "Disponibilité Alimentaires en kg/capita/yr"
    },
    "dsd": {
        "contextSystem": "cstat_cmr",
        "datasources": ["D3S"],
        "columns": [{
            "dataType": "year",
            "title": {
                "FR": "Année",
                "EN": "Year"
            },
            "subject": "time",
            "key": true,
            "id": "DIMENSION0"
        }, {
            "dataType": "code",
            "title": {
                "FR": "IIndicateur",
                "EN": "Indicator"
            },
            "domain": {
                "codes": [{
                    "idCodeList": "CountrySTAT_Indicators"
                }]
            },
            "subject": "indicator",
            "key": true,
            "id": "DIMENSION1"
        }, {
            "dataType": "code",
            "title": {
                "FR": "Produit",
                "EN": "Product"
            },
            "domain": {
                "codes": [{
                    "version": "2.1",
                    "idCodeList": "CPC"
                }]
            },
            "subject": "item",
            "key": true,
            "id": "DIMENSION2"
        }, {
            "dataType": "number",
            "title": {
                "FR": "Valeur",
                "EN": "Value"
            },
            "subject": "value",
            "key": false,
            "id": "VALUE0"
        }, {
            "dataType": "code",
            "title": {
                "FR": "Um",
                "EN": "Um"
            },
            "domain": {
                "codes": [{
                    "idCodeList": "CountrySTAT_UM"
                }]
            },
            "subject": "um",
            "key": false,
            "id": "OTHER0"
        }, {
            "dataType": "code",
            "title": {
                "FR": "Flag",
                "EN": "Flag"
            },
            "domain": {
                "codes": [{
                    "idCodeList": "Flag"
                }]
            },
            "subject": "flag",
            "key": false,
            "id": "OTHER1"
        }]
    },
    "meContent": {
        "description": {
            "EN": ""
        },
        "resourceRepresentationType": "dataset",
        "keywords": ["Disponibilité alimentaire"],
        "statisticalConceptsDefinitions": {
            "EN": ""
        },
        "seReferencePopulation": {
            "statisticalPopulation": {
                "EN": ""
            },
            "statisticalUnit": {
                "EN": ""
            },
            "referencePeriod": {
                "version": "1.0",
                "codes": [{
                    "code": "9"
                }],
                "idCodeList": "FAO_Period"
            },
            "referenceArea": {
                "version": "1.0",
                "codes": [{
                    "code": "ADM0"
                }],
                "idCodeList": "GAUL_ReferenceArea"
            }
        },
        "seCoverage": {
            "coverageSectors": {
                "codes": [{
                    "code": "FA"
                }],
                "idCodeList": "CSTAT_Core"
            },
            "coverageSectorsDetails": {
                "EN": ""
            },
            "coverageTime": {
                "from": -3600000,
                "to": 1479078000000
            },
            "coverageGeographic": {
                "version": "2014",
                "codes": [{
                    "code": "45"
                }],
                "idCodeList": "GAUL0"
            }
        }
    },
    "characterSet": {
        "codes": [{
            "code": "106"
        }],
        "idCodeList": "IANAcharacterSet"
    },
    "metadataStandardVersion": "1.0",
    "metadataLanguage": {
        "version": "1998",
        "codes": [{
            "code": "fre"
        }],
        "idCodeList": "ISO639-2"
    },
    "contacts": [{
        "organization": {
            "EN": "MINADER/DESA"
        },
        "position": {
            "EN": ""
        },
        "contactInfo": {
            "role" : "owner",
            "phone": "+237 77 85 96 98",
            "emailAddress": "ndjajar@yahoo.fr",
            "hoursOfService": {
                "EN": ""
            },
            "contactInstruction": {
                "EN": ""
            },
            "address": ""
        },
        "pointOfContact": "NDJE-AYEHA Jacques Robert",
        "specify": {
            "EN": ""
        },
        "organizationUnit": {
            "EN": ""
        }
    }],
    "meMaintenance": {
        "seUpdate": {}
    },
    "language": {
        "version": "1998",
        "codes": [{
            "code": "fre"
        }],
        "idCodeList": "ISO639-2"
    }
}

