define({

    "$schema": "http://json-schema.org/draft-04/schema#",

    "type": "object",

    "title": "MDSD",

    "description": "D3S 2nd Level Metadata",

    "additionalProperties": false,

    "definitions": {

        "ReferenceEntity": {

            "enum": [

                "Identification",

                "Content",

                "Institutional mandate",

                "Comparability",

                "Statistical processing",

                "Data quality",

                "Accessibility",

                "Maintenance",

                "Documents",

                "Resource dimensions",

                "Spatial representation",

                "Reference system"

            ]

        },

        "OjAxis": {

            "type": "object",

            "properties": {

                "axisName": {

                    "title": "Axis Name",

                    "type": "string",

                    "$ref": "#/definitions/AxisType"

                },

                "axisSize": {

                    "title": "Axis Size",

                    "type": "number"

                },

                "resolution": {

                    "title": "Resolution",

                    "$ref": "#/definitions/OjMeasure"

                }

            }

        },

        "OjMeasure": {

            "type": "object",

            "properties": {

                "extent": {

                    "type": "object",

                    "title": "Extent",

                    "title_i18n": {

                        "en": "Extent",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Description of the type of magnitude has been measured (e.g. a length, an area, a volume).",

                    "description_i18n": {

                        "en": "Description of the type of magnitude has been measured (e.g. a length, an area, a volume).",

                        "fr": "",

                        "es": ""

                    },

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                },

                "composedMU": {

                    "type": "boolean",

                    "title": "Composed unit of measurement",

                    "title_i18n": {

                        "en": "Composed unit of measurement",

                        "fr": "",

                        "es": ""

                    },

                    "description": "",

                    "description_i18n": {

                        "en": "Since a wide variety of phenomenon is measured combining several simple unit of measure, it is requested a Boolean element indicating whether simple or composed unit of measure is used.",

                        "fr": "",

                        "es": ""

                    }

                },

                "measurementSystem": {

                    "type": "object",

                    "title": "Measurement system",

                    "title_i18n": {

                        "en": "Measurement system",

                        "fr": "",

                        "es": ""

                    },

                    "description": "System devised to measure some physical quantity (such distance or area. . . ). Example are the English System of feet and inches or the metric system of millimetres, centimetres and meters, also the International System of Units (SI).",

                    "description_i18n": {

                        "en": "System devised to measure some physical quantity (such distance or area. . . ). Example are the English System of feet and inches or the metric system of millimetres, centimetres and meters, also the International System of Units (SI).",

                        "fr": "",

                        "es": ""

                    },

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                },

                "nameMU": {

                    "type": "string",

                    "title": "Measurement unit name",

                    "title_i18n": {

                        "en": "Measurement unit name",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Name of the simple/composed unit of measure adopted.",

                    "description_i18n": {

                        "en": "Name of the simple/composed unit of measure adopted.",

                        "fr": "",

                        "es": ""

                    }

                },

                "conversionToStandard": {

                    "type": "number",

                    "title": "Conversion to the standard",

                    "title_i18n": {

                        "en": "Conversion to the standard",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Allows to convert the unit of measure used in a standard measurement system.",

                    "description_i18n": {

                        "en": "Allows to convert the unit of measure used in a standard measurement system.",

                        "fr": "",

                        "es": ""

                    }

                }

            }

        },

        "AxisType": {

            "enum": [

                "Row",

                "Column",

                "Vertical",

                "Time"

            ]

        },

        "RepresentationType": {

            "enum": [

                "Dataset",

                "Document",

                "Geographic",

                "Codelist",

                "Other"

            ]

        },

        "CodeListType": {

            "enum": [

                "List",

                "Tree",

                "Balanced tree",

                "Oriented graph"

            ]

        },

        "ResponsiblePartyRole": {

            "enum": [

                "Owner",

                "Distributor",

                "Other",

                "Producer"

            ]

        },

        "OjContact": {

            "type": "object",

            "properties": {

                "phone": {

                    "title": "Telephone number",

                    "title_i18n": {

                        "en": "Telephone number",

                        "fr": "NumÃ©ro de tÃ©lÃ©phone",

                        "es": "NÃºmero de telÃ©fono"

                    },

                    "description": "Telephone numbers at which the organization or individual may be contacted.",

                    "description_i18n": {

                        "en": "Telephone numbers at which the organization or individual may be contacted.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "string"

                },

                "address": {

                    "title": "Address",

                    "title_i18n": {

                        "en": "Address",

                        "fr": "Adresse",

                        "es": "DirecciÃ³n"

                    },

                    "description": "Physical address at which the organization or individual may be contacted.",

                    "description_i18n": {

                        "en": "Physical address at which the organization or individual may be contacted.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "string"

                },

                "emailAddress": {

                    "title": "E-mail address",

                    "title_i18n": {

                        "en": "Adresse Email",

                        "fr": "Adresse Email",

                        "es": "DirecciÃ³n de correo electrÃ³nico"

                    },

                    "description": "E-mail address at which the organization or individual may be contacted.",

                    "description_i18n": {

                        "en": "E-mail address at which the organization or individual may be contacted.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "string"

                }

            },

            "hoursOfService": {

                "type": "object",

                "title": "Hour of service",

                "title_i18n": {

                    "en": "Hour of service",

                    "fr": "Heures de service",

                    "es": "Horarios de servicio"

                },

                "description": "Time period (including time zone) when individuals can contact the organization or individual.",

                "description_i18n": {

                    "en": "Time period (including time zone) when individuals can contact the organization or individual.",

                    "fr": "",

                    "es": ""

                },

                "patternProperties": {

                    ".{1,}": {

                        "type": "string"

                    }

                }

            },

            "contactInstruction": {

                "type": "object",

                "title": "Instruction",

                "title_i18n": {

                    "en": "Instruction",

                    "fr": "Instruction",

                    "es": "InstrucciÃ³n"

                },

                "description": "Supplemental instructions on how or when to contact the individual or organization.",

                "description_i18n": {

                    "en": "Supplemental instructions on how or when to contact the individual or organization.",

                    "fr": "",

                    "es": ""

                },

                "patternProperties": {

                    ".{1,}": {

                        "type": "string"

                    }

                }

            }

        },

        "OjResponsibleParty": {

            "type": "object",

            "properties": {

                "pointOfContact": {

                    "title": "Point of contact",

                    "title_i18n": {

                        "en": "Point of contact",

                        "fr": "Point de contact",

                        "es": "Punto de contacto"

                    },

                    "description": "Responsible person-surname, given name, title separated by a delimiter. It contains information about the party who can be contacted for acquiring knowledge the resource.",

                    "description_i18n": {

                        "en": "Responsible person-surname, given name, title separated by a delimiter. It contains information about the party who can be contacted for acquiring knowledge the resource.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "string"

                },

                "organization": {

                    "type": "object",

                    "title": "Organization",

                    "title_i18n": {

                        "en": "Organization",

                        "fr": "Organisation",

                        "es": "OrganizaciÃ³n"

                    },

                    "description": "Name of the responsible organization.",

                    "description_i18n": {

                        "en": "Name of the responsible organization.",

                        "fr": "",

                        "es": ""

                    },

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                },

                "organizationUnit": {

                    "type": "object",

                    "title": "Organization unit/division",

                    "title_i18n": {

                        "en": "Organization unit/division",

                        "fr": "UnitÃ©/division dans l\u0027organisation",

                        "es": "Unidad/divisiÃ³n de organizaciÃ³n"

                    },

                    "description": "Addressable subdivision of an organization.",

                    "description_i18n": {

                        "en": "Addressable subdivision of an organization.",

                        "fr": "",

                        "es": ""

                    },

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                },

                "position": {

                    "type": "object",

                    "title": "Position",

                    "title_i18n": {

                        "en": "Position",

                        "fr": "Position",

                        "es": "PosiciÃ³n"

                    },

                    "description": "Role or position of the responsible person.",

                    "description_i18n": {

                        "en": "Role or position of the responsible person.",

                        "fr": "",

                        "es": ""

                    },

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                },

                "role": {

                    "title": "Role",

                    "type": "string",

                    "$ref": "#/definitions/ResponsiblePartyRole"

                },

                "specify": {

                    "type": "object",

                    "title": "Specify",

                    "title_i18n": {

                        "en": "Specify",

                        "fr": "SpÃ©cifier",

                        "es": "Especificar"

                    },

                    "description": "Textual metadata element that allows to specify the role performed by the responsible party. This field is conditional to the element \u003crole\u003e.",

                    "description_i18n": {

                        "en": "Textual metadata element that allows to specify the role performed by the responsible party. This field is conditional to the element \u003crole\u003e.",

                        "fr": "",

                        "es": ""

                    },

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                },

                "contactInfo": {

                    "title": "Contact Info",

                    "$ref": "#/definitions/OjContact"

                }

            }

        },

        "DocumentType": {

            "enum": [

                "Scientific paper",

                "Methodological notes",

                "Legal document",

                "Handbook",

                "Guidelines",

                "Ad hoc press",

                "News",

                "Website",

                "Other"

            ]

        },

        "OjCitation": {

            "type": "object",

            "properties": {

                "documentKind": {

                    "title": "Document Kind",

                    "title_i18n": {

                        "en": "Document Kind",

                        "fr": "Type de document",

                        "es": "Tipo de documento"

                    },

                    "description": "Kind of resource attached to data.",

                    "description_i18n": {

                        "en": "Kind of resource attached to data.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "string",

                    "$ref": "#/definitions/DocumentType"

                },

                "title": {

                    "type": "object",

                    "title": "Title",

                    "title_i18n": {

                        "en": "Title",

                        "fr": "Titre",

                        "es": "TÃ­tulo"

                    },

                    "description": "Title by which the cited resource is known which offers a quick information about its content.",

                    "description_i18n": {

                        "en": "Title by which the cited resource is known which offers a quick information about its content.",

                        "fr": "",

                        "es": ""

                    },

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                },

                "date": {

                    "type": "string",

                    "title": "Date",

                    "title_i18n": {

                        "en": "Date",

                        "fr": "Date",

                        "es": "Fecha"

                    },

                    "description": "Reference date for the cited document.",

                    "description_i18n": {

                        "en": "Reference date for the cited document.",

                        "fr": "",

                        "es": ""

                    },

                    "format": "date"

                },

                "documentContact": {

                    "title": "Contact",

                    "title_i18n": {

                        "en": "Contact",

                        "fr": "Contact",

                        "es": "Contacto"

                    },

                    "description": "Name and position information for an individual or organization that is responsible for the resource.",

                    "description_i18n": {

                        "en": "Name and position information for an individual or organization that is responsible for the resource.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "$ref": "#/definitions/OjResponsibleParty"

                },

                "notes": {

                    "type": "object",

                    "title": "Notes",

                    "title_i18n": {

                        "en": "Notes",

                        "fr": "Remarques",

                        "es": "Notas"

                    },

                    "description": "",

                    "description_i18n": {

                        "en": "Some additional details about the resource mainly concerning the domain to which the resource refers.",

                        "fr": "",

                        "es": ""

                    },

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                },

                "link": {

                    "title": "Resource hyperlink",

                    "title_i18n": {

                        "en": "Resource hyperlink",

                        "fr": "Lien hypertexte de documents",

                        "es": "HipervÃ­nculo Documento"

                    },

                    "description": "Web site link allowing the user access to the information resource.",

                    "description_i18n": {

                        "en": "Web site link allowing the user access to the information resource.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "string"

                },

                "isbn": {

                    "title": "ISBN code",

                    "title_i18n": {

                        "en": "ISBN code",

                        "fr": "Code ISBN",

                        "es": "CÃ³digo ISBN"

                    },

                    "description": "",

                    "description_i18n": {

                        "en": "If available, the International Standard Book Number can be reported in order to uniquely identify the resource cited.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "string"

                },

                "issn": {

                    "title": "ISNN code",

                    "title_i18n": {

                        "en": "ISNN code",

                        "fr": "Code ISSN",

                        "es": "CÃ³digo ISSN"

                    },

                    "description": "If available, the International Standard Serial Number (used to identify periodical publications such as reviews and scientific journals) can be reported in order to uniquely identify the resource cited.",

                    "description_i18n": {

                        "en": "If available, the International Standard Serial Number (used to identify periodical publications such as reviews and scientific journals) can be reported in order to uniquely identify the resource cited.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "string"

                }

            }

        },

        "MeDocuments": {

            "type": "object",

            "properties": {

                "document": {

                    "type": "object",

                    "title": "Documents linked to the data",

                    "description": "Regular or ad-hoc publications linked to the resource.",

                    "$ref": "#/definitions/OjCitation"

                },

                "referenceEntity": {

                    "title": "Reference subject",

                    "type": "string",

                    "description": "The metadata entity(ies) the document refers to. This element allows users to contextualize the document by making reference to specific metadata areas.",

                    "enum": [

                        "Identification",

                        "Content",

                        "Institutional mandate",

                        "Comparability",

                        "Statistical processing",

                        "Data quality",

                        "Accessibility",

                        "Maintenance",

                        "Documents",

                        "Resource dimensions",

                        "Spatial representation",

                        "Reference system"

                    ]

                },

                "referenceElement": {

                    "type": "string",

                    "title": "Reference element",

                    "description": "The metadata element(s)the document refers to. This element allows users to contextualize the document by making reference to specific metadata element(s). The element(s) selected must belong to the metadata entity just specified in \u003c\u003creferenceEntity\u003e\u003e."

                }

            }

        },

        "OjCode": {

            "type": "object",

            "properties": {

                "code": {

                    "title": "Code",

                    "title_i18n": {

                        "en": "Code",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Alphanumeric sequence of characters that uniquely identify an attribute within a codelist.",

                    "description_i18n": {

                        "en": "Alphanumeric sequence of characters that uniquely identify an attribute within a codelist.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "string"

                },

                "label": {

                    "type": "object",

                    "title": "Label",

                    "title_i18n": {

                        "en": "Label",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Descriptive term associated to each code within a codelist.",

                    "description_i18n": {

                        "en": "Descriptive term associated to each code within a codelist.",

                        "fr": "",

                        "es": ""

                    },

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                }

            }

        },

        "OjCodeList": {

            "type": "object",

            "properties": {

                "codes": {

                    "type": "array",

                    "title": "Code(s)",

                    "title_i18n": {

                        "en": "Code(s)",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Code corresponding to the element requested by the field it refers to.",

                    "description_i18n": {

                        "en": "Code corresponding to the element requested by the field it refers to.",

                        "fr": "",

                        "es": ""

                    },

                    "items": {

                        "title": "Items",

                        "$ref": "#/definitions/OjCode"

                    }

                },

                "idCodeList": {

                    "title": "Codelist identification",

                    "title_i18n": {

                        "en": "Codelist identification",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Codelist identifier. It is an alphanumeric acronyme that identify the codelist.",

                    "description_i18n": {

                        "en": "Codelist identifier. It is an alphanumeric acronyme that identify the codelist.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "string"

                },

                "version": {

                    "title": "Version of the codelist",

                    "title_i18n": {

                        "en": "Version of the codelist",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Information about the version and the state of upgrade of the code list used.",

                    "description_i18n": {

                        "en": "Information about the version and the state of upgrade of the code list used.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "string"

                },

                "extendedName": {

                    "title": "Extended name",

                    "title_i18n": {

                        "en": "Extended name",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Full name of the codelist.",

                    "description_i18n": {

                        "en": "Full name of the codelist.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                },

                "contactInfo": {

                    "title": "Contact Info",

                    "$ref": "#/definitions/OjResponsibleParty"

                },

                "codeListResources": {

                    "type": "array",

                    "title": "Resource(s) linked to the codelist",

                    "title_i18n": {

                        "en": "Resource(s) linked to the codelist",

                        "fr": "",

                        "es": ""

                    },

                    "description": "It allows to attach documents to the codelist or simply to cite a webpage linked to the code list to which it refers to.",

                    "description_i18n": {

                        "en": "It allows to attach documents to the codelist or simply to cite a webpage linked to the code list to which it refers to.",

                        "fr": "",

                        "es": ""

                    },

                    "items": {

                        "$ref": "#/definitions/OjCitation"

                    }

                },

                "link": {

                    "title": "Codelist hyperlink",

                    "title_i18n": {

                        "en": "Codelist hyperlink",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Web site link allowing the user access to the information resource.",

                    "description_i18n": {

                        "en": "Web site link allowing the user access to the information resource.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "string"

                }

            }

        },

        "OjPeriod": {

            "type": "object",

            "properties": {

                "from": {

                    "title": "Date from",

                    "title_i18n": {

                        "en": "Date from",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Start point of time delimiting a time interval.",

                    "description_i18n": {

                        "en": "Start point of time delimiting a time interval.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "string",

                    "format": "date"

                },

                "to": {

                    "title": "Date to",

                    "title_i18n": {

                        "en": "Date to",

                        "fr": "",

                        "es": ""

                    },

                    "description": "End point of time delimiting a time interval.",

                    "description_i18n": {

                        "en": "End point of time delimiting a time interval.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "string",

                    "format": "date"

                }

            }

        },

        "OjScale": {

            "type": "object",

            "properties": {

                "minScaleFactor": {

                    "title": "Min Scale Factor",

                    "title_i18n": {

                        "en": "Min Scale Factor",

                        "fr": "",

                        "es": ""

                    },

                    "description": "",

                    "description_i18n": {

                        "en": "Min Scale Factor",

                        "fr": "",

                        "es": ""

                    },

                    "type": "number"

                },

                "maxScaleFactor": {

                    "title": "Max Scale Factor",

                    "title_i18n": {

                        "en": "Max Scale Factor",

                        "fr": "",

                        "es": ""

                    },

                    "description": "",

                    "description_i18n": {

                        "en": "Max Scale Factor.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "number"

                }

            }

        },

        "SeBand": {

            "title": "Se band",

            "title_i18n": {

                "en": "Se band",

                "fr": "",

                "es": ""

            },

            "description": "Se band",

            "description_i18n": {

                "en": "Se band",

                "fr": "",

                "es": ""

            },

            "type": "object",

            "properties": {

                "maxValue": {

                    "title": "Max Value",

                    "title_i18n": {

                        "en": "Max Value",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Max Value",

                    "description_i18n": {

                        "en": "Max Value",

                        "fr": "",

                        "es": ""

                    },

                    "type": "number"

                },

                "minValue": {

                    "title": "Min Value",

                    "title_i18n": {

                        "en": "Min Value",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Min Value",

                    "description_i18n": {

                        "en": "Min Value",

                        "fr": "",

                        "es": ""

                    },

                    "type": "number"

                },

                "bitsterValue": {

                    "title": "Bitster Value",

                    "title_i18n": {

                        "en": "Bitster Value",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Bitster Value",

                    "description_i18n": {

                        "en": "Bitster Value",

                        "fr": "",

                        "es": ""

                    },

                    "type": "number"

                },

                "scaleFactor": {

                    "title": "Scale Factor",

                    "title_i18n": {

                        "en": "Scale Factor",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Scale Factor",

                    "description_i18n": {

                        "en": "Scale Factor",

                        "fr": "",

                        "es": ""

                    },

                    "type": "number"

                },

                "offset": {

                    "title": "Offset",

                    "title_i18n": {

                        "en": "Offset",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Offset",

                    "description_i18n": {

                        "en": "Offset",

                        "fr": "",

                        "es": ""

                    },

                    "type": "number"

                }

            }

        }

    },

    "properties": {

        "uid": {

            "title": "Resource identification code",

            "title_i18n": {

                "en": "Resource identification code",

                "fr": "Code d\u0027identification de la ressource",

                "es": "CÃ³digo de identificaciÃ³n de recursos"

            },

            "description": "Resource identifier. It is a code that creates the match between the resource and the metadata it is associated to.",

            "description_i18n": {

                "en": "Resource identifier. It is a code that creates the match between the resource and the metadata it is associated to.",

                "fr": "",

                "es": ""

            },

            "type": "string",

            "propertyOrder": 1

        },

        "version": {

            "title": "Version",

            "title_i18n": {

                "en": "Version",

                "fr": "Version de la ressource",

                "es": "VersiÃ³n de Recursos"

            },

            "description": "This is the version of the metadata.",

            "description_i18n": {

                "en": "This is the version of the metadata.",

                "fr": "",

                "es": ""

            },

            "type": "string",

            "propertyOrder": 2

        },

        "language": {

            "title": "Language(s)",

            "title_i18n": {

                "en": "Language(s)",

                "fr": "Langue(s)",

                "es": "Idioma(s)"

            },

            "description": "Language used by the resource for textual information.",

            "description_i18n": {

                "en": "Language used by the resource for textual information.",

                "fr": "",

                "es": ""

            },

            "type": "object",

            "propertyOrder": 4,

            "$ref": "#/definitions/OjCodeList"

        },

        "languageDetails": {

            "title": "Language details",

            "title_i18n": {

                "en": "Language details",

                "fr": "DÃ©tails de la langue",

                "es": "Detalles del idioma"

            },

            "description": "Comments and additional details about the language used for the textual information of the resource. This field is addressed to highlight some particular inconsistencies in the language (or languages) used in the resource, if any. For example to alert that the resource is not completely homogeneous in the language used for textual information. Otherwise it can be leaved empty.",

            "description_i18n": {

                "en": "Comments and additional details about the language used for the textual information of the resource. This field is addressed to highlight some particular inconsistencies in the language (or languages) used in the resource, if any. For example to alert that the resource is not completely homogeneous in the language used for textual information. Otherwise it can be leaved empty.",

                "fr": "",

                "es": ""

            },

            "type": "object",

            "propertyOrder": 5,

            "patternProperties": {

                ".{1,}": {

                    "type": "string"

                }

            }

        },

        "title": {

            "title": "Title",

            "title_i18n": {

                "en": "Title",

                "fr": "Titre",

                "es": "TÃ­tulo"

            },

            "description": "Textual label used as title of the resource.",

            "description_i18n": {

                "en": "Textual label used as title of the resource.",

                "fr": "",

                "es": ""

            },

            "type": "object",

            "propertyOrder": 1000,

            "patternProperties": {

                ".{1,}": {

                    "type": "string"

                }

            }

        },

        "creationDate": {

            "title": "Creation date",

            "title_i18n": {

                "en": "Creation date",

                "fr": "Date de crÃ©ation",

                "es": "Fecha de creaciÃ³n"

            },

            "description": "Creation date of the resource.",

            "description_i18n": {

                "en": "Creation date of the resource.",

                "fr": "",

                "es": ""

            },

            "type": "string",

            "propertyOrder": 6,

            "format": "date"

        },

        "characterSet": {

            "title": "Character-set",

            "title_i18n": {

                "en": "Character-set",

                "fr": "CaractÃ¨re-set",

                "es": "Character-set"

            },

            "description": "Full name of the character coding standard used by the resource.",

            "description_i18n": {

                "en": "Full name of the character coding standard used by the resource.",

                "fr": "",

                "es": ""

            },

            "type": "object",

            "propertyOrder": 7,

            "$ref": "#/definitions/OjCodeList"

        },

        "metadataStandardName": {

            "title": "Used metadata standard",

            "title_i18n": {

                "en": "Used metadata standard",

                "fr": "Normes utilisÃ©es pour les mÃ©tadonnÃ©es",

                "es": "EstÃ¡ndares de metadatos usados"

            },

            "description": "Name of the metadata standard specifications used. In FENIX framework this field would be pre-compiled by \u0027FENIX\u0027.",

            "description_i18n": {

                "en": "Name of the metadata standard specifications used. In FENIX framework this field would be pre-compiled by \u0027FENIX\u0027.",

                "fr": "",

                "es": ""

            },

            "type": "string",

            "propertyOrder": 8

        },

        "metadataStandardVersion": {

            "title": "Version of metadata standard",

            "title_i18n": {

                "en": "Version of metadata standard",

                "fr": "Version des normes des mÃ©tadonnÃ©es",

                "es": "VersiÃ³n de los estÃ¡ndares de metadatos"

            },

            "description": "Version of the metadata standard specifications used.",

            "description_i18n": {

                "en": "Version of the metadata standard specifications used.",

                "fr": "",

                "es": ""

            },

            "type": "string",

            "propertyOrder": 9

        },

        "metadataLanguage": {

            "title": "Language(s) used for metadata",

            "title_i18n": {

                "en": "Language(s) used for metadata",

                "fr": "Langue (s) utilisÃ©e pour les mÃ©tadonnÃ©es",

                "es": "Idioma (s) que se utiliza para los metadatos"

            },

            "description": "",

            "description_i18n": {

                "en": "",

                "fr": "",

                "es": ""

            },

            "type": "object",

            "propertyOrder": 10,

            "$ref": "#/definitions/OjCodeList"

        },

        "contacts": {

            "title": "Contact(s)",

            "title_i18n": {

                "en": "Contact(s)",

                "fr": "Contact",

                "es": "Contacto"

            },

            "description": "Responsible party that could be identify as the data source. FENIX metadata contains more than one field of the type \u0027ResponsibleParty\u0027 addressed to report all the information necessary to contact party(ies) playing different roles in respect to the resource. In particular this field (belonging to the Identification entity) should report the party who owns authority on the resource.",

            "description_i18n": {

                "en": "Responsible party that could be identify as the data source. FENIX metadata contains more than one field of the type \u0027ResponsibleParty\u0027 addressed to report all the information necessary to contact party(ies) playing different roles in respect to the resource. In particular this field (belonging to the Identification entity) should report the party who owns authority on the resource.",

                "fr": "",

                "es": ""

            },

            "type": "array",

            "propertyOrder": 11,

            "items": {

                "$ref": "#/definitions/OjResponsibleParty"

            }

        },

        "noDataValue": {

            "title": "Value assigned to No-data",

            "title_i18n": {

                "en": "Value assigned to No-data",

                "fr": "Valeur affectÃ©e au No-donnÃ©es",

                "es": "Valor asignado al No-dato"

            },

            "description": "Value assigned to the cells to represent the absence of data. Missing values are usually highlight through apposite ags, however the data matrix does not report empty cells but a predefined combination of characters (such as \u0027NA\u0027, \u0027000\u0027 . . . ) indicating the absence of data.",

            "description_i18n": {

                "en": "Value assigned to the cells to represent the absence of data. Missing values are usually highlight through apposite ags, however the data matrix does not report empty cells but a predefined combination of characters (such as \u0027NA\u0027, \u0027000\u0027 . . . ) indicating the absence of data.",

                "fr": "",

                "es": ""

            },

            "type": "string",

            "propertyOrder": 12

        },

        "meContent": {

            "title": "CONTENT",

            "title_i18n": {

                "en": "CONTENT",

                "fr": "CONTENU",

                "es": "CONTENIDO"

            },

            "description": "This section includes a summary of the content of the resource and the description of the geographical, time and sector coverage.",

            "description_i18n": {

                "en": "This section includes a summary of the content of the resource and the description of the geographical, time and sector coverage.",

                "fr": "",

                "es": ""

            },

            "type": "object",

            "propertyOrder": 13,

            "properties": {

                "resourceRepresentationType": {

                    "title": "Type of resource",

                    "title_i18n": {

                        "en": "Type of resource",

                        "fr": "Type de ressource",

                        "es": "Tipo de recurso"

                    },

                    "description": "Typology of the resource the metadata refers to. This metadata element determines whether certain meta-data entities are, or are not applicable. For example, the metadata entities \u0027SpatialRepresentation\u0027 and \u0027ReferenceSystem\u0027 are only available for geospatial resource types (e.g. raster; vector).",

                    "description_i18n": {

                        "en": "Typology of the resource the metadata refers to. This metadata element determines whether certain meta-data entities are, or are not applicable. For example, the metadata entities \u0027SpatialRepresentation\u0027 and \u0027ReferenceSystem\u0027 are only available for geospatial resource types (e.g. raster; vector).",

                        "fr": "",

                        "es": ""

                    },

                    "type": "string",

                    "propertyOrder": 1,

                    "$ref": "#/definitions/RepresentationType"

                },

                "keywords": {

                    "title": "Keywords",

                    "title_i18n": {

                        "en": "Keywords",

                        "fr": "Mots-clÃ©s",

                        "es": "Palabras clave"

                    },

                    "description": "Commonly used word(s), formalized word(s) or phrase(s) used to describe the resource.",

                    "description_i18n": {

                        "en": "Commonly used word(s), formalized word(s) or phrase(s) used to describe the resource.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "array",

                    "propertyOrder": 2,

                    "items": {

                        "type": "string"

                    }

                },

                "description": {

                    "title": "Abstract",

                    "title_i18n": {

                        "en": "Abstract",

                        "fr": "RÃ©sumÃ©",

                        "es": "Resumen"

                    },

                    "description": "Overview of the main characteristics of the resource and summary of the information contained in the resource, in an easily understandable manner, for technical and non-technical users.",

                    "description_i18n": {

                        "en": "Overview of the main characteristics of the resource and summary of the information contained in the resource, in an easily understandable manner, for technical and non-technical users.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 3,

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                },

                "statisticalConceptsDefinitions": {

                    "title": "Statistical concepts / definitions",

                    "title_i18n": {

                        "en": "Statistical concepts / definitions",

                        "fr": "Concepts statistiques / dÃ©finitions",

                        "es": "Conceptos estadÃ­sticos y / o definiciones"

                    },

                    "description": "Definitions of the statistical concepts under measure (i.e. the statistical domain) and the main variables provided. The considered types of variables (e.g. raw figures, annual growth rates, index, ow or stock data, ...) should be defined and described in accordance with internationally accepted statistical standards, guidelines, or good practices.",

                    "description_i18n": {

                        "en": "Definitions of the statistical concepts under measure (i.e. the statistical domain) and the main variables provided. The considered types of variables (e.g. raw figures, annual growth rates, index, ow or stock data, ...) should be defined and described in accordance with internationally accepted statistical standards, guidelines, or good practices.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 4,

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                },

                "seReferencePopulation": {

                    "title": "Reference population",

                    "title_i18n": {

                        "en": "Reference population",

                        "fr": "Population de Reference",

                        "es": "Population Reference"

                    },

                    "description": "Information about the statistical population the resource refers to.",

                    "description_i18n": {

                        "en": "Information about the statistical population the resource refers to.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 5,

                    "properties": {

                        "statisticalPopulation": {

                            "title": "Statistical population",

                            "title_i18n": {

                                "en": "Statistical population",

                                "fr": "Population statistique",

                                "es": "PoblaciÃ³n estadÃ­stica"

                            },

                            "description": "Target statistical population (one or more) the resource refers to.",

                            "description_i18n": {

                                "en": "Target statistical population (one or more) the resource refers to.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 1,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "statisticalUnit": {

                            "title": "Statistical unit",

                            "title_i18n": {

                                "en": "Statistical unit",

                                "fr": "UnitÃ© statistique",

                                "es": "Unidad estadÃ­stica"

                            },

                            "description": "Simplest unit for which information is sought and for which statistics are ultimately compiled.",

                            "description_i18n": {

                                "en": "Simplest unit for which information is sought and for which statistics are ultimately compiled.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 2,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "referencePeriod": {

                            "title": "Period of reference",

                            "title_i18n": {

                                "en": "Period of reference",

                                "fr": "PÃ©riode de rÃ©fÃ©rence",

                                "es": "PerÃ­odo de referencia"

                            },

                            "description": "Specific time periods (e.g. a day, a week, a month, a fiscal year, a calendar year or several calendar years) the statistical variables refer to.",

                            "description_i18n": {

                                "en": "Specific time periods (e.g. a day, a week, a month, a fiscal year, a calendar year or several calendar years) the statistical variables refer to.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 3,

                            "$ref": "#/definitions/OjCodeList"

                        },

                        "referenceArea": {

                            "title": "Area of reference",

                            "title_i18n": {

                                "en": "Area of reference",

                                "fr": "Area de rÃ©fÃ©rence",

                                "es": "Ãrea de referencia"

                            },

                            "description": "Type of geographical units the resource represents or refers to. Note that the spatial resolution must refer to the minimum mapping unit whose bounds are officially recognized indipendently from the measurement process of the phonomenon taken into account. Examples are: countries, administrative level 2, etc.",

                            "description_i18n": {

                                "en": "Type of geographical units the resource represents or refers to. Note that the spatial resolution must refer to the minimum mapping unit whose bounds are officially recognized indipendently from the measurement process of the phonomenon taken into account. Examples are: countries, administrative level 2, etc.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 4,

                            "$ref": "#/definitions/OjCodeList"

                        }

                    }

                },

                "seCoverage": {

                    "title": "Coverage",

                    "title_i18n": {

                        "en": "Coverage",

                        "fr": "Couverture",

                        "es": "Cobertura"

                    },

                    "description": "Size and extent of the resource. The term \u0027coverage\u0027 encompasses the descriptions of key dimensions delimiting the data, e.g. geographical, institutional, product, economic sector,etc., as well as relevant exceptions and exclusions.",

                    "description_i18n": {

                        "en": "Size and extent of the resource. The term \u0027coverage\u0027 encompasses the descriptions of key dimensions delimiting the data, e.g. geographical, institutional, product, economic sector,etc., as well as relevant exceptions and exclusions.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 6,

                    "properties": {

                        "coverageSectors": {

                            "title": "Main sector(s) (coded)",

                            "title_i18n": {

                                "en": "Main sector(s) (coded)",

                                "fr": "Secteur(s) principal  (code)",

                                "es": "Sector(es) principal (codificado)"

                            },

                            "description": "Sector(s) the resource refers to as specified in the selected codelist. The word \u0027Sector\u0027 indicates the subject area the resource refers to. These sectors can be institutional sectors, economic or other sectors (e.g. local government sector, agriculture, forestry, business services, etc.).",

                            "description_i18n": {

                                "en": "Sector(s) the resource refers to as specified in the selected codelist. The word \u0027Sector\u0027 indicates the subject area the resource refers to. These sectors can be institutional sectors, economic or other sectors (e.g. local government sector, agriculture, forestry, business services, etc.).",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 1,

                            "$ref": "#/definitions/OjCodeList"

                        },

                        "coverageSectorsDetails": {

                            "title": "Main sector(s)",

                            "title_i18n": {

                                "en": "Main sector(s)",

                                "fr": "Secteur(s) principal",

                                "es": "Sector(es) principal"

                            },

                            "description": "Textual element delimiting the statistical results with regard to the main sectors covered.",

                            "description_i18n": {

                                "en": "Textual element delimiting the statistical results with regard to the main sectors covered.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 2,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "coverageTime": {

                            "title": "Coverage period",

                            "title_i18n": {

                                "en": "Coverage period",

                                "fr": "Temps de couverture",

                                "es": "Cobertura temporal"

                            },

                            "description": "Information about the time period for which data are available. It requests to report the time window of reference (reporting the starting date and the ending date) even if it presents some lacks.",

                            "description_i18n": {

                                "en": "Information about the time period for which data are available. It requests to report the time window of reference (reporting the starting date and the ending date) even if it presents some lacks.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 3,

                            "$ref": "#/definitions/OjPeriod"

                        },

                        "coverageGeographic": {

                            "title": "Geographic extent",

                            "title_i18n": {

                                "en": "Geographic extent",

                                "fr": "Ã‰tendue gÃ©ographique",

                                "es": "ExtensiÃ³n geogrÃ¡fica"

                            },

                            "description": "Geographical coverage represented by the resource. It is highly recommended to make reference to officially recognized or easily identifiable macro-areas (e.g. South Saharan Africa, North America, OECD member countries..).",

                            "description_i18n": {

                                "en": "Geographical coverage represented by the resource. It is highly recommended to make reference to officially recognized or easily identifiable macro-areas (e.g. South Saharan Africa, North America, OECD member countries..).",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 4,

                            "$ref": "#/definitions/OjCodeList"

                        }

                    }

                },

                "seCodeList": {

                    "title": "Codelist",

                    "title_i18n": {

                        "en": "Codelist",

                        "fr": "",

                        "es": ""

                    },

                    "description": "This section allows to report information specifically addressed to resources of the kind \u0027codelist\u0027.",

                    "description_i18n": {

                        "en": "This section allows to report information specifically addressed to resources of the kind \u0027codelist\u0027.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 7,

                    "properties": {

                        "numberOfLevels": {

                            "title": "Number of levels",

                            "title_i18n": {

                                "en": "Number of levels",

                                "fr": "",

                                "es": ""

                            },

                            "description": "Hierarchical codelists may have several levels, information about the number of levels must be reported in order to describe the hierchy of the codelist.",

                            "description_i18n": {

                                "en": "Hierarchical codelists may have several levels, information about the number of levels must be reported in order to describe the hierchy of the codelist.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 1

                        },

                        "typeOfCodeList": {

                            "title": "Type of codelist",

                            "title_i18n": {

                                "en": "Type of codelist",

                                "fr": "",

                                "es": ""

                            },

                            "description": "Codelist typology. A codelist can be a simple objects basically composed by a list of couples of code and label or a more complex object whose elements present some hierarchical relationships.",

                            "description_i18n": {

                                "en": "Codelist typology. A codelist can be a simple objects basically composed by a list of couples of code and label or a more complex object whose elements present some hierarchical relationships.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "string",

                            "propertyOrder": 2,

                            "$ref": "#/definitions/CodeListType"

                        }

                    }

                }

            }

        },

        "meInstitutionalMandate": {

            "title": "INSTITUTIONAL MANDATE",

            "title_i18n": {

                "en": "INSTITUTIONAL MANDATE",

                "fr": "MANDAT INSTITUTIONNEL",

                "es": "MANDATO INSTITUCIONAL"

            },

            "description": "This section includes the formal set of instructions assigning responsibility as well as the authority to an organization for the collection, processing, and dissemination of statistics.",

            "description_i18n": {

                "en": "This section includes the formal set of instructions assigning responsibility as well as the authority to an organization for the collection, processing, and dissemination of statistics.",

                "fr": "",

                "es": ""

            },

            "type": "object",

            "propertyOrder": 14,

            "properties": {

                "legalActsAgreements": {

                    "title": "Legal acts/agreements",

                    "title_i18n": {

                        "en": "Legal acts/agreements",

                        "fr": "Actes juridiques / accords",

                        "es": "Actos jurÃ­dicos / acuerdos"

                    },

                    "description": "References (citations or website link) to legal acts or other formal or informal agreements that assign responsibility as well as authority to an agency for the collection, processing, and dissemination of the resource.",

                    "description_i18n": {

                        "en": "References (citations or website link) to legal acts or other formal or informal agreements that assign responsibility as well as authority to an agency for the collection, processing, and dissemination of the resource.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 1,

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                },

                "institutionalMandateDataSharing": {

                    "title": "Data sharing arrangements",

                    "title_i18n": {

                        "en": "Data sharing arrangements",

                        "fr": "Dispositions pour le partage des donnÃ©es",

                        "es": "Acuerdos de Datos"

                    },

                    "description": "References (citations or website link) to arrangements or procedures for data sharing and coordination.",

                    "description_i18n": {

                        "en": "References (citations or website link) to arrangements or procedures for data sharing and coordination.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 2,

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                }

            }

        },

        "meStatisticalProcessing": {

            "title": "STATISTICAL PROCESSING",

            "title_i18n": {

                "en": "STATISTICAL PROCESSING",

                "fr": "TRAITEMENT STATISTIQUE",

                "es": "PROCESAMIENTO ESTADÃSTICO"

            },

            "description": "This section describes the statistical operations and transformations applied to data. It includes the process used to collect data, the description of raw data and a detailed review of the process used to compute processed resource.",

            "description_i18n": {

                "en": "This section describes the statistical operations and transformations applied to data. It includes the process used to collect data, the description of raw data and a detailed review of the process used to compute processed resource.",

                "fr": "",

                "es": ""

            },

            "type": "object",

            "propertyOrder": 15,

            "properties": {

                "seDataSource": {

                    "title": "Data source",

                    "title_i18n": {

                        "en": "Data source",

                        "fr": "Source de donnÃ©es",

                        "es": "Fuente de datos"

                    },

                    "description": "Process used to collect data. It includes a detailed description both of the primary data collection (e.g. type of collection, method to gather data from respondents, sampling procedures..) and the secondary data collection (information about data that have been already collected by another agency or institution).",

                    "description_i18n": {

                        "en": "Process used to collect data. It includes a detailed description both of the primary data collection (e.g. type of collection, method to gather data from respondents, sampling procedures..) and the secondary data collection (information about data that have been already collected by another agency or institution).",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 1,

                    "properties": {

                        "sePrimaryDataCollection": {

                            "title": "Primary Data Collection",

                            "title_i18n": {

                                "en": "Primary Data Collection",

                                "fr": "",

                                "es": ""

                            },

                            "description": "This section describes the procedures used to collect data obtained directly from first-hand sources by means of surveys, observation or experimentation.",

                            "description_i18n": {

                                "en": "This section describes the procedures used to collect data obtained directly from first-hand sources by means of surveys, observation or experimentation.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 1,

                            "properties": {

                                "dataCollector": {

                                    "title": "Data collector",

                                    "title_i18n": {

                                        "en": "Data collector",

                                        "fr": "Collecteur de donnÃ©es",

                                        "es": "Colector de datos"

                                    },

                                    "description": "The entity (individual, agency or institution) responsible for administering the questionnaire or interview or compiling the data.",

                                    "description_i18n": {

                                        "en": "The entity (individual, agency or institution) responsible for administering the questionnaire or interview or compiling the data.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 1,

                                    "$ref": "#/definitions/OjResponsibleParty"

                                },

                                "typeOfCollection": {

                                    "title": "Type of collection",

                                    "title_i18n": {

                                        "en": "Type of collection",

                                        "fr": "Type de collection",

                                        "es": "Tipo de colecciÃ³n"

                                    },

                                    "description": "Coded element which specifies the type of data collection method (e.g. census, random sampling, etc.).",

                                    "description_i18n": {

                                        "en": "Coded element which specifies the type of data collection method (e.g. census, random sampling, etc.).",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 2,

                                    "$ref": "#/definitions/OjCodeList"

                                },

                                "samplingProcedure": {

                                    "title": "Sampling procedure",

                                    "title_i18n": {

                                        "en": "Sampling procedure",

                                        "fr": "ProcÃ©dure d\u0027Ã©chantillonnage",

                                        "es": "Procedimiento de muestreo"

                                    },

                                    "description": "The type of sample design used to select the survey respondents to represent the population. It may refer to information on sample design, sample size, sample frame, sample updating etc.",

                                    "description_i18n": {

                                        "en": "The type of sample design used to select the survey respondents to represent the population. It may refer to information on sample design, sample size, sample frame, sample updating etc.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 3,

                                    "patternProperties": {

                                        ".{1,}": {

                                            "type": "string"

                                        }

                                    }

                                },

                                "dataCollection": {

                                    "title": "Data collection",

                                    "title_i18n": {

                                        "en": "Data collection",

                                        "fr": "Collecte des donnÃ©es",

                                        "es": "RecolecciÃ³n de datos"

                                    },

                                    "description": "Methods used to gather data from the respondents (e.g. postal survey, CAPI, on-line survey, face-to-face interviews etc.) and description of data collection methods. This metadata element also includes more precise information about the kind of questionnaire (structured, unstructured etc.) and if necessary somenoteworthy aspects of the data collection process.",

                                    "description_i18n": {

                                        "en": "Methods used to gather data from the respondents (e.g. postal survey, CAPI, on-line survey, face-to-face interviews etc.) and description of data collection methods. This metadata element also includes more precise information about the kind of questionnaire (structured, unstructured etc.) and if necessary somenoteworthy aspects of the data collection process.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 4,

                                    "patternProperties": {

                                        ".{1,}": {

                                            "type": "string"

                                        }

                                    }

                                },

                                "collectionPeriodicity": {

                                    "title": "Periodicity of data collection",

                                    "title_i18n": {

                                        "en": "Periodicity of data collection",

                                        "fr": "PÃ©riodicitÃ© de la collecte de donnÃ©es",

                                        "es": "Periodicidad de la recogida de datos"

                                    },

                                    "description": "Frequency with which the data are collected from the sources.",

                                    "description_i18n": {

                                        "en": "Frequency with which the data are collected from the sources.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 5,

                                    "$ref": "#/definitions/OjCodeList"

                                }

                            }

                        },

                        "seSecondaryDataCollection": {

                            "title": "Secondary Data Collection",

                            "title_i18n": {

                                "en": "Secondary Data Collection",

                                "fr": "",

                                "es": ""

                            },

                            "description": "This section is filled when the agency compiling and publishing data does not coincide with the entity (subject, agency or institution) who has conducted the procedure of collecting data. It reports information about the source that have already collected data.",

                            "description_i18n": {

                                "en": "This section is filled when the agency compiling and publishing data does not coincide with the entity (subject, agency or institution) who has conducted the procedure of collecting data. It reports information about the source that have already collected data.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 2,

                            "properties": {

                                "originOfCollectedData": {

                                    "title": "Origin of collected data",

                                    "title_i18n": {

                                        "en": "Origin of collected data",

                                        "fr": "Origine des donnÃ©es recueillies",

                                        "es": "Origen de los datos recogidos"

                                    },

                                    "description": "Coded element which allows to specify in a standard way the origin of the resource.",

                                    "description_i18n": {

                                        "en": "Coded element which allows to specify in a standard way the origin of the resource.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 1,

                                    "$ref": "#/definitions/OjCodeList"

                                },

                                "organization": {

                                    "title": "Organization",

                                    "title_i18n": {

                                        "en": "Organization",

                                        "fr": "Organisation",

                                        "es": "OrganizaciÃ³n"

                                    },

                                    "description": "If the element \u003c\u003coriginOfCollectedData\u003e\u003e has been generally specified as \u0027other International Organizations\u0027 this element requests to report the exact source of the resource.",

                                    "description_i18n": {

                                        "en": "If the element \u003c\u003coriginOfCollectedData\u003e\u003e has been generally specified as \u0027other International Organizations\u0027 this element requests to report the exact source of the resource.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 2,

                                    "patternProperties": {

                                        ".{1,}": {

                                            "type": "string"

                                        }

                                    }

                                },

                                "rawDataDescription": {

                                    "title": "Description of raw data",

                                    "title_i18n": {

                                        "en": "Description of raw data",

                                        "fr": "Description des donnÃ©es brutes",

                                        "es": "DescripciÃ³n de los datos en bruto"

                                    },

                                    "description": "Characteristics and components of the raw statistical data used for compiling statistical aggregates. It indicates if data set is based on a survey or on administrative data source. If administrative registers are used, the description of registers should be given (source, year, primary purpose, potential deficiencies. . . ).",

                                    "description_i18n": {

                                        "en": "Characteristics and components of the raw statistical data used for compiling statistical aggregates. It indicates if data set is based on a survey or on administrative data source. If administrative registers are used, the description of registers should be given (source, year, primary purpose, potential deficiencies. . . ).",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 3,

                                    "patternProperties": {

                                        ".{1,}": {

                                            "type": "string"

                                        }

                                    }

                                },

                                "dataCollection": {

                                    "title": "Data collection",

                                    "title_i18n": {

                                        "en": "Data collection",

                                        "fr": "Collecte des donnÃ©es",

                                        "es": "RecolecciÃ³n de datos"

                                    },

                                    "description": "Data collection details",

                                    "description_i18n": {

                                        "en": "Data collection details",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 4,

                                    "patternProperties": {

                                        ".{1,}": {

                                            "type": "string"

                                        }

                                    }

                                }

                            }

                        }

                    }

                },

                "seDataCompilation": {

                    "title": "Data compilation",

                    "title_i18n": {

                        "en": "Data compilation",

                        "fr": "Compilation des donnÃ©es",

                        "es": "RecopilaciÃ³n de datos"

                    },

                    "description": "This section describes the main statistics actions operated on data (e.g. data editing, imputation, weighting, adjustment for non-response, model used etc.).",

                    "description_i18n": {

                        "en": "This section describes the main statistics actions operated on data (e.g. data editing, imputation, weighting, adjustment for non-response, model used etc.).",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 2,

                    "properties": {

                        "missingData": {

                            "title": "Missing data",

                            "title_i18n": {

                                "en": "Missing data",

                                "fr": "Les donnÃ©es manquantes",

                                "es": "Datos que faltan"

                            },

                            "description": "It describe under which circumstance missing data are estimated or imputed and when the cells are left empty. It also describe methodologies used to estimate/impute missing values.",

                            "description_i18n": {

                                "en": "It describe under which circumstance missing data are estimated or imputed and when the cells are left empty. It also describe methodologies used to estimate/impute missing values.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 1,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "weights": {

                            "title": "Weights",

                            "title_i18n": {

                                "en": "Weights",

                                "fr": "Poids",

                                "es": "Pesos"

                            },

                            "description": "Description of weights system (if any) used in order to produce accurate statistical results. This field reports the criteria for using weights in analysis of collection, the formulas and coefficients developed and how they are applied to data.",

                            "description_i18n": {

                                "en": "Description of weights system (if any) used in order to produce accurate statistical results. This field reports the criteria for using weights in analysis of collection, the formulas and coefficients developed and how they are applied to data.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 2,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "aggregationProcessing": {

                            "title": "Process of aggregation",

                            "title_i18n": {

                                "en": "Process of aggregation",

                                "fr": "Processus d\u0027agrÃ©gation",

                                "es": "Proceso de agregaciÃ³n"

                            },

                            "description": "Information about the methodology used to aggregate data.",

                            "description_i18n": {

                                "en": "Information about the methodology used to aggregate data.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 3,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "aggregationFormula": {

                            "title": "Aggregation formula",

                            "title_i18n": {

                                "en": "Aggregation formula",

                                "fr": "Formule d\u0027agrÃ©gation",

                                "es": "FÃ³rmula de agregaciÃ³n"

                            },

                            "description": "Formula used to aggregate data.",

                            "description_i18n": {

                                "en": "Formula used to aggregate data.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "string",

                            "propertyOrder": 4

                        },

                        "dataAdjustment": {

                            "title": "Process of adjustment",

                            "title_i18n": {

                                "en": "Process of adjustment",

                                "fr": "Processus d\u0027ajustement",

                                "es": "Proceso de ajuste"

                            },

                            "description": "Type of adjustment used represented by a code.",

                            "description_i18n": {

                                "en": "Type of adjustment used represented by a code.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 5,

                            "$ref": "#/definitions/OjCodeList"

                        },

                        "dataAdjustmentDetails": {

                            "title": "Details on process of adjustment",

                            "title_i18n": {

                                "en": "Details on process of adjustment",

                                "fr": "DÃ©tails sur le processus d\u0027ajustement",

                                "es": "Detalles sobre el proceso de ajuste"

                            },

                            "description": "Set of procedures employed to modify statistical data to enable it to be conform with national or international standards (such as seasonal adjustment methods, time series decomposition, or other similar methods).",

                            "description_i18n": {

                                "en": "Set of procedures employed to modify statistical data to enable it to be conform with national or international standards (such as seasonal adjustment methods, time series decomposition, or other similar methods).",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 6,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "indexType": {

                            "title": "Type of index",

                            "title_i18n": {

                                "en": "Type of index",

                                "fr": "Type d\u0027indice",

                                "es": "Tipo de Ã­ndice"

                            },

                            "description": "Type of index number used in the statistical production process.",

                            "description_i18n": {

                                "en": "Type of index number used in the statistical production process.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 7,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "basePeriod": {

                            "title": "Base period",

                            "title_i18n": {

                                "en": "Base period",

                                "fr": "PÃ©riode de base",

                                "es": "PerÃ­odo-base "

                            },

                            "description": "Period of time used as a base of an index number or to which a time series refers (e.g. base year 2000 for certain annual data).",

                            "description_i18n": {

                                "en": "Period of time used as a base of an index number or to which a time series refers (e.g. base year 2000 for certain annual data).",

                                "fr": "",

                                "es": ""

                            },

                            "type": "string",

                            "propertyOrder": 8,

                            "format": "date"

                        }

                    }

                },

                "seDataValidation": {

                    "title": "Data Validation",

                    "title_i18n": {

                        "en": "Data Validation",

                        "fr": "Validation des donnÃ©es",

                        "es": "ValidaciÃ³n de datos"

                    },

                    "description": "Methods and processes for assessing statistical data. It describes the process of monitoring data compilation progress and ensuring the quality of the statistical results.",

                    "description_i18n": {

                        "en": "Methods and processes for assessing statistical data. It describes the process of monitoring data compilation progress and ensuring the quality of the statistical results.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 3,

                    "properties": {

                        "dataValidationIntermediate": {

                            "title": "Data validation - intermediate",

                            "title_i18n": {

                                "en": "Data validation - intermediate",

                                "fr": "Validation des donnÃ©es - intermÃ©diaire",

                                "es": "ValidaciÃ³n de datos - intermedio"

                            },

                            "description": "Assessment of the quality and correctness of intermediate calculations leading to statistical outputs.",

                            "description_i18n": {

                                "en": "Assessment of the quality and correctness of intermediate calculations leading to statistical outputs.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 2,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "dataValidationOutput": {

                            "title": "Data validation - output",

                            "title_i18n": {

                                "en": "Data validation - output",

                                "fr": "Validation des donnÃ©es - output",

                                "es": "ValidaciÃ³n de datos - salida"

                            },

                            "description": "Assessment of discrepancies and/or inaccuracies observed in the statistical outputs.",

                            "description_i18n": {

                                "en": "Assessment of discrepancies and/or inaccuracies observed in the statistical outputs.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 3,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "dataValidationSource": {

                            "title": "Data validation - source",

                            "title_i18n": {

                                "en": "Data validation - source",

                                "fr": "Validation des donnÃ©es - sources",

                                "es": "ValidaciÃ³n de datos - fuente"

                            },

                            "description": "Assessment of discrepancies and/or inaccuracies inherent to the data source.",

                            "description_i18n": {

                                "en": "Assessment of discrepancies and/or inaccuracies inherent to the data source.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 1,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        }

                    }

                }

            }

        },

        "meDataQuality": {

            "title": "DATA QUALITY",

            "title_i18n": {

                "en": "DATA QUALITY",

                "fr": "QUALITÃ‰ DES DONNÃ‰ES",

                "es": "CALIDAD DE LOS DATOS"

            },

            "description": "This section provides a description and evaluation of the data quality. It allows to describe the data quality assurance process, inclusive of data validation, completeness and accuracy standards. In addition an assessment of the comparability and intern coherence of the resource is considered a quality dimension.",

            "description_i18n": {

                "en": "This section provides a description and evaluation of the data quality. It allows to describe the data quality assurance process, inclusive of data validation, completeness and accuracy standards. In addition an assessment of the comparability and intern coherence of the resource is considered a quality dimension.",

                "fr": "",

                "es": ""

            },

            "type": "object",

            "propertyOrder": 16,

            "properties": {

                "qualityManagement": {

                    "title": "Quality management",

                    "title_i18n": {

                        "en": "Quality management",

                        "fr": "Gestion de la qualitÃ©",

                        "es": "GestiÃ³n de la calidad"

                    },

                    "description": "Structure, responsibilities and procedures established for guaranteeing the quality of the data.",

                    "description_i18n": {

                        "en": "Structure, responsibilities and procedures established for guaranteeing the quality of the data.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 1,

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                },

                "qualityAssessment": {

                    "title": "Data quality assessment",

                    "title_i18n": {

                        "en": "Data quality assessment",

                        "fr": "Ã‰valuation de la qualitÃ© des donnÃ©es",

                        "es": "EvaluaciÃ³n de la calidad de datos"

                    },

                    "description": "Overall qualitative assessment of the quality of the statistical outputs.",

                    "description_i18n": {

                        "en": "Overall qualitative assessment of the quality of the statistical outputs.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 3,

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                },

                "qualityAssurance": {

                    "title": "Quality assurance",

                    "title_i18n": {

                        "en": "Quality assurance",

                        "fr": "Assurance de la qualitÃ©",

                        "es": "Seguro de calidad"

                    },

                    "description": "Description of the process assuring that the data production processes conforms to the statistical quality standards.",

                    "description_i18n": {

                        "en": "Description of the process assuring that the data production processes conforms to the statistical quality standards.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 2,

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                },

                "seAccuracy": {

                    "title": "Accuracy",

                    "title_i18n": {

                        "en": "Accuracy",

                        "fr": "PrÃ©cision",

                        "es": "PrecisiÃ³n"

                    },

                    "description": "Closeness of computations or estimates to the exact values that the statistics were intended to measure. Accuracy can contain either measures of numerical results of the methods for assessing the accuracy of data or qualitative assessment indicators. It may also be described in terms of the major sources of error that potentially cause inaccuracy (e.g. sampling, non-response, response error).",

                    "description_i18n": {

                        "en": "Closeness of computations or estimates to the exact values that the statistics were intended to measure. Accuracy can contain either measures of numerical results of the methods for assessing the accuracy of data or qualitative assessment indicators. It may also be described in terms of the major sources of error that potentially cause inaccuracy (e.g. sampling, non-response, response error).",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 6,

                    "properties": {

                        "accuracyNonSampling": {

                            "title": "Accuracy - non sampling error",

                            "title_i18n": {

                                "en": "Accuracy - non sampling error",

                                "fr": "PrÃ©cision - erreur pas due au Ã©chantillonnage",

                                "es": "PrecisiÃ³n - sin error de muestreo"

                            },

                            "description": "Error in sample estimates which cannot be attributed to sampling fluctuations. (e.g. defects in the sampling frame, faulty demarcation of sample units, defects in the selection of sample units, mistakes in the collection of data due to personal variations, misunderstanding, bias, negligence . . . etc.)",

                            "description_i18n": {

                                "en": "Error in sample estimates which cannot be attributed to sampling fluctuations. (e.g. defects in the sampling frame, faulty demarcation of sample units, defects in the selection of sample units, mistakes in the collection of data due to personal variations, misunderstanding, bias, negligence . . . etc.)",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 1,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "accuracySampling": {

                            "title": "Accuracy - sampling error",

                            "title_i18n": {

                                "en": "Accuracy - sampling error",

                                "fr": "PrÃ©cision - erreur d\u0027Ã©chantillonnage",

                                "es": "PrecisiÃ³n - error de muestreo"

                            },

                            "description": "If probability sampling is used, the accuracy is an evaluation of difference between a population value and an estimate thereof, derived from a random sample (so due to the fact that only a subset of the population is enumerate), normally in the form of coefficient of variation, standard error or confidence intervals. For non-probability sampling, random errors cannot be calculated without reference to some kind of model, in this case estimates of the accuracy, a motivation for the invoked model for this estimation and brief discussion of sampling bias should be provided.",

                            "description_i18n": {

                                "en": "If probability sampling is used, the accuracy is an evaluation of difference between a population value and an estimate thereof, derived from a random sample (so due to the fact that only a subset of the population is enumerate), normally in the form of coefficient of variation, standard error or confidence intervals. For non-probability sampling, random errors cannot be calculated without reference to some kind of model, in this case estimates of the accuracy, a motivation for the invoked model for this estimation and brief discussion of sampling bias should be provided.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 2,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "completeness": {

                            "title": "Completeness",

                            "title_i18n": {

                                "en": "Completeness",

                                "fr": "ExhaustivitÃ©",

                                "es": "Exhaustividad"

                            },

                            "description": "State of completeness of the resource.",

                            "description_i18n": {

                                "en": "State of completeness of the resource.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 3,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        }

                    }

                },

                "seDataRevision": {

                    "title": "Data revision",

                    "title_i18n": {

                        "en": "Data revision",

                        "fr": "RÃ©vision des donnÃ©es",

                        "es": "Fecha de revisiÃ³n"

                    },

                    "description": "This section describes the policy and practice for identifying the revision status of the data, as well as the availability of revision studies and analysis.",

                    "description_i18n": {

                        "en": "This section describes the policy and practice for identifying the revision status of the data, as well as the availability of revision studies and analysis.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 7,

                    "properties": {

                        "revisionPolicy": {

                            "title": "Revision policy",

                            "title_i18n": {

                                "en": "Revision policy",

                                "fr": "Politique de rÃ©vision",

                                "es": "PolÃ­tica de revisiones"

                            },

                            "description": "Policy concerning the periodically revision of the resource and ensuring the transparency of disseminated data.",

                            "description_i18n": {

                                "en": "Policy concerning the periodically revision of the resource and ensuring the transparency of disseminated data.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 1,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "revisionPractice": {

                            "title": "Revision practice",

                            "title_i18n": {

                                "en": "Revision practice",

                                "fr": "Pratique de la rÃ©vision des donnÃ©es",

                                "es": "PrÃ¡cticas Fecha de revisiÃ³n"

                            },

                            "description": "Information concerning the revision of data in order to give compilers the possibility of incorporating new and more accurate information in the resource. It also describes the revision status of available data. Data may also be subject to regular or ad hoc revisions as a result of the introduction of new classification, compilation frameworks and methodologies in order to improve the accuracy of the resource.",

                            "description_i18n": {

                                "en": "Information concerning the revision of data in order to give compilers the possibility of incorporating new and more accurate information in the resource. It also describes the revision status of available data. Data may also be subject to regular or ad hoc revisions as a result of the introduction of new classification, compilation frameworks and methodologies in order to improve the accuracy of the resource.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 2,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        }

                    }

                },

                "seComparability": {

                    "title": "Comparability Coherence",

                    "title_i18n": {

                        "en": "Comparability Coherence",

                        "fr": "ComparabilitÃ©, cohÃ©rence",

                        "es": "Comparabilidad y coherencia"

                    },

                    "description": "Degree of data comparability across the geographic areas or regions referenced by the resource. Data might be derived from surveys that in general are conducted by different statistical agencies. These surveys often refer to populations of different geographical areas, sometimes based on different methodologies.",

                    "description_i18n": {

                        "en": "Degree of data comparability across the geographic areas or regions referenced by the resource. Data might be derived from surveys that in general are conducted by different statistical agencies. These surveys often refer to populations of different geographical areas, sometimes based on different methodologies.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 8,

                    "properties": {

                        "comparabilityGeographical": {

                            "title": "Geographic comparability",

                            "title_i18n": {

                                "en": "Geographic comparability",

                                "fr": "ComparabilitÃ© gÃ©ographique",

                                "es": "Comparabilidad temporal"

                            },

                            "description": "Degree of data comparability across the geographic areas or regions referenced by the resource. Data might be derived from surveys that in general are conducted by different statistical agencies. These surveys often refer to populations of different geographical areas, sometimes based on different methodologies.",

                            "description_i18n": {

                                "en": "Degree of data comparability across the geographic areas or regions referenced by the resource. Data might be derived from surveys that in general are conducted by different statistical agencies. These surveys often refer to populations of different geographical areas, sometimes based on different methodologies.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 1,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "comparabilityTime": {

                            "title": "Time comparability",

                            "title_i18n": {

                                "en": "Time comparability",

                                "fr": "ComparabilitÃ© du temps",

                                "es": "Comparabilidad Tiempo"

                            },

                            "description": "Extent to which data are comparable or reconcilable over time. It refers to the degree of comparability between the measures of a time series (e.g. related to a country, a commodity and a variable) included in the resource.",

                            "description_i18n": {

                                "en": "Extent to which data are comparable or reconcilable over time. It refers to the degree of comparability between the measures of a time series (e.g. related to a country, a commodity and a variable) included in the resource.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 2,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "coherenceIntern": {

                            "title": "Internal coherence",

                            "title_i18n": {

                                "en": "Internal coherence",

                                "fr": "CohÃ©rence interne",

                                "es": "Coherencia interna"

                            },

                            "description": "General estimate of the extent to which data are consistent within the resource.",

                            "description_i18n": {

                                "en": "General estimate of the extent to which data are consistent within the resource.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 3,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        }

                    }

                }

            }

        },

        "meAccessibility": {

            "title": "ACCESSIBILITY",

            "title_i18n": {

                "en": "ACCESSIBILITY",

                "fr": "ACCESSIBILITÃ‰",

                "es": "ACCESIBILIDAD"

            },

            "description": "This section reports details about data distribution and sharing mechanisms. It includes information on conditions and formal agreements under which statistical information can be obtained. In addition it provides details on available options to obtain a resource, such as user accessibility to data and dissemination periodicity.",

            "description_i18n": {

                "en": "This section reports details about data distribution and sharing mechanisms. It includes information on conditions and formal agreements under which statistical information can be obtained. In addition it provides details on available options to obtain a resource, such as user accessibility to data and dissemination periodicity.",

                "fr": "",

                "es": ""

            },

            "type": "object",

            "propertyOrder": 17,

            "properties": {

                "seDataDissemination": {

                    "title": "DATA DISSEMINATION",

                    "title_i18n": {

                        "en": "DATA DISSEMINATION",

                        "fr": "DIFFUSION DE DONNÃ‰ES",

                        "es": "DISTRIBUCIÃ“N DE DATOS"

                    },

                    "description": "This section reports the mode of distribution of the resource with a focus on how to access the resource, the supported formats.",

                    "description_i18n": {

                        "en": "This section reports the mode of distribution of the resource with a focus on how to access the resource, the supported formats.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 1,

                    "properties": {

                        "seDistribution": {

                            "title": "Distribution",

                            "title_i18n": {

                                "en": "Distribution",

                                "fr": "Distribution",

                                "es": "DistribuciÃ³n"

                            },

                            "description": "This section reports the mode of distribution of the resource with a focus on how to access the resource, the supported formats.",

                            "description_i18n": {

                                "en": "This section reports the mode of distribution of the resource with a focus on how to access the resource, the supported formats.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 1,

                            "properties": {

                                "onlineResource": {

                                    "title": "Link to the on-line resource",

                                    "title_i18n": {

                                        "en": "Link to the on-line resource",

                                        "fr": "Lien vers la ressource en ligne",

                                        "es": "HipervÃ­nculo Recursos"

                                    },

                                    "description": "Link to the on-line resource. It is conditional to the policy governing distribution and sharing mechanism. For \u0027restricted\u0027 resources it is not available.",

                                    "description_i18n": {

                                        "en": "Link to the on-line resource. It is conditional to the policy governing distribution and sharing mechanism. For \u0027restricted\u0027 resources it is not available.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "string",

                                    "propertyOrder": 1

                                },

                                "disseminationFormat": {

                                    "title": "Dissemination formats",

                                    "title_i18n": {

                                        "en": "Dissemination formats",

                                        "fr": "Formats de diffusion",

                                        "es": "Formatos de distribuciÃ³n"

                                    },

                                    "description": "Formats available for downloading the resources (e.g. excel, csv, pdf, etc.). . . It is conditional to the policy governing distribution and sharing mechanism. For \u0027restricted\u0027 resources it is not available.",

                                    "description_i18n": {

                                        "en": "Formats available for downloading the resources (e.g. excel, csv, pdf, etc.). . . It is conditional to the policy governing distribution and sharing mechanism. For \u0027restricted\u0027 resources it is not available.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "array",

                                    "propertyOrder": 2,

                                    "items": {

                                        "type": "string"

                                    }

                                }

                            }

                        },

                        "seReleasePolicy": {

                            "title": "Release Policy",

                            "title_i18n": {

                                "en": "Release Policy",

                                "fr": "Politique de publication",

                                "es": "PolÃ­tica de lanzamiento"

                            },

                            "description": "",

                            "description_i18n": {

                                "en": "",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 2,

                            "properties": {

                                "releaseCalendar": {

                                    "title": "Release calendar",

                                    "title_i18n": {

                                        "en": "Release calendar",

                                        "fr": "Calendrier de publication",

                                        "es": "Calendario de lanzamientos"

                                    },

                                    "description": "Policy regarding the release of the resource in accordance with the pre-announced schedule. It also provides information on the availability of the release calendar.",

                                    "description_i18n": {

                                        "en": "Policy regarding the release of the resource in accordance with the pre-announced schedule. It also provides information on the availability of the release calendar.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 1,

                                    "patternProperties": {

                                        ".{1,}": {

                                            "type": "string"

                                        }

                                    }

                                },

                                "releaseCalendarAccess": {

                                    "title": "Access to the release calendar",

                                    "title_i18n": {

                                        "en": "Access to the release calendar",

                                        "fr": "AccÃ¨s au calendrier de publication",

                                        "es": "Acceso al calendario de publicaciÃ³n"

                                    },

                                    "description": "Link or references to the release calendar.",

                                    "description_i18n": {

                                        "en": "Link or references to the release calendar.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "string",

                                    "propertyOrder": 2

                                },

                                "disseminationPeriodicity": {

                                    "title": "Dissemination periodicity",

                                    "title_i18n": {

                                        "en": "Dissemination periodicity",

                                        "fr": "PÃ©riodicitÃ© de diffusion",

                                        "es": "Periodicidad difusiÃ³n"

                                    },

                                    "description": "Frequency of data dissemination (e.g. daily, monthly, quarterly, yearly).",

                                    "description_i18n": {

                                        "en": "Frequency of data dissemination (e.g. daily, monthly, quarterly, yearly).",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 3,

                                    "$ref": "#/definitions/OjCodeList"

                                },

                                "embargoTime": {

                                    "title": "Embargo time",

                                    "title_i18n": {

                                        "en": "Embargo time",

                                        "fr": "Temps de Embargo",

                                        "es": "Tiempo de embargo"

                                    },

                                    "description": "Time span between the completion of the production process of statistical data and their publication.",

                                    "description_i18n": {

                                        "en": "Time span between the completion of the production process of statistical data and their publication.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 4,

                                    "$ref": "#/definitions/OjPeriod"

                                }

                            }

                        }

                    }

                },

                "seClarity": {

                    "title": "Clarity",

                    "title_i18n": {

                        "en": "Clarity",

                        "fr": "ClartÃ©",

                        "es": "Claridad"

                    },

                    "description": "This section gives information about the availability of additional information (documentation, further metadata. . . ) linked to the resource.",

                    "description_i18n": {

                        "en": "This section gives information about the availability of additional information (documentation, further metadata. . . ) linked to the resource.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 2,

                    "properties": {

                        "clarity": {

                            "title": "Clarity",

                            "title_i18n": {

                                "en": "Clarity",

                                "fr": "ClartÃ©",

                                "es": "Claridad"

                            },

                            "description": "Extent to which easily comprehensible metadata are available. It indicates whether a resource is accompanied by appropriate metadata and other relevant documentation.",

                            "description_i18n": {

                                "en": "Extent to which easily comprehensible metadata are available. It indicates whether a resource is accompanied by appropriate metadata and other relevant documentation.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 1,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "metadataCompletenessRate": {

                            "title": "Metadata completeness rate",

                            "title_i18n": {

                                "en": "Metadata completeness rate",

                                "fr": "Taux de complÃ©tude des mÃ©tadonnÃ©es",

                                "es": "Porcentaje de integridad -Metadata"

                            },

                            "description": "The percentage of completeness of metadata offers a numerical evaluation of the extent to which the resource is documented.",

                            "description_i18n": {

                                "en": "The percentage of completeness of metadata offers a numerical evaluation of the extent to which the resource is documented.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 2

                        }

                    }

                },

                "seConfidentiality": {

                    "title": "Confidentiality",

                    "title_i18n": {

                        "en": "Confidentiality",

                        "fr": "ConfidentialitÃ©",

                        "es": "Confidencialidad"

                    },

                    "description": "This section information on the level of confidentiality and the applied policy for releasing the resource. This metadata sub-entity concerns legislation (or any other formal provision) related to statistical confidentiality applied to the resource as well as the actual confidentiality data treatment applied (also with regard to the aggregated data disseminated).",

                    "description_i18n": {

                        "en": "This section information on the level of confidentiality and the applied policy for releasing the resource. This metadata sub-entity concerns legislation (or any other formal provision) related to statistical confidentiality applied to the resource as well as the actual confidentiality data treatment applied (also with regard to the aggregated data disseminated).",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 3,

                    "properties": {

                        "confidentialityPolicy": {

                            "title": "Confidentiality - Policy",

                            "title_i18n": {

                                "en": "Confidentiality - Policy",

                                "fr": "ConfidentialitÃ© - Politique",

                                "es": "Confidencialidad - PolÃ­tica"

                            },

                            "description": "Legislative measures or other formal procedures which prevent unauthorized disclosure of data that identify a person or economic entity either directly or indirectly. It consists in textual description and references to legislation or other rules related to statistical confidentiality.",

                            "description_i18n": {

                                "en": "Legislative measures or other formal procedures which prevent unauthorized disclosure of data that identify a person or economic entity either directly or indirectly. It consists in textual description and references to legislation or other rules related to statistical confidentiality.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 1,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "confidentialityDataTreatment": {

                            "title": "Confidentiality - Data treatment",

                            "title_i18n": {

                                "en": "Confidentiality - Data treatment",

                                "fr": "ConfidentialitÃ© - Traitement des donnÃ©es",

                                "es": "Tratamiento de datos - Privacidad"

                            },

                            "description": "Rules applied for treating the resource to ensure confidentiality and prevent unauthorized disclosure.",

                            "description_i18n": {

                                "en": "Rules applied for treating the resource to ensure confidentiality and prevent unauthorized disclosure.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 2,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "confidentialityStatus": {

                            "title": "Status of confidentiality",

                            "title_i18n": {

                                "en": "Status of confidentiality",

                                "fr": "Statut de la confidentialitÃ©",

                                "es": "Estado de confidencialidad"

                            },

                            "description": "Coded information describing the degree of confidentiality of the resource.",

                            "description_i18n": {

                                "en": "Coded information describing the degree of confidentiality of the resource.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 3,

                            "$ref": "#/definitions/OjCodeList"

                        }

                    }

                }

            }

        },

        "meMaintenance": {

            "title": "MAINTENANCE",

            "title_i18n": {

                "en": "MAINTENANCE",

                "fr": "MAINTENANCE",

                "es": "MANTENIMIENTO"

            },

            "description": "This section provides information about the frequency of resource upgrade and metadata maintenance.",

            "description_i18n": {

                "en": "This section provides information about the frequency of resource upgrade and metadata maintenance.",

                "fr": "",

                "es": ""

            },

            "type": "object",

            "propertyOrder": 18,

            "properties": {

                "maintenanceAgency": {

                    "title": "Maintenance agency",

                    "title_i18n": {

                        "en": "Maintenance agency",

                        "fr": "Agence de Maintenance",

                        "es": "Agencia de Mantenimiento"

                    },

                    "description": "Organization or other expert body that maintains the resource.",

                    "description_i18n": {

                        "en": "Organization or other expert body that maintains the resource.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 1,

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                },

                "seUpdate": {

                    "title": "Update",

                    "title_i18n": {

                        "en": "Update",

                        "fr": "Mise Ã  jour",

                        "es": "ActualizaciÃ³n"

                    },

                    "description": "This section involves maintenance operations concerning the periodic update of the resource.",

                    "description_i18n": {

                        "en": "This section involves maintenance operations concerning the periodic update of the resource.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 2,

                    "properties": {

                        "updateDate": {

                            "title": "Last update date",

                            "title_i18n": {

                                "en": "Last update date",

                                "fr": "DerniÃ¨re date de mise Ã  jour",

                                "es": "Ãšltima fecha de actualizaciÃ³n"

                            },

                            "description": "Last physical update date.",

                            "description_i18n": {

                                "en": "Last physical update date.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "string",

                            "propertyOrder": 1,

                            "format": "date"

                        },

                        "updatePeriodicity": {

                            "title": "Frequency of update",

                            "title_i18n": {

                                "en": "Frequency of update",

                                "fr": "FrÃ©quence de mise Ã  jour",

                                "es": "Frecuencia de actualizaciÃ³n"

                            },

                            "description": "Frequency of upgrade.",

                            "description_i18n": {

                                "en": "Frequency of upgrade.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 2,

                            "$ref": "#/definitions/OjCodeList"

                        }

                    }

                },

                "seMetadataMaintenance": {

                    "title": "Metadata Maintenance",

                    "title_i18n": {

                        "en": "Metadata Maintenance",

                        "fr": "Maintenance des MÃ©tadonnÃ©es",

                        "es": "Mantenimiento de metadatos"

                    },

                    "description": "This section involves maintenance operations concerning the periodic update of metadata to ensure that the resource is properly described.",

                    "description_i18n": {

                        "en": "This section involves maintenance operations concerning the periodic update of metadata to ensure that the resource is properly described.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 3,

                    "properties": {

                        "metadataLastCertified": {

                            "title": "Metadata last certified",

                            "title_i18n": {

                                "en": "Metadata last certified",

                                "fr": "Dernier mÃ©tadonnÃ©es certifiÃ©es",

                                "es": "Metadatos Ãºltima certificada"

                            },

                            "description": "Latest date of certification of the metadata.",

                            "description_i18n": {

                                "en": "Latest date of certification of the metadata.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "string",

                            "propertyOrder": 1,

                            "format": "date"

                        },

                        "metadataLastPosted": {

                            "title": "Metadata last posted",

                            "title_i18n": {

                                "en": "Metadata last posted",

                                "fr": "Dernier mÃ©tadonnÃ©es telechargÃ©es",

                                "es": "Metadatos Ãºltimo publicado"

                            },

                            "description": "Latest date of publication of the metadata. It is usually automatically updated by the metadata production system.",

                            "description_i18n": {

                                "en": "Latest date of publication of the metadata. It is usually automatically updated by the metadata production system.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "string",

                            "propertyOrder": 2,

                            "format": "date"

                        },

                        "metadataLastUpdate": {

                            "title": "Metadata last update",

                            "title_i18n": {

                                "en": "Metadata last update",

                                "fr": "Dernier mÃ©tadonnÃ©es mises Ã  jour",

                                "es": "Metadatos Ãºltima actualizaciÃ³n"

                            },

                            "description": "Most recent date of update of the metadata.",

                            "description_i18n": {

                                "en": "Most recent date of update of the metadata.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "string",

                            "propertyOrder": 3,

                            "format": "date"

                        }

                    }

                }

            }

        },

        "meDocuments": {

            "title": "DOCUMENTS",

            "title_i18n": {

                "en": "DOCUMENTS",

                "fr": "DOCUMENT",

                "es": "DOCUMENTO"

            },

            "description": "This section allows linking publications, news, or other relevant material to the considered resource.",

            "description_i18n": {

                "en": "This section allows linking publications, news, or other relevant material to the considered resource.",

                "fr": "",

                "es": ""

            },

            "type": "array",

            "propertyOrder": 19,

            "items": {

                "$ref": "#/definitions/MeDocuments"

            }

        },

        "meSpatialRepresentation": {

            "title": "SPATIAL REPRESENTATION",

            "title_i18n": {

                "en": "SPATIAL REPRESENTATION",

                "fr": "",

                "es": ""

            },

            "description": "This section includes information about the mechanism to represent spatial information both in raster and vector formats. It includes concepts for describing and manipulating the spatial characteristics of geographic features. This metadata entity is only valid for geospatial resources like vector and raster layers or TINs. Depending on the value assumed by its resourceRepresentationType element, it extends to GridSpatialRepresentation entity (for resourceRepresentationType \u003d \u0027raster\u0027) or VectorSpatialRepresentation (for resourceRepresentationType \u003d \u0027vector\u0027 or \u0027tin\u0027).",

            "description_i18n": {

                "en": "This section includes information about the mechanism to represent spatial information both in raster and vector formats. It includes concepts for describing and manipulating the spatial characteristics of geographic features. This metadata entity is only valid for geospatial resources like vector and raster layers or TINs. Depending on the value assumed by its resourceRepresentationType element, it extends to GridSpatialRepresentation entity (for resourceRepresentationType \u003d \u0027raster\u0027) or VectorSpatialRepresentation (for resourceRepresentationType \u003d \u0027vector\u0027 or \u0027tin\u0027).",

                "fr": "",

                "es": ""

            },

            "type": "object",

            "propertyOrder": 21,

            "properties": {

                "layerType": {

                    "title": "Type of layer",

                    "title_i18n": {

                        "en": "Type of layer",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Layer typology: vector or raster spatial representation.",

                    "description_i18n": {

                        "en": "Layer typology: vector or raster spatial representation.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 1

                },

                "typeOfProduct": {

                    "title": "Type of product",

                    "title_i18n": {

                        "en": "Type of product",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Coded information about the product managed.",

                    "description_i18n": {

                        "en": "Coded information about the product managed.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 2,

                    "$ref": "#/definitions/OjCodeList"

                },

                "processing": {

                    "title": "Processing",

                    "title_i18n": {

                        "en": "Processing",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Analytical method used to process the geographic dataset.",

                    "description_i18n": {

                        "en": "Analytical method used to process the geographic dataset.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 3,

                    "$ref": "#/definitions/OjCodeList"

                },

                "noDataValue": {

                    "title": "Value assigned to No-data",

                    "title_i18n": {

                        "en": "Value assigned to No-data",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Value assigned to the cells to represent the absence of data.",

                    "description_i18n": {

                        "en": "Value assigned to the cells to represent the absence of data.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "string",

                    "propertyOrder": 4

                },

                "seBoundingBox": {

                    "title": "Bounding Box",

                    "title_i18n": {

                        "en": "Bounding Box",

                        "fr": "",

                        "es": ""

                    },

                    "description": "This section includes the planar measurement units used to express the X,Y values. The bounding box indicates the smaller quadrilateral shape that includes all features of the considered resource.",

                    "description_i18n": {

                        "en": "This section includes the planar measurement units used to express the X,Y values. The bounding box indicates the smaller quadrilateral shape that includes all features of the considered resource.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 5,

                    "properties": {

                        "xmin": {

                            "title": "West bound longitude",

                            "title_i18n": {

                                "en": "West bound longitude",

                                "fr": "",

                                "es": ""

                            },

                            "description": "The smaller X coordinate value delimiting the resource.",

                            "description_i18n": {

                                "en": "The smaller X coordinate value delimiting the resource.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 1

                        },

                        "xmax": {

                            "title": "East bound longitude",

                            "title_i18n": {

                                "en": "East bound longitude",

                                "fr": "",

                                "es": ""

                            },

                            "description": "The higher X coordinate value delimiting the resource.",

                            "description_i18n": {

                                "en": "The higher X coordinate value delimiting the resource.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 2

                        },

                        "ymin": {

                            "title": "South bound latitude",

                            "title_i18n": {

                                "en": "South bound latitude",

                                "fr": "",

                                "es": ""

                            },

                            "description": "The smaller Y coordinate value delimiting the resource (mandatory.",

                            "description_i18n": {

                                "en": "The smaller Y coordinate value delimiting the resource (mandatory.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 3

                        },

                        "ymax": {

                            "title": "North bound latitude",

                            "title_i18n": {

                                "en": "North bound latitude",

                                "fr": "",

                                "es": ""

                            },

                            "description": "The higher Y coordinate value delimiting the resource.",

                            "description_i18n": {

                                "en": "The higher Y coordinate value delimiting the resource.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 4

                        },

                        "seGridSpatialRepresentation": {

                            "title": "Grid Spatial Representation",

                            "title_i18n": {

                                "en": "Grid Spatial Representation",

                                "fr": "",

                                "es": ""

                            },

                            "description": "This section reports the parameters about a grid (raster) resource.",

                            "description_i18n": {

                                "en": "This section reports the parameters about a grid (raster) resource.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 5,

                            "properties": {

                                "numberOfDimensions": {

                                    "title": "Number of dimension",

                                    "title_i18n": {

                                        "en": "Number of dimension",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Number of independent spatial-temporal axes. For ex-ample, a grid dataset representing the topography of an area has 3 dimensions: x, y for the planar representation of the area and z reporting the elevation value of each cell.",

                                    "description_i18n": {

                                        "en": "Number of independent spatial-temporal axes. For ex-ample, a grid dataset representing the topography of an area has 3 dimensions: x, y for the planar representation of the area and z reporting the elevation value of each cell.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 1

                                },

                                "axisDimensionProperties": {

                                    "title": "Information about spatial-temporal axis properties",

                                    "title_i18n": {

                                        "en": "Information about spatial-temporal axis properties",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Reference to the OJ Dimensions object that reports information about spatial-temporal axis properties.",

                                    "description_i18n": {

                                        "en": "Reference to the OJ Dimensions object that reports information about spatial-temporal axis properties.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 2,

                                    "$ref": "#/definitions/OjAxis"

                                },

                                "cellGeometry": {

                                    "title": "Identification of grid data as point or cell",

                                    "title_i18n": {

                                        "en": "Identification of grid data as point or cell",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Specifies whether each pixel of the raster data represents a point or an area. A raster with the cell geometry as point assumes that the features to represent, or the values to report, refers to the center of the cell; cell geometry as area represents the whole area covered by the cell (e.g. averages of values falling within the cell; dominant feature of the cell, etc.).",

                                    "description_i18n": {

                                        "en": "Specifies whether each pixel of the raster data represents a point or an area. A raster with the cell geometry as point assumes that the features to represent, or the values to report, refers to the center of the cell; cell geometry as area represents the whole area covered by the cell (e.g. averages of values falling within the cell; dominant feature of the cell, etc.).",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 3

                                },

                                "cellOfOrigin": {

                                    "title": "Origin of raster cell",

                                    "title_i18n": {

                                        "en": "Origin of raster cell",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Origin of the raster is the lower left or the upper left cell.",

                                    "description_i18n": {

                                        "en": "Origin of the raster is the lower left or the upper left cell.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 4

                                },

                                "xyPosition": {

                                    "title": "Coordinate of the origin within the cell",

                                    "title_i18n": {

                                        "en": "Coordinate of the origin within the cell",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Whether coordinates of the origin of the raster refer to the center or the corner of the cell of origin.",

                                    "description_i18n": {

                                        "en": "Whether coordinates of the origin of the raster refer to the center or the corner of the cell of origin.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 5

                                },

                                "mdBand": {

                                    "title": "Band Collection",

                                    "title_i18n": {

                                        "en": "Band Collection",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Band Collection",

                                    "description_i18n": {

                                        "en": "Band Collection",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "array",

                                    "propertyOrder": 6,

                                    "items": {

                                        "$ref": "#/definitions/SeBand"

                                    }

                                }

                            }

                        },

                        "seVectorSpatialRepresentation": {

                            "title": "Vector Spatial Representation",

                            "title_i18n": {

                                "en": "Vector Spatial Representation",

                                "fr": "",

                                "es": ""

                            },

                            "description": "This section reports information about the vector spatial objects in the dataset.",

                            "description_i18n": {

                                "en": "This section reports information about the vector spatial objects in the dataset.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 6,

                            "properties": {

                                "topologyLevel": {

                                    "title": "Degree of complexity of the spatial relationships",

                                    "title_i18n": {

                                        "en": "Degree of complexity of the spatial relationships",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Degree of complexity of the spatial relationships expressed through a code list.",

                                    "description_i18n": {

                                        "en": "Degree of complexity of the spatial relationships expressed through a code list.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 1,

                                    "$ref": "#/definitions/OjCodeList"

                                },

                                "geometricObjects": {

                                    "title": "Geometric object",

                                    "title_i18n": {

                                        "en": "Geometric object",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Information about the geometric objects used in the dataset (e.g. point, line, polygon, etc.) expressed through a multipleChoice.",

                                    "description_i18n": {

                                        "en": "Information about the geometric objects used in the dataset (e.g. point, line, polygon, etc.) expressed through a multipleChoice.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 2

                                },

                                "mapUnit": {

                                    "title": "Map Unit",

                                    "title_i18n": {

                                        "en": "Map Unit",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Map Unit",

                                    "description_i18n": {

                                        "en": "Map Unit",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 3,

                                    "$ref": "#/definitions/OjCodeList"

                                },

                                "scaleRange": {

                                    "title": "Scale Range",

                                    "title_i18n": {

                                        "en": "Scale Range",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Scale Range",

                                    "description_i18n": {

                                        "en": "Scale Range",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 4,

                                    "$ref": "#/definitions/OjScale"

                                }

                            }

                        }

                    }

                }

            }

        },

        "meReferenceSystem": {

            "title": "REFERENCE SYSTEM",

            "title_i18n": {

                "en": "REFERENCE SYSTEM",

                "fr": "",

                "es": ""

            },

            "description": "This section includes temporal and coordinate identifiers. It contains all the required information to uniquely identify a point on the earth surface. It also defines the transformations and conversions parameters to convert from one coordinate reference system (CRS) to another. This metadata entity includes the parameters specifying the geospatial references that relate information represented in the data (features) to their geographic space. The considered reference system is only based on coordinates and not on geographic identifiers.",

            "description_i18n": {

                "en": "This section includes temporal and coordinate identifiers. It contains all the required information to uniquely identify a point on the earth surface. It also defines the transformations and conversions parameters to convert from one coordinate reference system (CRS) to another. This metadata entity includes the parameters specifying the geospatial references that relate information represented in the data (features) to their geographic space. The considered reference system is only based on coordinates and not on geographic identifiers.",

                "fr": "",

                "es": ""

            },

            "type": "object",

            "propertyOrder": 22,

            "properties": {

                "referenceSystemIdentifier": {

                    "title": "Identifier of reference system",

                    "title_i18n": {

                        "en": "Identifier of reference system",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Identifier of the reference system. One of the most common standards for reference systems is the EPSG Geodetic Parameter Registry, created by the European Petroleum Survey Group.",

                    "description_i18n": {

                        "en": "Identifier of the reference system. One of the most common standards for reference systems is the EPSG Geodetic Parameter Registry, created by the European Petroleum Survey Group.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "string",

                    "propertyOrder": 1

                },

                "referenceSystemName": {

                    "title": "Extented name of reference system",

                    "title_i18n": {

                        "en": "Extented name of reference system",

                        "fr": "",

                        "es": ""

                    },

                    "description": "Alias or the name of the reference system.",

                    "description_i18n": {

                        "en": "Alias or the name of the reference system.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 2,

                    "patternProperties": {

                        ".{1,}": {

                            "type": "string"

                        }

                    }

                },

                "referenceSystemAuthority": {

                    "title": "Reference system authority",

                    "title_i18n": {

                        "en": "Reference system authority",

                        "fr": "",

                        "es": ""

                    },

                    "description": "It is an element of the type ResponsibleParty providing details on the authority linked to the referece system.",

                    "description_i18n": {

                        "en": "It is an element of the type ResponsibleParty providing details on the authority linked to the referece system.",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 3,

                    "$ref": "#/definitions/OjResponsibleParty"

                },

                "seProjection": {

                    "title": "Projection",

                    "title_i18n": {

                        "en": "Projection",

                        "fr": "",

                        "es": ""

                    },

                    "description": "This section provides the identifiers of the projection of the considered Coordinate Reference System (CRS).",

                    "description_i18n": {

                        "en": "This section provides the identifiers of the projection of the considered Coordinate Reference System (CRS).",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 4,

                    "properties": {

                        "projection": {

                            "title": "Projection",

                            "title_i18n": {

                                "en": "Projection",

                                "fr": "",

                                "es": ""

                            },

                            "description": "Identifier of the projection used.",

                            "description_i18n": {

                                "en": "Identifier of the projection used.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 1,

                            "$ref": "#/definitions/OjCodeList"

                        },

                        "projectionName": {

                            "title": "Name of projection",

                            "title_i18n": {

                                "en": "Name of projection",

                                "fr": "",

                                "es": ""

                            },

                            "description": "Name of the projection used contains the set of parameters that describe the projection.",

                            "description_i18n": {

                                "en": "Name of the projection used contains the set of parameters that describe the projection.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 2,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "seProjectionParameters": {

                            "title": "PROJECTION PARAMETERS",

                            "title_i18n": {

                                "en": "PROJECTION PARAMETERS",

                                "fr": "",

                                "es": ""

                            },

                            "description": "This section contains the set of parameters that describe the projection.",

                            "description_i18n": {

                                "en": "This section contains the set of parameters that describe the projection.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 3,

                            "properties": {

                                "zone": {

                                    "title": "Zone",

                                    "title_i18n": {

                                        "en": "Zone",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Unique identifier for 100,000-meter grid zone.",

                                    "description_i18n": {

                                        "en": "Unique identifier for 100,000-meter grid zone.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 1

                                },

                                "standardParallel": {

                                    "title": "Standard parallel",

                                    "title_i18n": {

                                        "en": "Standard parallel",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Line of constant latitude where the projection surface intersects the earth.",

                                    "description_i18n": {

                                        "en": "Line of constant latitude where the projection surface intersects the earth.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 2

                                },

                                "longitudeOfCentralMeridian": {

                                    "title": "Longitude of central meridian",

                                    "title_i18n": {

                                        "en": "Longitude of central meridian",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Line of longitude at the center of a map projection generally used as the basis for constructing the projection.",

                                    "description_i18n": {

                                        "en": "Line of longitude at the center of a map projection generally used as the basis for constructing the projection.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 3

                                },

                                "latitudeOfProjectionOrigin": {

                                    "title": "Latitude of projection origin",

                                    "title_i18n": {

                                        "en": "Latitude of projection origin",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Latitude chosen as the origin of the coordinates for a map projection.",

                                    "description_i18n": {

                                        "en": "Latitude chosen as the origin of the coordinates for a map projection.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 4

                                },

                                "falseEasting": {

                                    "title": "False easting",

                                    "title_i18n": {

                                        "en": "False easting",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Value added to all \u0027x\u0027 values to the coordinates for a map projection. It is expressed in the unit of measure identified in Planar Coordinate Unit.",

                                    "description_i18n": {

                                        "en": "Value added to all \u0027x\u0027 values to the coordinates for a map projection. It is expressed in the unit of measure identified in Planar Coordinate Unit.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 5

                                },

                                "falseNorthing": {

                                    "title": "False northing",

                                    "title_i18n": {

                                        "en": "False northing",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Value added to all \u0027y\u0027 values to the coordinates for a map projection. This value frequently is assigned to eliminate negative numbers. It is expressed in the unit of measure identified in Planar Coordinates Units.",

                                    "description_i18n": {

                                        "en": "Value added to all \u0027y\u0027 values to the coordinates for a map projection. This value frequently is assigned to eliminate negative numbers. It is expressed in the unit of measure identified in Planar Coordinates Units.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 6

                                },

                                "falseEastingNorthingUnits": {

                                    "title": "Unit of measure of false easting/northing",

                                    "title_i18n": {

                                        "en": "Unit of measure of false easting/northing",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Unit of the falseEasting and falseNorthing.",

                                    "description_i18n": {

                                        "en": "Unit of the falseEasting and falseNorthing.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 7,

                                    "$ref": "#/definitions/OjMeasure"

                                },

                                "scaleFactorAtEquator": {

                                    "title": "Scale factor at the equator",

                                    "title_i18n": {

                                        "en": "Scale factor at the equator",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Ratio between the distance on earth and the corresponding map distance, along the equator.",

                                    "description_i18n": {

                                        "en": "Ratio between the distance on earth and the corresponding map distance, along the equator.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 8

                                },

                                "heightOfProspectivePointAboveSurface": {

                                    "title": "Height of view point above the Earth (m)",

                                    "title_i18n": {

                                        "en": "Height of view point above the Earth (m)",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Height of viewpoint above the Earth expressed in meters.",

                                    "description_i18n": {

                                        "en": "Height of viewpoint above the Earth expressed in meters.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 9

                                },

                                "longitudeOfProjectionCenter": {

                                    "title": "Longitude of projection centre",

                                    "title_i18n": {

                                        "en": "Longitude of projection centre",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Longitude of the point of projection for azimuthal projections.",

                                    "description_i18n": {

                                        "en": "Longitude of the point of projection for azimuthal projections.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 10

                                },

                                "latitudeOfProjectionCenter": {

                                    "title": "Latitude of projection center",

                                    "title_i18n": {

                                        "en": "Latitude of projection center",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Latitude of the point of projection for azimuthal projections.",

                                    "description_i18n": {

                                        "en": "Latitude of the point of projection for azimuthal projections.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 11

                                },

                                "scaleFactorAtCenterLine": {

                                    "title": "Scale factor at center line",

                                    "title_i18n": {

                                        "en": "Scale factor at center line",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Ratio between distance on earth and the corresponding map distance, along the center line.",

                                    "description_i18n": {

                                        "en": "Ratio between distance on earth and the corresponding map distance, along the center line.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 12

                                },

                                "straightVerticalLongitudeFromPole": {

                                    "title": "Straight vertical longitude from pole",

                                    "title_i18n": {

                                        "en": "Straight vertical longitude from pole",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Longitude to be oriented straight up from the North Pole.",

                                    "description_i18n": {

                                        "en": "Longitude to be oriented straight up from the North Pole.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 13

                                },

                                "scaleFactorAtProjectionOrigin": {

                                    "title": "Scale factor at projection origin",

                                    "title_i18n": {

                                        "en": "Scale factor at projection origin",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Multiplier for reducing a distance obtained from a map by computation or scaling to the actual distance at the projection origin.",

                                    "description_i18n": {

                                        "en": "Multiplier for reducing a distance obtained from a map by computation or scaling to the actual distance at the projection origin.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 14

                                },

                                "seObliqueLineAzimuth": {

                                    "title": "Oblique Line Azimuth",

                                    "title_i18n": {

                                        "en": "Oblique Line Azimuth",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Method used to describe the line along which an oblique Mercator map projection is centred using the map projection origin and an azimuth.",

                                    "description_i18n": {

                                        "en": "Method used to describe the line along which an oblique Mercator map projection is centred using the map projection origin and an azimuth.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 15,

                                    "properties": {

                                        "azimuthAngle": {

                                            "title": "Azimuth angle",

                                            "title_i18n": {

                                                "en": "Azimuth angle",

                                                "fr": "",

                                                "es": ""

                                            },

                                            "description": "Measure clockwise from north and express in degree of the angle.",

                                            "description_i18n": {

                                                "en": "Measure clockwise from north and express in degree of the angle.",

                                                "fr": "",

                                                "es": ""

                                            },

                                            "type": "object",

                                            "propertyOrder": 1

                                        },

                                        "azimuthMeasurePointLongitude": {

                                            "title": "Longitude of the map projection origin",

                                            "title_i18n": {

                                                "en": "Longitude of the map projection origin",

                                                "fr": "",

                                                "es": ""

                                            },

                                            "description": "Longitude of the origin in the map projection.",

                                            "description_i18n": {

                                                "en": "Longitude of the origin in the map projection.",

                                                "fr": "",

                                                "es": ""

                                            },

                                            "type": "object",

                                            "propertyOrder": 2

                                        }

                                    }

                                },

                                "seObliqueLinePoint": {

                                    "title": "Oblique Line Point",

                                    "title_i18n": {

                                        "en": "Oblique Line Point",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Method used to describe the line along which an oblique mercator map projection is centred using two points near the limit of the mapped region that define the centre line.",

                                    "description_i18n": {

                                        "en": "Method used to describe the line along which an oblique mercator map projection is centred using two points near the limit of the mapped region that define the centre line.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 16,

                                    "properties": {

                                        "obliqueLineLatitude": {

                                            "title": "Oblique line latitude",

                                            "title_i18n": {

                                                "en": "Oblique line latitude",

                                                "fr": "",

                                                "es": ""

                                            },

                                            "description": "Latitude of a point defining the oblique line.",

                                            "description_i18n": {

                                                "en": "Latitude of a point defining the oblique line.",

                                                "fr": "",

                                                "es": ""

                                            },

                                            "type": "object",

                                            "propertyOrder": 1

                                        },

                                        "obliqueLineLongitude": {

                                            "title": "Oblique line longitude",

                                            "title_i18n": {

                                                "en": "Oblique line longitude",

                                                "fr": "",

                                                "es": ""

                                            },

                                            "description": "Longitude of a point defining the oblique line.",

                                            "description_i18n": {

                                                "en": "Longitude of a point defining the oblique line.",

                                                "fr": "",

                                                "es": ""

                                            },

                                            "type": "object",

                                            "propertyOrder": 2

                                        }

                                    }

                                }

                            }

                        }

                    }

                },

                "seEllipsoid": {

                    "title": "Ellipsoid",

                    "title_i18n": {

                        "en": "Ellipsoid",

                        "fr": "",

                        "es": ""

                    },

                    "description": "This section provides the identifiers of the ellipsoid of the considered Coordinate Reference System (CRS).",

                    "description_i18n": {

                        "en": "This section provides the identifiers of the ellipsoid of the considered Coordinate Reference System (CRS).",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 5,

                    "properties": {

                        "ellipsoid": {

                            "title": "Ellipsoid",

                            "title_i18n": {

                                "en": "Ellipsoid",

                                "fr": "",

                                "es": ""

                            },

                            "description": "Identifier of the ellipsoid used.",

                            "description_i18n": {

                                "en": "Identifier of the ellipsoid used.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 1,

                            "$ref": "#/definitions/OjCodeList"

                        },

                        "ellipsoidName": {

                            "title": "Name of elliosoid",

                            "title_i18n": {

                                "en": "Name of elliosoid",

                                "fr": "",

                                "es": ""

                            },

                            "description": "Name of the ellipsoid used.",

                            "description_i18n": {

                                "en": "Name of the ellipsoid used.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 2,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        },

                        "seEllipsoidParameters": {

                            "title": "Ellipsoid Parameters",

                            "title_i18n": {

                                "en": "Ellipsoid Parameters",

                                "fr": "",

                                "es": ""

                            },

                            "description": "Set of parameters that describe the ellipsoid.",

                            "description_i18n": {

                                "en": "Set of parameters that describe the ellipsoid.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 3,

                            "properties": {

                                "semiMajorAxis": {

                                    "title": "Semi major axis",

                                    "title_i18n": {

                                        "en": "Semi major axis",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Measure of the equatorial axis of the ellipsoid.",

                                    "description_i18n": {

                                        "en": "Measure of the equatorial axis of the ellipsoid.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 1

                                },

                                "axisUnits": {

                                    "title": "Semi-major axis unit of measure",

                                    "title_i18n": {

                                        "en": "Semi-major axis unit of measure",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Units of the semi-major axis.",

                                    "description_i18n": {

                                        "en": "Units of the semi-major axis.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 2,

                                    "$ref": "#/definitions/OjMeasure"

                                },

                                "denominatorOfFlatteringRatio": {

                                    "title": "Deniminator of flattening rate",

                                    "title_i18n": {

                                        "en": "Deniminator of flattening rate",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "description": "Ratio between the semi-major axis and the semi-minor axis of an ellipse. Generally an ellipse is completely specified by the measure of the semi-major axis \u0027a\u0027 and the measure of the semi-minor axis \u0027b\u0027.",

                                    "description_i18n": {

                                        "en": "Ratio between the semi-major axis and the semi-minor axis of an ellipse. Generally an ellipse is completely specified by the measure of the semi-major axis \u0027a\u0027 and the measure of the semi-minor axis \u0027b\u0027.",

                                        "fr": "",

                                        "es": ""

                                    },

                                    "type": "object",

                                    "propertyOrder": 3

                                }

                            }

                        }

                    }

                },

                "seDatum": {

                    "title": "Datum",

                    "title_i18n": {

                        "en": "Datum",

                        "fr": "",

                        "es": ""

                    },

                    "description": "This section provides the identifiers of the datum of the considered Coordinate Reference System (CRS).",

                    "description_i18n": {

                        "en": "This section provides the identifiers of the datum of the considered Coordinate Reference System (CRS).",

                        "fr": "",

                        "es": ""

                    },

                    "type": "object",

                    "propertyOrder": 6,

                    "properties": {

                        "datum": {

                            "title": "Datum",

                            "title_i18n": {

                                "en": "Datum",

                                "fr": "",

                                "es": ""

                            },

                            "description": "Identifier of the datum used. Datum description is requested when the coordinate reference system citation is not supplied. A datum could be geodetic, vertical or engineering. A geodetic datum gives the relationship of a coordinate system to the Earth and is used as the basis for two or three dimensional system (in most cases it requires an ellipsoid definition). A vertical datum gives the relationship of gravity-related heights to a surface known as the geoid. A datum can be engineering if it is neither geodetic not vertical. For geodetic datum it could be useful to report the EPGS (European Petroleum Survey Group) coordinates.",

                            "description_i18n": {

                                "en": "Identifier of the datum used. Datum description is requested when the coordinate reference system citation is not supplied. A datum could be geodetic, vertical or engineering. A geodetic datum gives the relationship of a coordinate system to the Earth and is used as the basis for two or three dimensional system (in most cases it requires an ellipsoid definition). A vertical datum gives the relationship of gravity-related heights to a surface known as the geoid. A datum can be engineering if it is neither geodetic not vertical. For geodetic datum it could be useful to report the EPGS (European Petroleum Survey Group) coordinates.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 1,

                            "$ref": "#/definitions/OjCodeList"

                        },

                        "datumName": {

                            "title": "Name of datum",

                            "title_i18n": {

                                "en": "Name of datum",

                                "fr": "",

                                "es": ""

                            },

                            "description": "Name of the datum used.",

                            "description_i18n": {

                                "en": "Name of the datum used.",

                                "fr": "",

                                "es": ""

                            },

                            "type": "object",

                            "propertyOrder": 2,

                            "patternProperties": {

                                ".{1,}": {

                                    "type": "string"

                                }

                            }

                        }

                    }

                }

            }

        }

    }

});