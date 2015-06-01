define([
    "jquery",
    "fx-editor/utils/Fx-element-utils",
    "i18n!fx-editor/conf/nls/guiLangProps"], function ($, Element_Utils, guiLangProps) {

    var element_Utils;

    function Fx_ui_Text() {
        element_Utils = new Element_Utils();
    }

    Fx_ui_Text.prototype.validate = function (e) {
        return true;
    };

    Fx_ui_Text.prototype.render = function (e, name, key, o, callback) {

        var validationRule, bootstrapValidator_Utils, self = this, defaultValue;

        if(o.validationUtils != undefined) {
            //console.log("VALIDATION UTILS DEFINED --------------- ");
            bootstrapValidator_Utils = o.validationUtils;
        }else {
           // console.log("VALIDATION UTILS UNDEFINED --------------- "+key);
        }

        if(e.hasOwnProperty("rule")){
            validationRule = e.rule;
        }

        // add any multilingual component to the path
         if(e.hasOwnProperty("value")){
            if(e.value.hasOwnProperty("multilingual")){
                if(e.value.multilingual)
                    name = name +'.'+o.lang;
            }
             if(e.value.hasOwnProperty("default")){
                 defaultValue = e.value["default"];
             }
        }

        // create the HTML element
//        var text = $("<input/>", {
//            "class": o.cssClass,
//            "name" : name
//        });

        var text = $("<label/>", {
            "class": "control-label",
            "name" : name
        });

        //need to check if lang attribute and to set it, so it can be used in serialization later
        if (name.match(o.lang+"$")) {
          text.attr('data-multi-lang', o.lang);
        }

        //set the type
        text.attr('type', e.type.name);
        //set the id
        text.attr('id', key);
        //text.html("CountryVal");

        if(o.values!=null){
            var value = element_Utils.getElementValue(name, o.values, e);

            if(value !=null && value!= undefined){
                text.val(value);
               // if(e.type.hasOwnProperty("disabled") && value!==""){
                //  if(e.type.disabled)
                 //     text.attr('disabled','disabled');
               // }
            }
        }

        // if the value is empty, display default value (if available)
        if(text.val()=="" && defaultValue !=null && defaultValue!= undefined){
            //check if setting the default value is dependant on another field's value e.g. if Metadata Standard has been defaulted to = FENIX then the corresponding default standard version is set to 1.0
            if(e.value.hasOwnProperty("default-dependency")) {
                if(e.value["default-dependency"].hasOwnProperty("field") && e.value["default-dependency"].hasOwnProperty("value")) {
                    // get the value of the dependant field and see if it has been set to the default value
                    if($("#"+e.value["default-dependency"]["field"]).val() == e.value["default-dependency"]["value"]){
                        //set Default Value
//                        text.val(defaultValue);
                        text.html(defaultValue);
                    }
                }
            } else {
                // just set the default value
//                text.val(defaultValue);
                text.html(defaultValue);
            }
        }

       /** if(text.val()==""){
            //set Default Value
            if(defaultValue !=null && defaultValue!= undefined){
                text.val(defaultValue);
               // if(e.type.hasOwnProperty("disabled") && defaultValue!==""){
                  //  if(e.type.disabled)
                  //      text.attr('disabled','disabled');
               // }
            }
        }  **/

        if (e.hasOwnProperty("placeholder")) {
            if (e.placeholder.hasOwnProperty("langProp"))
                text.attr('placeholder', guiLangProps[e["placeholder"]["langProp"]]); //text.attr('placeholder', e["placeholder"][o.lang]);
        }

        //console.log("validationRule --------------- "+validationRule + " for "+key);
        //console.log("bootstrapValidator_Utils --------------- "+bootstrapValidator_Utils + " for "+key);

        if(validationRule &&  bootstrapValidator_Utils){
            bootstrapValidator_Utils.setValidationAttributes(text, validationRule, o.lang);
        }

        if(e.hasOwnProperty("disabled")) {
            text.prop('disabled', e.disabled);
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

        $(containerId).html(text);
       //text.appendTo(containerId);  REFACTORING


        callback();

    };

    Fx_ui_Text.prototype.getValue = function (e) {
        return $("#" + e.id).val();
    };


    return Fx_ui_Text;
});