define([
    "jquery",
    "fx-editor/utils/Fx-element-utils"], function ($, Element_Utils) {
     var element_Utils;

    function Fx_ui_TextArea() {
        element_Utils = new Element_Utils();
    }

    Fx_ui_TextArea.prototype.validate = function (e) {
        return true;
    };

    Fx_ui_TextArea.prototype.render = function (e, name, key, o, callback) {
        var validationRule, bootstrapValidator_Utils, value = null, rows = "", cols = "",defaultValue;

        if(o.validationUtils != undefined) {
            bootstrapValidator_Utils = o.validationUtils;
        }

        if(e.hasOwnProperty("rule")){
            validationRule = e.rule;
        }

        // add any multilingual component to the path
        if(e.hasOwnProperty("value")){
            if(e.value.hasOwnProperty("multilingual")){
                if(e.value.multilingual)  {
                    name = name +'.'+o.lang;
                }
            }
            if(e.value.hasOwnProperty("default")){
                defaultValue = e.value["default"];
            }
        }

        // add any rows or cols sizes (height and width of the text area, respectively)
        if(e.hasOwnProperty("type")){
            if(e.type.hasOwnProperty("rows")){
                rows = e.type.rows;
            }
            if(e.type.hasOwnProperty("cols")){
                cols = e.type.cols;
            }
        }

        // create the HTML element
        var textarea = $("<textarea/>", {
            "class": o.cssClass,
            "name" : name,
            "cols": cols,
            "rows": rows
        });


        //need to check if lang attribute and to set it, so it can be used in serialization later
        if (name.match(o.lang+"$")) {
            textarea.attr('data-multi-lang', o.lang);
        }
        //set the type
        textarea.attr('type', e.type.name);

        //set the id
        textarea.attr('id', key);

        //get Value
        if(o.values!=null){
            var value = element_Utils.getElementValue(name, o.values, e);
            if(value !=null){
                textarea.val(value);
            }
        }

        if(textarea.val()==""){
            //set Default Value
            if(defaultValue !=null && defaultValue!= undefined){
                textarea.val(defaultValue);
            }
        }

        if(validationRule &&  bootstrapValidator_Utils){
            bootstrapValidator_Utils.setValidationAttributes(textarea, validationRule, o.lang);
        }

        var containerId = '#'+ o.container + key;
        if(e.hasOwnProperty("fieldSetId"))  {
            containerId = '#'+o.container + e.fieldSetId+'-'+key;
        }

        textarea.appendTo(containerId);

        callback();

    };

    Fx_ui_TextArea.prototype.getValue = function (e) {
        return $("#" + e.id).val();
    };


    return Fx_ui_TextArea;
});