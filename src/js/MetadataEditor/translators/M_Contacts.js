define([
        'jquery',
        'fx-MetaEditor/js/MetadataEditor/translators/MetaAdapterBase'
],
function ($, MetaAdapterBase) {
    var defConfig = {
    };

    var MetaAdapter = function (config) {
        this.parent.constructor.call(this, config);
        $.extend(true, this.config, defConfig);

    };
    MetaAdapter.prototype = Object.create(MetaAdapterBase.prototype);
    MetaAdapter.prototype.constructor = MetaAdapter;
    MetaAdapter.prototype.parent = MetaAdapterBase.prototype;

    var toCopy = ["pointOfContact", "role"];
    var toCopyML = ["organization", "organizationUnit", "position", "specify"];

    var toCopyC = ["phone", "address", "emailAddress"];
    var toCopyMLC = ["hoursOfService", "contactInstruction"];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
        if (!meta.contacts)
            return null;
        var vals = meta.contacts;
        var toRet = {};

        this.copyVals(vals, toRet, toCopy);
        this.copyValsToML(vals, toRet, toCopyML, lang);

        if (vals.contactInfo && !$.isEmptyObject(vals.contactInfo)) {
            toRet.contactInfo = {};
            this.copyVals(vals.contactInfo, toRet.contactInfo, toCopyC);
            this.copyValsToML(vals.contactInfo, toRet.contactInfo, toCopyMLC, lang);
        }

        return { contacts: [toRet] };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta.contacts || !meta.contacts[0])
            return null;
        var vals = meta.contacts[0];
        var toRet = {};

        this.copyVals(vals, toRet, toCopy);
        this.copyValsFromML(vals, toRet, toCopyML, lang);

        if (vals.contactInfo) {
            toRet.contactInfo = {};
            this.copyVals(vals.contactInfo, toRet.contactInfo, toCopyC);
            this.copyValsFromML(vals.contactInfo, toRet.contactInfo, toCopyMLC, lang);
        }

        return { contacts: toRet };
    };

    return MetaAdapter;
});