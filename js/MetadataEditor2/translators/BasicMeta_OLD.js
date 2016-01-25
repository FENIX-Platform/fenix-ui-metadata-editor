define([
    'jquery'
],
    function ($) {
        var defConfig = {
            langCode: "EN"
        };

        function BasicMeta(config) {
            this.config = {};
            $.extend(true, this.config, defConfig, config);
        };

        BasicMeta.prototype.editorToMeta = function (vals, langCode) {
            var lCode = langCode || this.config.langCode;
            var toRet = {};
            if (vals.title) {
                toRet.title = {};
                toRet.title[lCode] = vals.title;
            }
            //CONVERT FORMATS
            if (vals.creationDate) {
                toRet.creationDate = vals.creationDate;
            }
            //This is an array, the mandatory one is the first one, fix it and show in the interface all the contacts
            var contactNode = createContactNode(vals, lCode);
            if (contactNode) {
                toRet.contacts = [];
                toRet.contacts[0] = contactNode;
            }
            return toRet;
        };

        function createContactNode(vals, lCode) {
            var toRet = null;
            if (vals.organization || vals.phone || vals.address || vals.emailAddress) {
                toRet = {};
                if (vals.organization) {
                    toRet.organization = {};
                    toRet.organization[lCode] = vals.organization;
                }
                if (vals.phone || vals.address || vals.emailAddress) {
                    toRet.contactInfo = {};
                    if (vals.phone)
                        toRet.contactInfo.phone = vals.phone;
                    if (vals.address)
                        toRet.contactInfo.address = vals.address;
                    if (vals.emailAddress)
                        toRet.contactInfo.emailAddress = vals.emailAddress;
                }
            }
            return toRet;
        };

        return BasicMeta;
    })