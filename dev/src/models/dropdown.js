module.exports = {
    "uid" : "my uid",
    "creationDate": "1479752460000",
    "title": {
        "EN": "Population par residence"
    },
    "dsd": {
        "contextSystem": "cstat_cog",
        "datasources": ["D3S"],
        "columns": [{
            "dataType": "year",
            "title": {
                "FR": "Annee",
                "EN": "Year"
            },
            "subject": "time",
            "key": true,
            "id": "DIMENSION0"
        }, {
            "dataType": "code",
            "title": {
                "FR": "Indicateur",
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
                "FR": "Residence",
                "EN": "Residence"
            },
            "domain": {
                "codes": [{
                    "idCodeList": "CountrySTAT_Residence"
                }]
            },
            "subject": "residence",
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
            "id": "OTHER0"
        }, {
            "dataType": "code",
            "title": {
                "FR": "Unitè",
                "EN": "Unit"
            },
            "domain": {
                "codes": [{
                    "idCodeList": "CountrySTAT_UM"
                }]
            },
            "subject": "um",
            "key": false,
            "id": "OTHER1"
        }]
    },
    "meContent": {
        "description": {
            "EN": ""
        },
        "resourceRepresentationType": "dataset",
        "keywords": [""],
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
                    "code": "POP"
                }],
                "idCodeList": "CSTAT_Core"
            },
            "coverageSectorsDetails": {
                "EN": ""
            },
            "coverageTime": {
                "from": -3600000,
                "to": 1478991600000
            },
            "coverageGeographic": {
                "version": "2014",
                "codes": [{
                    "code": "59"
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
            "code": "eng"
        }],
        "idCodeList": "ISO639-2"
    },
    "contacts": [{
        "organization": {
            "EN": "Institut National de la Statistique"
        },
        "position": {
            "EN": ""
        },
        "role": "owner",
        "contactInfo": {
            "phone": "",
            "emailAddress": "philippetsemi@yahoo.fr",
            "hoursOfService": {
                "EN": ""
            },
            "contactInstruction": {
                "EN": ""
            },
            "address": ""
        },
        "pointOfContact": "Philippe Tsemi",
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
            "code": "eng"
        }],
        "idCodeList": "ISO639-2"
    }
}

