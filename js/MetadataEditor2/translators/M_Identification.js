define([
        'jquery',
        'fx-MetaEditor2/js/MetadataEditor2/translators/MetaAdapterBase',
        'moment'
],
function ($, MetaAdapterBase, moment) {
    var defConfig = {
    };

    var MetaAdapter = function (config) {
        this.parent.constructor.call(this, config);
        $.extend(true, this.config, defConfig);

    };
    MetaAdapter.prototype = Object.create(MetaAdapterBase.prototype);
    MetaAdapter.prototype.constructor = MetaAdapter;
    MetaAdapter.prototype.parent = MetaAdapterBase.prototype;

    var toCopy = ['metadataStandardName', 'metadataStandardVersion', 'noDataValue'];
    var toCopyDates = ["creationDate"];
    var toCopyML = ["title", "languageDetails"];

    MetaAdapter.prototype.convertUIToMeta = function (uiVals, lang) {
        if (!uiVals.identification)
            return null;
        var toRet = {};
        var vals = uiVals.identification;
        toRet.language = this.codeToCodelist(vals.language, this.clists.language.id, this.clists.language.v);
        toRet.characterSet = this.codeToCodelist(vals.characterSet, this.clists.charset.id, this.clists.charset.v);
        toRet.metadataLanguage = this.codeToCodelist(vals.metadataLanguage, this.clists.language.id, this.clists.language.v);

        this.copyDatesToMeta(vals, toRet, toCopyDates);
        this.copyVals(vals, toRet, toCopy);
        this.copyValsToML(vals, toRet, toCopyML, lang);

        return toRet;
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        var toRet = {};
        toRet.identification = {};
        toRet.identification.language = this.codelistToCode(meta.language);
        toRet.identification.characterSet = this.codelistToCode(meta.characterSet);
        toRet.identification.metadataLanguage = this.codelistToCode(meta.metadataLanguage);

        this.copyVals(meta, toRet.identification, toCopy);
        this.copyDatesFromMeta(meta, toRet.identification, toCopyDates);
        this.copyValsFromML(meta, toRet.identification, toCopyML, lang);

        return toRet;
    };

    return MetaAdapter;
});