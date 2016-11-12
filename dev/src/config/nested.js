define(function () {

    return {

        template: {
            title: "Contacts"
        },

        selectors: {

            contacts: {

                incremental: true,

                selectors: {
                    organization: {

                        selector: {
                            id: "input",
                            type: "text",
                            source: [{value: "organization", label: "organization"}],
                            default : ["FAO"]
                        }
                    },
                    organizationUnit: {
                        selector: {
                            id: "input",
                            type: "text",
                            source: [{value: "organizationUnit", label: "organizationUnit"}],
                            default : ["ESS"]

                        }
                    },

                    phone:{
                        selector : {
                            id: "input",
                            type: "text",
                            source: [{value: "phone", label: "phone"}],
                            default : ["066666"]

                        },

                        format : {
                            output: "template",
                            path : "contactInfo.phone"
                        }

                    },
                    address:{
                        selector : {
                            id: "input",
                            type: "text",
                            source: [{value: "address", label: "address"}],
                            default : ["CARACALLA"]

                        },
                        format : {
                            output: "template",
                            path : "contactInfo.address"
                        }
                    },
                },

                format: {
                    output: "array<contact>"
                }

            }
        }

    }
});
