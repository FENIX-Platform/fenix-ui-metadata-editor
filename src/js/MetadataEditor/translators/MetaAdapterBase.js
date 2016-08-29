define([
        'jquery',
        'moment',
    'fx-MetaEditor/md-codelists'
],
function ($, moment, clists) {
    //var defConfig = {};

    var MetaAdapterBase = function (config) {

        //console.log(clists)
        this.clists = clists;

        /*this.metaLangCodes = {
            "eng": "EN",
            "fre": "FR"
        };*/
        //this.config = {};
        //$.extend(true, this.config, defConfig, config);
    };
    /*var clists = {
        language: { id: "ISO639-2", v: "1998" },
        charset: { id: "IANAcharacterSet", v: null },
    };*/

    MetaAdapterBase.prototype.codeToCodelist = function (code, idCodelist, version) {
        var toRet = { idCodeList: idCodelist, codes: [] };
        if (version)
            toRet.version = version;
        if (code instanceof Array)
            for (var i = 0; i < code.length; i++)
                toRet.codes.push({ "code": code[i] });
        else
            toRet.codes.push({ "code": code });
        return toRet;
    };
    MetaAdapterBase.prototype.codelistToCode = function (codelist) {
        var codes = this.codelistToCodes(codelist);
        if (!codes)
            return null;
        if (!codes[0])
            return null;
        return codes[0].code;
    };
    MetaAdapterBase.prototype.codelistToCodes = function (codelist) {
        if (!codelist)
            return null;
        if (!codelist.codes)
            return null;
        return codelist.codes;
    };
    MetaAdapterBase.prototype.removePropertyIfEmpty = function (obj, property) {
        if (obj[property] && $.isEmptyObject(obj[property]))
            delete obj[property];
    };

    MetaAdapterBase.prototype.toMLString = function (val, lang) {
        //var metaLCode = this.langCode_clistToMeta(clistLangCode);
        var toRet = {};
        toRet[lang] = val;
        return toRet;
    };
    MetaAdapterBase.prototype.fromMLString = function (val, lang) {
        if (!val)
            return null;
        //var metaLCode = this.langCode_clistToMeta(clistLangCode);
        if (val[lang])
            return val[lang];
        return null;
    };

    //Dates
    MetaAdapterBase.prototype._toMillis = function (val) {
        if (!val) return null;
        var d = moment(val, "DD/MM/YYYY");
        return d.valueOf()
    };
    MetaAdapterBase.prototype._fromMillis = function (val) {
        var d = moment(val);
        return d.format("DD/MM/YYYY");
    };
    MetaAdapterBase.prototype.copyDatesFromMeta = function (src, dest, properties) {
        if (!properties || !src || !dest) return;

        for (var i = 0; i < properties.length; i++) {
            if (src[properties[i]]) {
                dest[properties[i]] = this._fromMillis(src[properties[i]]);
            }
        }

    };
    MetaAdapterBase.prototype.copyDatesToMeta = function (src, dest, properties) {
        if (!properties || !src || !dest) return;

        for (var i = 0; i < properties.length; i++) {
            if (src[properties[i]]) {
                dest[properties[i]] = this._toMillis(src[properties[i]]);
            }
        }
    };
    //END Dates

    /*MetaAdapterBase.prototype.langCode_clistToMeta = function (code) {
        if (this.metaLangCodes[code])
            return this.metaLangCodes[code];
        return null;
    };
    MetaAdapterBase.prototype.langCode_metaToClist = function (code) {
        for (var k in this.metaLangCodes)
            if (this.metaLangCodes.hasOwnProperty(k))
                if (this.metaLangCodes[k] == code)
                    return k;
        return null;
    };*/

    //Copy helpers
    MetaAdapterBase.prototype.copyVals = function (src, dest, properties) {
        if (!properties || !src || !dest)
            return;
        for (var i = 0; i < properties.length; i++) {
            if (src[properties[i]]) {
                dest[properties[i]] = src[properties[i]];
            }
        }
    };

    MetaAdapterBase.prototype.copyValsToML = function (src, dest, properties, lang) {
        if (!properties || !src || !dest || !lang)
            return;
        for (var i = 0; i < properties.length; i++) {
            if (src[properties[i]]) {
                dest[properties[i]] = this.toMLString(src[properties[i]], lang);
            }
        }
    };
    MetaAdapterBase.prototype.copyValsFromML = function (src, dest, properties, lang) {
        if (!properties || !src || !dest || !lang)
            return;
        for (var i = 0; i < properties.length; i++) {
            if (src[properties[i]]) {
                dest[properties[i]] = this.fromMLString(src[properties[i]], lang);
            }
        }
    };
    //Copy helpers END

    return MetaAdapterBase;
});