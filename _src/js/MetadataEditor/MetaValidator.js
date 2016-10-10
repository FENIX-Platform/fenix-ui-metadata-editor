define([
    'jquery'
],
    function ($) {

        var defConfig = {
        },
            e = {
            MANDATORY_MISSING: 'mandatoryMissing',
            SECTION_MISSING: 'sectionMissing'
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
                    toRet.push({ message: e.MANDATORY_MISSING, fieldId: "title" });
                if (!meta.characterSet || meta.characterSet.length == 0)
                    toRet.push({ message: e.MANDATORY_MISSING, fieldId: "characterSet" });
                if (!meta.metadataStandardName || meta.metadataStandardName == "")
                    toRet.push({ message: e.MANDATORY_MISSING, fieldId: "metadataStandardName" });
            }
            if (sectionId == "contacts") {
                if (!meta.contacts || meta.contacts.length == 0)
                    toRet.push({ message: e.SECTION_MISSING, sectionId: "contacts" });
                else {
                    if (!meta.contacts[0].organization || meta.contacts[0].organization == "")
                        toRet.push({ message: e.MANDATORY_MISSING, fieldId: "contacts.organization" });
                    if (!meta.contacts[0].contactInfo)
                        toRet.push({ message: e.MANDATORY_MISSING, fieldId: "contacts.contactInfo" });
                    if (meta.contacts[0].contactInfo && !meta.contacts[0].contactInfo.phone && !meta.contacts[0].contactInfo.address && !meta.contacts[0].contactInfo.emailAddress)
                        toRet.push({ message: e.MANDATORY_MISSING, fieldId: "contacts.contactInfo" });
                }
            }
            return toRet;
        };

        return MetaValidator;
    })