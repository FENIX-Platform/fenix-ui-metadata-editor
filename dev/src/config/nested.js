define(function () {

    return {

        template: {
            title: "Root"
        },

        selectors: {

            nls: {

                mode : "nls",

                selector: {
                    id: "textarea",
                    source: [{value: "Textarea", label: "Textarea"}]
                },

                template: {
                    description: "Textarea My custom description"
                },

                format: {
                    output: "string"
                }
            }

        },

        sections: {
            a: {

                className: "custom",

                template: {
                    contentTemplate: "<div class='row'><div class='col-xs-12'>Custom [A]</div></div>",
                    indexTemplate: "<li>Custom [A] </li>",
                },

                selectors: {
                    textarea: {
                        selector: {
                            id: "textarea",
                            source: [{value: "Textarea", label: "Textarea"}]
                        },
                        template: {
                            description: "Textarea My custom description"
                        },
                        format: {
                            output: "string"
                        }
                    },
                    input: {
                        selector: {
                            id: "input",
                            type: "radio",
                            source: [{value: "item_1", label: "Item 1"}, {value: "item_2", label: "Item 2"}]
                        },
                        format: {
                            output: "label"
                        }
                    }
                }
            },
            b: {
                template: {
                    title: "B",
                    hideTitle: true,
                    description: "This is the section description. PS: the title is hidden by configuration",
                    hideDescription: false
                },
                selectors: {
                    input: {
                        selector: {
                            id: "input",
                            type: "radio",
                            source: [{value: "item_1", label: "Item 1"}, {value: "item_2", label: "Item 2"}]
                        },
                        format: {
                            output: "array<string>"
                        }
                    }

                },
                sections: {
                    ba: {
                        title: "BA"
                    },
                    bb: {
                        title: "BB",
                        sections: {
                            bba: {
                                title: "BBA",
                                selectors: {
                                    dropdown: {
                                        selector: {
                                            id: "dropdown"
                                        },
                                        cl: {
                                            uid: "IANAcharacterSet"
                                        },
                                        format: {
                                            output: "codes"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            c: {
                template: {
                    title: "C"
                }
            }
        }
    }
});
