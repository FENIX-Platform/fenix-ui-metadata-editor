define([
    "jquery",
    "fx-editor/utils/Fx-element-utils"], function ($, Element_Utils) {

    var element_Utils;

    function Fx_ui_Number() {
        element_Utils = new Element_Utils();
    }

    Fx_ui_Number.prototype.validate = function (e) {
        return true;
    };

    Fx_ui_Number.prototype.render = function (e, name, key, o, callback) {
        var validationRule, bootstrapValidator_Utils, self = this;

        if(o.validationUtils != undefined) {
            //console.log("VALIDATION UTILS DEFINED --------------- ");
            bootstrapValidator_Utils = o.validationUtils;
        }else {
           // console.log("VALIDATION UTILS UNDEFINED --------------- "+key);
        }

        if(e.hasOwnProperty("rule")){
            validationRule = e.rule;
        }

        // create the HTML element
        var text = $("<input/>", {
            "class": o.cssClass,
            "name" : name
        });


        //set the type
        text.attr('type', 'text');
        //set the id
        text.attr('id', key);

        //get Value
        if(o.values!=null){
            var value = element_Utils.getElementValue(name, o.values, e);
            if(value !=null){
                text.val(value);
                if(e.type.hasOwnProperty("disabled")){
                    if(e.type.disabled)
                        text.attr('disabled','disabled');
                }
            }
        }


        if (e.hasOwnProperty("placeholder")) {
            text.attr('placeholder', e["placeholder"][o.lang]);
        }

        //console.log("validationRule --------------- "+validationRule + " for "+key);
        //console.log("bootstrapValidator_Utils --------------- "+bootstrapValidator_Utils + " for "+key);

        if(validationRule &&  bootstrapValidator_Utils){
            bootstrapValidator_Utils.setValidationAttributes(text, validationRule, o.lang);
        }

        if(e.hasOwnProperty("disabled")) {
            text.prop('disabled', e.disabled);
        }

        text.attr("data-number", true);

        if(e.type.hasOwnProperty("format")) {
            text.attr("data-number-type", e.type.format);
        } else {
            text.attr("data-number-type", "integer");
        }

       //DEBUG
        //$(element[0].attributes).each(function() {
                //  console.log(this.nodeName+':'+this.nodeValue);
          //  }
        //);

        var containerId = '#'+ o.container + key;
        if(e.hasOwnProperty("fieldSetId"))  {
            containerId = '#'+o.container + e.fieldSetId+'-'+key;
        }

       // accounts for any input-span images e.g. %
       $(containerId).prepend(text);

       //text.appendTo(containerId);

        callback();

    };

    Fx_ui_Number.prototype.getValue = function (e) {
        return $("#" + e.id).val();
    };


    return Fx_ui_Number;
});