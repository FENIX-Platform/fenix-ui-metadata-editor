define([
    "jquery",
    "fx-editor/utils/Fx-element-utils",
    "i18n!fx-editor/nls/langProperties",
    "i18n!fx-editor/conf/nls/guiLangProps"], function ($, Element_Utils, langProperties, guiLangProps) {

    var element_Utils;

    function Fx_ui_Boolean() {
        element_Utils = new Element_Utils();
    }

    Fx_ui_Boolean.prototype.validate = function (e) {
        return true;
    };

    Fx_ui_Boolean.prototype.render = function (e, name, key, o, callback) {
        var validationRule, bootstrapValidator_Utils, self = this,
        inputType = "radio",
        labelCss = "radio-inline";

        if(o.validationUtils != undefined) {
            //console.log("VALIDATION UTILS DEFINED --------------- ");
            bootstrapValidator_Utils = o.validationUtils;
        }else {
           // console.log("VALIDATION UTILS UNDEFINED --------------- "+key);
        }

        if(e.hasOwnProperty("rule")){
            validationRule = e.rule;
        }

        var tLabel = langProperties.booleanTrue;
        var fLabel = langProperties.booleanFalse;

        // create the True element
        var textTrue = $("<input/>", {
            "name" : name
        });

        if (e.hasOwnProperty("booleanfields")) {

            for(var j = 0; j < e["booleanfields"].length; j++){
                 var item =  e["booleanfields"][j];
                 if(item.hasOwnProperty("true")){
//                     var trueItm =  item["true"];
                   if(item["true"].hasOwnProperty("langProp")) {
                         tLabel = guiLangProps[item["true"]["langProp"]];//trueItm["label"][o.lang];
                   }
                 }

                 if(item.hasOwnProperty("false")){
                   // var falseItm =  item["false"];
                    if(item["false"].hasOwnProperty("langProp")) {
                         fLabel = guiLangProps[item["false"]["langProp"]];//falseItm["label"][o.lang];;
                     }
                 }
            }
          }

        // create the HTML element
        var trueLabel = $("<label/>", {
            "class": labelCss,
            "html": tLabel
        });
        var falseLabel = $("<label/>", {
            "class": labelCss,
            "html": fLabel
        });


        //set the type
        textTrue.attr('type', inputType);
        //set the id
        textTrue.attr('id', key+"true");
        textTrue.attr('value', true);

        $(trueLabel).prepend(textTrue);

        // create the False element
        var textFalse = $("<input/>", {
            "name" : name
        });

        //set the type
        textFalse.attr('type', inputType);
        //set the id
        textFalse.attr('id', key+"false");
        textFalse.attr('value', false);

        $(falseLabel).prepend(textFalse);


       if(validationRule &&  bootstrapValidator_Utils){
          bootstrapValidator_Utils.setValidationAttributes(textFalse, validationRule, o.lang);
          bootstrapValidator_Utils.setValidationAttributes(textTrue, validationRule, o.lang);
        }



        //get Value
        if(o.values!=null){
            var value = element_Utils.getElementValue(name, o.values, e);
            if(value !=null){
                if(value== "true" || value== true){
                    textTrue.attr("checked", "checked");
                }

                if(value== "false" || value== false){
                    textFalse.attr("checked", "checked");
                }

            }
        }

        var containerId = '#'+ o.container + key;

        if(e.hasOwnProperty("fieldSetId"))  {
            containerId = '#'+o.container + e.fieldSetId+'-'+key;
        }

        //REFACTORING
        //$(containerId).prepend(trueLabel);
        //falseLabel.appendTo(containerId);

        var $aux =$('<div></div>');
        $aux.append(trueLabel);
        $aux.append(falseLabel);
        $(containerId).html($aux.children());

        callback();

    };

    Fx_ui_Boolean.prototype.getValue = function (e) {
        return $("#" + e.id).val();
    };


    return Fx_ui_Boolean;
});