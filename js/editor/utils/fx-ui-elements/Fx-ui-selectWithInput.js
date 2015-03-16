define([
    "jquery","i18n!fx-editor/nls/langProperties", "fx-editor/utils/Fx-element-utils", 'pnotify', "jQuery.XDomainRequest"], function ($, langProperties, Element_Utils, PNotify) {

    var bootstrapValidator_Utils, element_Utils, lang,
        types = {
            "CODE_LIST": "CodeList",
            "MULTIPLE_CHOICE" : "MultipleChoice"
        };

    function Fx_ui_Select() {
        element_Utils = new Element_Utils();
    }

    Fx_ui_Select.prototype.validate = function (e) {
        //console.log("============== TEST =================== ");
        if (!e.hasOwnProperty("source")) {
            throw new Error("ELEM_NO_SOURCE");
        }
        else {
            if (!e.source.hasOwnProperty("type")) {
                throw new Error("ELEM_NO_TYPE");
            } else {
                if(!e.source.type.hasOwnProperty("name")){
                    throw new Error("ELEM_NO_NAME");
                }
                else {
                    if(e.source.type.name === types.CODE_LIST){
                        if (!e.source.type.hasOwnProperty("system")) {
                            throw new Error("ELEM_NO_CODELIST");
                        }

                        if (!e.source.type.hasOwnProperty("version")) {
                            throw new Error("ELEM_NO_CODELISTVERSION");
                        }
                    }
                    // if(e.source.type.name === types.MULTIPLE_CHOICE){
                    // if (!e.source.type.hasOwnProperty("multipleChoice")) {
                    //   throw new Error("ELEM_NO_MULTICHOICE");
                    // }
                    // }
                }
            }

            if(!e.source.hasOwnProperty("datafields")){
                throw new Error("ELEM_NO_DATAFIELDS");
            } else {
                if(!e.source.datafields.hasOwnProperty("lang") && !e.source.datafields.hasOwnProperty("label")){
                    throw new Error("ELEM_NO_DATAFIELDS_CODE_LABEL");
                }
            }




            // else {
            //  if(!e.source.datafields[0].hasOwnProperty("code") && !e.source.datafields[0].hasOwnProperty("label")){
            //      throw new Error("ELEM_NO_DATAFIELDS_CODE_LABEL");
            //  }
            // if(e.source.hasOwnProperty("url")){
            //     if(!e.source.hasOwnProperty("dataroot")){
            //           throw new Error("ELEM_NO_DATAROOT");
            //   }
            // }
            // }
        }
        return true;
    };

    Fx_ui_Select.prototype.render = function (e, name, key, o, callback) {
        var validationRule, isRequired = false, value = null;
        //console.log("TEST RENDER ========== "+name);

        lang = o.lang;

        if(o.validationUtils != undefined) {
            bootstrapValidator_Utils = o.validationUtils;
        }

        if(e.hasOwnProperty("rule")){
            validationRule = e.rule;
        }

        // var message = langProperties.pleaseSelect;

        //  var select = $("<select data-live-search='true' title='"+message+"'/>");

        var select = $("<select/>");
        //var select = $("<datalist/>");
        if(e.type.hasOwnProperty("enabled")){
            if(!e.type.enabled){
//                select =  $("<select disabled/>");
                select =  $("<datalist disabled/>");
            }
        }

        //get Value
        if(o.values!=null){
            value = element_Utils.getElementValue(name, o.values, e);
        }

        //set all select names as an array i.e. appending []
        //var selectName = name+'[]';
        var selectName = name;

        if(e.source.type.name === types.CODE_LIST){   //array for codeList
            selectName += '[]';
        } else {
            if(e.type.hasOwnProperty("multi")){  //otherwise only if multiple select for multiple choice
                if(e.type.multi){
                    selectName += '[]';
                }
            }
        }

        if(e.source.type.hasOwnProperty("object")){
            if(o.objMapping != undefined) {
                var objType =  e.source.type["object"];
                if(o.objMapping.hasOwnProperty(objType)){
                    if(o.objMapping[objType].hasOwnProperty("code")){
                        if(o.objMapping[objType]["code"].hasOwnProperty("path")){
                            //   console.log("==== SELECT hasProperty code.path "+ objType);
                            selectName += o.objMapping[objType]["code"]["path"];
                        }
                    }
                }

                for (var property in  e.source.type) {
                    select.attr("data-cl-"+property.toLowerCase(), e.source.type[property]);
                    if (e.source.type.hasOwnProperty(property) && property!= 'name') {
                        if(o.objMapping[objType].hasOwnProperty(property)){
                            if(o.objMapping[objType][property].hasOwnProperty("path"))
                                select.attr("data-cl-"+property.toLowerCase()+"-path", o.objMapping[objType][property]["path"]);
                        }
                    }
                }
            }
        }

        //set all select names as an array i.e. appending []
        select.attr("class", o.cssClass);
        select.attr("name", selectName);

        // var select = $("<select/>", {
        //   "class": o.cssClass,
        //  "name" : name+'[]'
        // });

        // set the id
        select.attr('id', key);

        //set the lang
        select.attr("data-lang", lang);

        //set the codelist/multiplechoice
        for (var property in  e.source.type) {
            if (e.source.type.hasOwnProperty(property) && property!= 'name') {
                select.attr("data-cl-"+property.toLowerCase(), e.source.type[property]);
            }
        }

        // select.attr("data-codelist", e.source.codeList);
        //set the codelist version
        //select.attr("data-codelistversion", e.source.codeListVersion);

        // set additional options like 'multiple' selections
        if(e.type.hasOwnProperty("multi")){
            if(e.type.multi){
                select.attr("multiple", '');
            }
        }

        //check if the field is required
        if(validationRule && bootstrapValidator_Utils){
            if(bootstrapValidator_Utils.isRequired(validationRule)){
                isRequired = true;
            }
            bootstrapValidator_Utils.setValidationAttributes(select, validationRule, lang);
        }

        var containerId = '#'+ o.container + key;
        if(e.hasOwnProperty("fieldSetId"))  {
            containerId = '#'+o.container + e.fieldSetId+'-'+key;
        }

        // add the specific CSS class
        $(containerId).addClass('selectContainer');


        if (e.source.hasOwnProperty("url")) {
            populateFromUrl(select, isRequired,  e.source, e, name, value, containerId, callback, key);
        }
    };


    function populateFromUrl(select, isRequired, source, element, name, value, containerId, callback, key){

        var self = this;
        var root, codeProp, labelProp, langProp, defaultLang, sortLabels = true;
        if(source.hasOwnProperty("dataroot")){
            root = source.dataroot;
        }

        if(source.datafields.hasOwnProperty("code")){
            codeProp = source.datafields.code;
        }

        if(source.datafields.hasOwnProperty("label")){
            labelProp = source.datafields.label;
        }

        if(source.datafields.hasOwnProperty("sort")){
            sortLabels = source.datafields.sort;
        }

        if(source.datafields.hasOwnProperty("lang")){
            langProp = source.datafields.lang;

            if(langProp === labelProp){
                defaultLang = labelProp;
            }
            else {
                var fields = langProp.split(/[[\]]{1,2}/);
                fields.length--;

                for(var k = 0; k < fields.length; k++){
                    if(fields[k] != labelProp){
                        defaultLang = fields[k];
                    }
                }
            }
        }

        $.getJSON(source.url, function(data, status, xhr) {
            if( xhr.status == 200 ) {
                console.log("xhr.status == 200 !!!!!")
                //sort data
                var rootItem, options = [];
                console.log(root);
                if(root!== undefined)  {
                    rootItem = data[root];
                } else {
                    var dataArry = [];
                    for(var prop in data){
                        var obj = data[prop];
                        obj.code = prop;
                        dataArry.push(obj);
                    }
                    rootItem =  dataArry;
                }

                popupCreation(select, containerId, key, langProperties, rootItem, labelProp, defaultLang, lang, select, isRequired, options, sortLabels);

                if(sortLabels){
                    rootItem.sort(sortData(labelProp, defaultLang, lang));
                }

                // Add empty option always (irrespective of whether required/not required)
                // if(!isRequired){
                options.push(element_Utils.createEmptyOption(element, langProperties.pleaseSelect, lang));
                // }

                options.push("<option value='-' style='background-color: #E6E6E6'>"+langProperties.otherOption+"</option>");

                for(var i = 0; i < rootItem.length; i++){
                    var codeVal = rootItem[i];

                    if(codeProp !== undefined) {
                        codeVal = codeVal[codeProp];
                    } else {
                        codeVal = codeVal.code;
                    }
                    var opt = createOption(codeVal, rootItem[i], labelProp, defaultLang, lang);

                    options.push(opt);
                }

                //set options on the select
                select.html(options.join(""));

                //set Values
                //console.log("====================================== TEST ==========================");
                //console.log(name + " | "+options.length);
                if(value !=null){
                    element_Utils.setSelectedValues(select, value, isRequired, options.length);
                } else {
                    if(element.source.hasOwnProperty("datafields")){
                        if(element.source.datafields.hasOwnProperty("defaultCode")){
                            element_Utils.setDefaultSelectedValue(select, element.source.datafields.defaultCode);
                        }
                    }
                }

                var $button = $('<button  class="btn btn-success" id="otherSaveButton'+key+'">'+langProperties.otherSave+'</button>');
                var $input = $("<input data-other-inserted='false' data-other-code='' data-other-label='' type=\"text\" name=\"other\" id='otherOptions"+key+"'>");
                $(containerId).append($input);
                $(containerId).append($button);
                $('#otherOptions'+key).hide();
                $button.hide();

                //Initialize Save Button
                $button.on('click', function (e) {

                    var newValue = $input.val();

                    var item = {};
                    item["code"]= $input.val();
                    item[labelProp]= {};
                    item[labelProp][lang]= $input.val();
                    var inserted = $input.attr("data-other-inserted");
                    var code = $input.attr("data-other-code");
                    var label = $input.attr("data-other-label");
                    if(inserted=='false'){
                        comboStoreNewValue($input, item, rootItem, labelProp, defaultLang, lang, select, isRequired, options, sortLabels)
                    }
                    else{
                        $('#confirmModal'+key).modal('toggle');
                    }
                });

                $('#'+key).change(function () {
                    if ($(this).val() === '-') {
                        // Handle new option
                        $('#otherOptions'+key).val("");
                        $('#otherOptions'+key).show();
                        $button.show();
                    }
                    else{
                        $('#otherOptions'+key).hide();
                        $button.hide();
                    }
                });
                callback();
            }

            if(xhr.status == 404){
                $(containerId).html(select);
                callback();
            }
        }).error(function(jqXHR, textStatus, errorThrown) {
                //console.log("error " + errorThrown);
                // console.log("error " + textStatus);
                // console.log("incoming Text " + jqXHR.responseText);
            });
    }

    function comboStoreNewValue($input, item, rootItem, labelProp, defaultLang, lang, select, isRequired, options, sortLabels){
        var inserted = $input.attr("data-other-inserted");
        var code = $input.attr("data-other-code");
        var label = $input.attr("data-other-label");
        $input.attr("data-other-inserted", 'true');
        $input.attr("data-other-code", item["code"]);
        $input.attr("data-other-label", item[labelProp][lang]);

        if((code!=null)&&(typeof code!='undefined')&&(code.length>0)){
            //Remove the old value from the list
            if(code!=item["code"]){
                for(var iRoot=0; iRoot<rootItem.length; iRoot++){
                    if(rootItem[iRoot].code == code){
                        rootItem.splice(iRoot, 1);
                        options.splice((iRoot+2), 1);
                    }
                }
            }
        }

        if(sortLabels){
            rootItem.push(item);
            rootItem.sort(sortData(labelProp, defaultLang, lang));
        }
        var newValue = $input.val();
        var opt = createOption(newValue, item, labelProp, defaultLang, lang);

        var optionIndex=0;
        for(var iRoot=0; iRoot<rootItem.length; iRoot++){
            if(rootItem[iRoot][labelProp][lang] == $input.val()){
                optionIndex = iRoot;
                break;
            }
        }
        //iRoot+2 because there are: Please Select element and Other element
        options.splice(optionIndex+2, 0, opt);
        select.html(options);

        if(item!=null){
            element_Utils.setSelectedValues(select, newValue, isRequired, options.length);
        }
    }

    function popupCreation(select, containerId, key, langProperties, rootItem, labelProp, defaultLang, lang, select, isRequired, options, sortLabels){
        $(containerId).html(select);
        var popup = '<div class="modal fade" id="confirmModal'+key+'"';
        popup += 'aria-hidden="true" role="dialog">';
        popup += ' <div class="modal-dialog">';
        popup += '<div class="modal-content">';
        popup += '<div>';
        popup += '</div>';

        popup += '<div class="modal-body">';
        popup += '<div>';
        popup += '<p>'+langProperties.otherContent+'</p>';
        popup += '</div>';

        popup += '<div class="modal-footer">';
        popup += '<button type="button" class="btn btn-default" id="cancel'+key+'"';
        popup += 'data-dismiss="modal">'+langProperties.otherCancel+'</button>';
        popup += '<button type="button" id="ok'+key+'"';
        popup += 'class="btn btn-primary" data-dismiss="modal">'+langProperties.otherReplace+'</button>';
        popup += '</div>';
        popup += '</div>';
        popup += '</div>';
        popup += '</div>';

        $(containerId).append(popup);
        $('#cancel'+key).on('click', function (e) {
            $('#otherOptions'+key).val("");
        });

        $('#ok'+key).on('click', function (e) {
            var inserted = $('#otherOptions'+key).attr("data-other-inserted");
            var code = $('#otherOptions'+key).attr("data-other-code");
            var label = $('#otherOptions'+key).attr("data-other-label");

            var item = {};
            item["code"]= $('#otherOptions'+key).val();
            item[labelProp]= {};
            item[labelProp][lang]= $('#otherOptions'+key).val();

            comboStoreNewValue($('#otherOptions'+key), item, rootItem, labelProp, defaultLang, lang, select, isRequired, options, sortLabels)
        });
    }

    function sortData(labelProp, langProp, lang) {
        //if language is associated to label field, get value based on the lang
        return function(a, b) {

            if(langProp!=null) {
                if(labelProp == langProp){
                    if(a.hasOwnProperty(lang)){
                        if (a[lang] < b[lang])
                            return -1;
                        if (a[lang] > b[lang])
                            return 1;
                        return 0;
                    } else {
                        if (a[langProp] < b[langProp])
                            return -1;
                        if (a[langProp] > b[langProp])
                            return 1;
                        return 0;
                    }
                } else {
                    if(a.hasOwnProperty(labelProp) && b.hasOwnProperty(labelProp)) {
                        if(a[labelProp].hasOwnProperty(lang) && b[labelProp].hasOwnProperty(lang)){
                            if (a[labelProp][lang] < b[labelProp][lang])
                                return -1;
                            if (a[labelProp][lang] > b[labelProp][lang])
                                return 1;
                            return 0;
                        } else {
                            if (a[labelProp][[langProp]] < b[labelProp][langProp])
                                return -1;
                            if (a[labelProp][langProp] > b[labelProp][langProp])
                                return 1;
                            return 0;
                        }
                    }
                }
            }
            else {
                if (a[labelProp] < b[labelProp])
                    return -1;
                if (a[labelProp] > b[labelProp])
                    return 1;
                return 0;
            }
        }
    }




    function createOption(index, item, labelProp, langProp, lang){
        if(labelProp!=null) {
            if(labelProp == langProp){
                if(item.hasOwnProperty(lang)){
                    return  "<option value='" + index + "'>" + item[lang] + "</option>";
                }
                else
                    return  "<option value='" + index + "'>" + item[labelProp] + "</option>";

            } else {
                if(item.hasOwnProperty(labelProp)){
                    if(item[labelProp].hasOwnProperty(lang)){
                        return  "<option value='" + index + "'>" +  item[labelProp][lang] + "</option>";
                    }
                    else
                        return  "<option value='" + index + "'>" + item[labelProp][langProp] + "</option>";
                }
                else {
                    return  "<option value='" + index + "'>" + item + "</option>";
                }
            }
        }
        else {
            return "<option value='" + index + "'>" + item[labelProp] + "</option>";
        }
    }


    /**   function setSelectedValues(select, value, isRequired) {
        console.log("%%%%%% TEST: value "+value);
        console.log(value)
        if(value !=null){
            var codes = [];
            if(typeof value === 'object'){
                codes.push(iterate(value));
            } else {
                codes.push(value);
            }



            select.val(codes);

        } else {
            if(isRequired){
                setFirstItemSelected(select);
            }
        }
    }


     function iterate(obj) {
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (typeof obj[property] == "object")
                    iterate(obj[property]);
                else  {
                    console.log("%%%%%% TEST:iterate property: "+property+ " | value: "+obj[property]);
                    return obj[property];
                }

            }
        }
    }

     function setSelectedValuesOriginal(select, value, isRequired) {
        if(value !=null){
            var codes = [];
            for(var i = 0; i < value.length; i++){
                codes.push(value[i]['code']);
            }
            select.val(codes);

        } else {
            if(isRequired){
                setFirstItemSelected(select);
            }
        }
    }

     function setFirstItemSelected(select) {
        select.val(select.find("option:first").val());
    }  **/


    Fx_ui_Select.prototype.getValue = function (e) {
        console.log("e.id "+e.id);
        console.log("$(#e.id).val() = "+$("#" + e.id).val())
        return $("#" + e.id).val();
    };


    return Fx_ui_Select;
});