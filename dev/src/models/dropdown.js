module.exports = {
    "title": {"EN": "Mio 6sssasdsa"},
    "dsd": {
        "datasources": ["D3S"],
        "contextSystem": "fenix_develop",
        "columns": [{
            "dataType": "year",
            "title": {"FR": "y", "EN": "y"},
            "subject": "time",
            "key": true,
            "id": "DIMENSION0"
        }, {
            "dataType": "code",
            "title": {"FR": "i", "EN": "i"},
            "domain": {"codes": [{"idCodeList": "CountrySTAT_Indicators"}]},
            "subject": "indicator",
            "key": true,
            "id": "DIMENSION1"
        }, {
            "dataType": "code",
            "title": {"FR": "it", "EN": "it"},
            "domain": {"codes": [{"version": "2.1", "idCodeList": "CPC"}]},
            "subject": "item",
            "key": true,
            "id": "DIMENSION2"
        }, {
            "dataType": "number",
            "title": {"FR": "v", "EN": "v"},
            "subject": "value",
            "key": false,
            "id": "VALUE0"
        }, {
            "dataType": "code",
            "title": {"FR": "u", "EN": "u"},
            "domain": {"codes": [{"idCodeList": "CountrySTAT_UM"}]},
            "subject": "um",
            "key": false,
            "id": "OTHER0"
        }, {
            "dataType": "code",
            "title": {"FR": "f", "EN": "f"},
            "domain": {"codes": [{"idCodeList": "Flag"}]},
            "subject": "flag",
            "key": false,
            "id": "OTHER1"
        }],
        "rid": "63_1824"
    },
    "meContent": {
        "description": {"EN": ""},
        "resourceRepresentationType": "dataset",
        "keywords": ["key works"],
        "statisticalConceptsDefinitions": {"EN": ""},
        "seReferencePopulation": {
            "statisticalPopulation": {"EN": "ad"},
            "statisticalUnit": {"EN": "asd"},
            "referencePeriod": {"version": "1.0", "codes": [{"code": "14"}]},
            "referenceArea": {"version": "1.0", "codes": [{"code": "ADM1"}]}
        },
        "seCoverage": {
            "coverageSectorsDetails": {"EN": "sdsd"},
            "coverageTime": {"from": -3600000, "to": 1478991600000}
        }
    },
    "meMaintenance": {"seUpdate": {"updateDate": 1479054685789}},
    "languageDetails": {"EN": ""},
    "characterSet": {"codes": [{"code": "106"}]},
    "metadataStandardName": "FENIX",
    "metadataStandardVersion": "1.0",
    "metadataLanguage": {"version": "1998", "codes": [{"code": "eng"}]},
    "language": {"version": "1998", "codes": [{"code": "eng"}]},
    "uid": "D3S_24906039283704624878537791166568519458",
    "creationDate": 1479054240000
}