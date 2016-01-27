define([
        'jquery',
        'fx-MetaEditor2/js/MetadataEditor2/translators/MetaAdapterBase'
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

    var toCopy = ["resourceRepresentationType"];
    var toCopyML = ["description", "statisticalConceptsDefinitions"];
    var toCopyDates = [];

    MetaAdapter.prototype.convertUIToMeta = function (meta, lang) {
        if (!meta)
            return null;
/*        if (!meta.content)
            meta.content={};*/
        var vals = meta.content;
        var toRet = {};

        toRet.resourceRepresentationType = "dataset";
       
        if (vals) {
            if (vals.keywords && vals.keywords.length > 0) {
                toRet.keywords = [];
                for (var i = 0; i < vals.keywords.length; i++) {
                    toRet.keywords.push(vals.keywords[i]);
                }
            }
            this.copyVals(vals, toRet, toCopy);
            this.copyValsToML(vals, toRet, toCopyML, lang);
        }

        return { meContent: toRet };
    };
    MetaAdapter.prototype.convertMetaToUi = function (meta, lang) {
        if (!meta || !meta.meContent)
            return null;
        var vals = meta.meContent;
        var toRet = {};

        if (vals.keywords && vals.keywords.length > 0) {
            toRet.keywords = [];
            for (var i = 0; i < vals.keywords.length; i++) {
                toRet.keywords.push(vals.keywords[i]);
            }
        }

        this.copyVals(vals, toRet, toCopy);
        this.copyValsFromML(vals, toRet, toCopyML, lang);

        return { content: toRet };
    };

    return MetaAdapter;
});