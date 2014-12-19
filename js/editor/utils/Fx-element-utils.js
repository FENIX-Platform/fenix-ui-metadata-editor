define([
    "jquery",
    "fx-editor/utils/Fx-json-utils",
    "i18n!fx-editor/conf/nls/guiLangProps"

], function ($, Json_Utils, guiLangProps) {

    var json_Utils;

    //Public Component
    function Fx_Element_Utils() {
        json_Utils =  new Json_Utils();
    }


    function iterate(obj, codes) {
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (typeof obj[property] == "object")
                    iterate(obj[property], codes);
                else  {
                    codes.push(obj[property]);
                }
            }

        }
    }


    function setFirstItemSelected (select) {
        select.val(select.find("option:first").val());
    }



    Fx_Element_Utils.prototype.setSelectedValues = function(select, value, isRequired, optsLength) {
        var opts = [];
        var self = this;

        if(value !=null){
            var codes = this.getValues(value);
            codes = self.removeDuplicatesFromArray(codes);

            if(optsLength == undefined || optsLength == 0) {
                for(var t = 0; t <codes.length; t++){
                   opts.push("<option value='" + codes[t] +"'>" + codes[t] + "</option>");
                }

                select.html(opts.join(""));
            }

            select.val(codes);

        } //else {
            //if(isRequired){
              //  setFirstItemSelected(select);
            //}
        //}

    }


    Fx_Element_Utils.prototype.removeDuplicatesFromArray = function (arr) {
        var r = new Array();
        o:for(var i = 0, n = arr.length; i < n; i++)
        {
            for(var x = 0, y = r.length; x < y; x++)
            {
                if(r[x]==arr[i])
                {
                    continue o;
                }
            }
            r[r.length] = arr[i];
        }
        return r;
    }

    Fx_Element_Utils.prototype.setDefaultSelectedValue = function(select, value) {
        var codes = [];
        codes.push(value);

        select.val(codes);
    }

    Fx_Element_Utils.prototype.getValueObjects = function(value) {
        var codes = [];
        if (value instanceof Array) {
            for(var j=0; j < value.length; j++){
                var item =  value[j];
                codes.push(item);
            }
        }
        else if(typeof value === 'object'){
            iterate(value, codes);
        }

        return codes;
    }

    Fx_Element_Utils.prototype.getValueLabels = function(value, lang) {
        var self = this;
        var labels = [];

        var codes = self.getValueObjects(value);

        for(var t = 0; t <codes.length; t++){
            var obj = codes[t];
            var label = obj.code;
            if(obj.hasOwnProperty("label")){
                label = obj.label[lang]
            }
            labels.push(label.trim());
        }

        return labels;
    }

    Fx_Element_Utils.prototype.getValues = function(value) {
        var codes = [];
        if (value instanceof Array) {
            for(var j=0; j < value.length; j++){
                var item =  value[j];
                if(typeof item === 'object'){
                    iterate(item, codes);
                } else {
                    codes.push(item);
                }
            }
        }
        else if(typeof value === 'object'){
            iterate(value, codes);
        } else {
            codes.push(value);
        }

        return codes;
    }

    Fx_Element_Utils.prototype.getElementValue = function(name, jsonValues, obj) {
        var pth = [name], parentPath, parent, value, itemTrackerArray = [];

        var keysChk = Object.keys(jsonValues), keyOne = keysChk[0];

        // Check if the values only contains one prop called 'isRoot', if so there are no field properties and null value can be returned
        if (keysChk.length == 1 && keyOne == "isRoot") {
            // return a null value
             return null;
        }

        if(obj != undefined){
            if(obj.hasOwnProperty("fieldSetMappedName")) {
                if(obj.fieldSetMappedName != undefined){
                    parentPath = obj.fieldSetMappedName;
                }
            }
        }

        if(parentPath !=undefined){
            var arrayIndex = parentPath.match(/\d+/, function(idx) {
                return idx});

            if(arrayIndex != undefined){
                //once array index identified then strip it out of the parentPath and name
                // e.g. parentPath = contacts[0] ==> contacts
                // name = contacts[0].contactInfo.hoursOfService.EN ==> contacts.contactInfo.hoursOfService.EN
                parentPath =  parentPath.replace(/\[\d]/, '');
                name =   name.replace(/\[\d]/, '');
            }

            var parents = parentPath.split('.');
            var parent;

            var jsn = json_Utils.findValue(parents, jsonValues);

             if(jsn == undefined){
                parents = parentPath.split('.');

                var cloneCopy = [];

                for (var i = 0; i < parents.length; i++) {
                    cloneCopy.push(parents.slice());
                }

                //for (var i = 0; i < parents.length; i++) {
                for(var i = parents.length; i--; )  {
                    var itm =  parents[i];
                    itemTrackerArray.push(itm);

                    var clone =  cloneCopy[i];
                    remove(clone, itemTrackerArray);


                    var jsnP;
                    if(clone.length == 0){
                       jsnP = json_Utils.findValue([itm], jsonValues);
                     } else {
                       jsnP = json_Utils.findValue(clone, jsonValues);
                     }

                    if(jsnP != undefined){
                        jsonValues = jsnP;
                        itemTrackerArray = [];
                        break;
                    }

                }

                if(jsonValues.hasOwnProperty("parent")){
                    parent = jsonValues.parent;
                    var strLen = parent.length;
                    parent = parent.slice(0,strLen-1); //remove trailing .
                   }


            } else {
                jsonValues = jsn;
                parent = parentPath;
                itemTrackerArray = [];
            }


            // Use the array Index when dealing with the array
            if($.isArray(jsonValues)) {
                if(arrayIndex!=undefined)
                    jsonValues = jsonValues[arrayIndex];//jsonValues = jsonValues[0];
            }


            if(/\./.test(name)){
                var childRes = name.replace(parent+'.','');
                if(/\./.test(childRes)) {
                    value = json_Utils.findValue(childRes.split('.'), jsonValues)
                 }
                else {
                    value = json_Utils.findValue([childRes], jsonValues);
                }
            }
        } else {
            if(/\./.test(name)){
                pth = name.split('.');
            }

            value = json_Utils.findValue(pth, jsonValues);
        }

        if(value === null){
            value = "";
        }

        return value;

    }


    function remove(arr, item) {
        //console.log("============== REMOVE ++++++++++++++++");

        for(var j = 0; j < item.length; j++) {
            var itm = item[j];
             for(var i = arr.length; i--;) {
                if(arr[i] === itm) {
                    arr.splice(i, 1);
                }
            }
        }
    }


    Fx_Element_Utils.prototype.getElementValueOriginal = function(name, jsonValues) {
        var pth = [name];

        if(/\./.test(name)){
            pth = name.split('.');
        }

        var value = json_Utils.findValue(pth, jsonValues);

        return value;

    }


    Fx_Element_Utils.prototype.createModuleOptions = function(json, options, resourceType, lang, parentLabel){
       var self = this;
        for (var i = 0; i < json.length; i++) {
            var elem = json[i];

            var label = elem["module"];

            if(lang!=null) {
                if (elem.hasOwnProperty("label")) {
                    if(elem["label"].hasOwnProperty("langProp"))
                        label =  guiLangProps[elem["label"]["langProp"]]; // label = elem["label"][lang];
                }
            }

            if(parentLabel != undefined){
                label += " ("+parentLabel+")";
            }

            if(elem.hasOwnProperty("resourceType")){
                if($.inArray(resourceType, elem.resourceType) >= 0) {
                    options.push( "<option value='" + elem["module"] + "'>" +label + "</option>" );

                    if(elem.hasOwnProperty("modules")) {
                        self.createModuleOptions(elem["modules"], options, resourceType, label);
                    }

                }
                continue;
            }

            options.push( "<option value='" + elem["module"] + "'>" +label + "</option>" );

            if(elem.hasOwnProperty("modules")) {
                self.createModuleOptions(elem["modules"], options, resourceType, label);
            }

        }
    }



    Fx_Element_Utils.prototype.createEmptyOption = function(element, defaultLabel, lang) {

        if(element !=null && element.type.hasOwnProperty("instruction")){
            defaultLabel = element.type.instruction[lang];
        }

        return "<option value=''>====="+defaultLabel+"=====</option>";
    }

    Fx_Element_Utils.prototype.init = function () { };

    //Public API
    return Fx_Element_Utils;

});