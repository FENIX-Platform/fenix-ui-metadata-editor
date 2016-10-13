define(function () {

    return {
        "identification": {
            "title": "Identification",
            "description": "Basic Metadata",
            "sections": {},
            "items": {
                "title": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "title",
                                "label": "title"
                            }
                        ]
                    },
                    "template": {
                        "title": "Title",
                        "hideSwitch": false,
                        "hideRemoveButton": false
                    }
                },
                "creationDate": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "creationdate",
                                "label": "creationdate"
                            }
                        ]
                    },
                    "template": {
                        "title": "Creation Date",
                        "hideSwitch": false,
                        "hideRemoveButton": false
                    }
                },
                "characterSet": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "characterSet",
                                "label": "characterSet"
                            }
                        ]
                    },
                    "template": {
                        "title": "characterSet",
                        "hideSwitch": false,
                        "hideRemoveButton": false
                    }
                },
                "metadataStandardName": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "metadataStandardName",
                                "label": "metadataStandardName"
                            }
                        ]
                    },
                    "template": {
                        "title": "metadataStandardName",
                        "hideSwitch": false,
                        "hideRemoveButton": false
                    }
                },
                "language": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "language",
                                "label": "language"
                            }
                        ]
                    },
                    "template": {
                        "title": "language",
                        "hideSwitch": false,
                        "hideRemoveButton": false
                    }
                },
                "languageDetails": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "languageDetails",
                                "label": "languageDetails"
                            }
                        ]
                    },
                    "template": {
                        "title": "languageDetails",
                        "hideSwitch": false,
                        "hideRemoveButton": false
                    }
                },
                "metadataStandardVersion": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "metadataStandardVersion",
                                "label": "metadataStandardVersion"
                            }
                        ]
                    },
                    "template": {
                        "title": "metadataStandardVersion",
                        "hideSwitch": false,
                        "hideRemoveButton": false
                    }
                },
                "metadataLanguage": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "metadataLanguage",
                                "label": "metadataLanguage"
                            }
                        ]
                    },
                    "template": {
                        "title": "metadataLanguage",
                        "hideSwitch": false,
                        "hideRemoveButton": false
                    }
                },
                "noDataValue": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "noDataValue",
                                "label": "noDataValue"
                            }
                        ]
                    },
                    "template": {
                        "title": "noDataValue",
                        "hideSwitch": false,
                        "hideRemoveButton": false
                    }
                }
            },
            "validator": {
                "valIdentification": true
            }
        },
        "contacts": {
            "title": "Contacts",
            "description": "Responsible party that could be identify as the data source. FENIX metadata contains more than one field of the type 'ResponsibleParty' addressed to report all the information necessary to contact party(ies) playing different roles in respect to the resource. In particular this field (belonging to the Identification entity) should report the party who owns authority on the resource.",
            "sections": {},
            "items": {
                "organization": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "organization",
                                "label": "organization"
                            }
                        ]
                    },
                    "template": {
                        "title": "organization",
                        "hideSwitch": false,
                        "hideRemoveButton": false
                    }
                },
                "organizationUnit": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "organizationUnit",
                                "label": "organizationUnit"
                            }
                        ]
                    },
                    "template": {
                        "title": "organizationUnit",
                        "hideSwitch": false,
                        "hideRemoveButton": false
                    }
                },
                "pointOfContact": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "pointOfContact",
                                "label": "pointOfContact"
                            }
                        ]
                    },
                    "template": {
                        "title": "pointOfContact",
                        "hideSwitch": false,
                        "hideRemoveButton": false
                    }
                },
                "position": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "position",
                                "label": "position"
                            }
                        ]
                    },
                    "template": {
                        "title": "position",
                        "hideSwitch": false,
                        "hideRemoveButton": false
                    }
                },
                "role": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "role",
                                "label": "role"
                            }
                        ]
                    },
                    "template": {
                        "title": "role",
                        "hideSwitch": false,
                        "hideRemoveButton": false
                    }
                },
                "specify": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "specify",
                                "label": "specify"
                            }
                        ]
                    },
                    "template": {
                        "title": "specify",
                        "hideSwitch": false,
                        "hideRemoveButton": false
                    }
                },
                "contactInfo": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "contactInfo",
                                "label": "contactInfo"
                            }
                        ]
                    },
                    "template": {
                        "title": "contactInfo",
                        "hideSwitch": false,
                        "hideRemoveButton": false
                    }
                }
            },
            "validator": {
                "valContacts": true
            }
        },
        "content": {
            "title": "Content",
            "description": "This section includes a summary of the content of the resource and the description of the geographical, time and sector coverage.",
            "sections": {
                "seReferencePopulation": {
                    "title": "Reference Population",
                    "items": {
                        "statisticalPopulation": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [
                                    {
                                        "value": "statisticalPopulation",
                                        "label": "statisticalPopulation"
                                    }
                                ]
                            },
                            "template": {
                                "title": "statisticalPopulation",
                                "hideSwitch": false,
                                "hideRemoveButton": false
                            }
                        },
                        "statisticalUnit": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [
                                    {
                                        "value": "statisticalUnit",
                                        "label": "statisticalUnit"
                                    }
                                ]
                            },
                            "template": {
                                "title": "statisticalUnit",
                                "hideSwitch": false,
                                "hideRemoveButton": false
                            }
                        },
                        "referencePeriod": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [
                                    {
                                        "value": "referencePeriod",
                                        "label": "referencePeriod"
                                    }
                                ]
                            },
                            "template": {
                                "title": "referencePeriod",
                                "hideSwitch": false,
                                "hideRemoveButton": false
                            }
                        },
                        "referenceArea": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [
                                    {
                                        "value": "referenceArea",
                                        "label": "referenceArea"
                                    }
                                ]
                            },
                            "template": {
                                "title": "referenceArea",
                                "hideSwitch": false,
                                "hideRemoveButton": false
                            }
                        }
                    },
                    "validator": {
                        "valReferencePopulation": true
                    }
                },
                "seCoverage": {
                    "title": "Coverage",
                    "items": {
                        "sector": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [
                                    {
                                        "value": "sector",
                                        "label": "sector"
                                    }
                                ]
                            },
                            "template": {
                                "title": "sector",
                                "hideSwitch": false,
                                "hideRemoveButton": false
                            }
                        },
                        "coverageSectorsDetails": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [
                                    {
                                        "value": "coverageSectorsDetails",
                                        "label": "coverageSectorsDetails"
                                    }
                                ]
                            },
                            "template": {
                                "title": "coverageSectorsDetails",
                                "hideSwitch": false,
                                "hideRemoveButton": false
                            }
                        },
                        "coverageGeographic": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [
                                    {
                                        "value": "coverageGeographic",
                                        "label": "coverageGeographic"
                                    }
                                ]
                            },
                            "template": {
                                "title": "coverageGeographic",
                                "hideSwitch": false,
                                "hideRemoveButton": false
                            }
                        },
                        "coverageTime": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [
                                    {
                                        "value": "item_1",
                                        "label": "item_1"
                                    }
                                ]
                            },
                            "template": {
                                "title": "Item Title",
                                "hideSwitch": false,
                                "hideRemoveButton": false
                            }
                        }
                    },
                    "validator": {
                        "valCoverage": true
                    }
                }
            }
        }
    }

});
