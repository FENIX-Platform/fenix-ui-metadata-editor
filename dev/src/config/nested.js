define(function () {

    return {
        a: {
            title: "A",
            description: "",
            contentTemplate: "<div class='row'><div class='col-xs-12'>Custom [A]</div></div>",
            indexTemplate: "<li>Custom [A] </li>",
            className: "custom",
            selectors: {
                textarea: {
                    selector: {
                        id: "textarea",
                        source : [{value: "Textarea", label: "Textarea"}]
                    }
                },
                input: {
                    selector: {
                        id: "input",
                        type: "radio",
                        source: [{value: "item_1", label: "Item 1"}, {value: "item_2", label: "Item 2"}]
                    }
                }
            }
        },
        b: {
            title: "B",
            selectors: {
                input: {
                    selector: {
                        id: "input",
                        type: "radio",
                        source: [{value: "item_1", label: "Item 1"}, {value: "item_2", label: "Item 2"}]
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
                                        id: "dropdown",
                                        source: [{value: "item_1", label: "Item 1"}, {value: "item_2", label: "Item 2"}]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        c: {
            title: "C"
        }
    }

});
