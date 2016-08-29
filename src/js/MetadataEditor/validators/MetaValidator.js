if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define([
    'jquery',
    'fx-MetaEditor/js/MetadataEditor/validators/MetaValidator_Errors',
],
    function ($, valErrors) {

        var defConfig = {
        };

        function MetaValidator(config) {
            this.config = {};
            $.extend(true, this.config, defConfig, config);
        };

        /*MetaValidator.prototype.validate = function (meta) {

        };*/

        MetaValidator.prototype.validateSection = function (meta, sectionId) {
            var toRet = [];
            if (sectionId == "identification") {
                if (!meta.title || meta.title == "")
                    toRet.push({ message: valErrors.MANDATORY_MISSING, fieldId: "title" });
                if (!meta.characterSet || meta.characterSet.length == 0)
                    toRet.push({ message: valErrors.MANDATORY_MISSING, fieldId: "characterSet" });
                if (!meta.metadataStandardName || meta.metadataStandardName == "")
                    toRet.push({ message: valErrors.MANDATORY_MISSING, fieldId: "metadataStandardName" });
            }
            if (sectionId == "contacts") {
                if (!meta.contacts || meta.contacts.length == 0)
                    toRet.push({ message: valErrors.SECTION_MISSING, sectionId: "contacts" });
                else {
                    if (!meta.contacts[0].organization || meta.contacts[0].organization == "")
                        toRet.push({ message: valErrors.MANDATORY_MISSING, fieldId: "contacts.organization" });
                    if (!meta.contacts[0].contactInfo)
                        toRet.push({ message: valErrors.MANDATORY_MISSING, fieldId: "contacts.contactInfo" });
                    if (meta.contacts[0].contactInfo && !meta.contacts[0].contactInfo.phone && !meta.contacts[0].contactInfo.address && !meta.contacts[0].contactInfo.emailAddress)
                        toRet.push({ message: valErrors.MANDATORY_MISSING, fieldId: "contacts.contactInfo" });
                }
            }
            return toRet;
        };

        return MetaValidator;
    })