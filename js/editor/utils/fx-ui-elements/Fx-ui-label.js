define([
    "jquery",
    "fx-editor/utils/Fx-element-utils",
    "i18n!fx-editor/conf/nls/guiLangProps",
    "i18n!fx-editor/nls/langProperties",
    "fx-editor/utils/Fx-date-utils",
    "fx-editor/utils/Fx-json-utils"], function ($, Element_Utils, guiLangProps, langProps, Date_Utils, Json_Utils) {

    var element_Utils, date_Utils, json_Utils;

    function Fx_ui_Label() {
        element_Utils = new Element_Utils();
        date_Utils = new Date_Utils();
        json_Utils = new Json_Utils();
    }

    Fx_ui_Label.prototype.validate = function (e) {
        return true;
    };

    Fx_ui_Label.prototype.render = function (e, name, key, o, callback) {
        var self = this;

        // add any multilingual component to the path
         if(e.hasOwnProperty("value")){
            if(e.value.hasOwnProperty("multilingual")){
                if(e.value.multilingual)
                    name = name +'.'+o.lang;
            }
        }

        // create the HTML element
        var label = $("<label/>", {
            "class": "control-label",//o.cssClass,
            "for": name
        });

        //need to check if lang attribute and to set it, so it can be used in serialization later
        if (name.match(o.lang+"$")) {
            label.attr('data-multi-lang', o.lang);
        }

        //set the type
        label.attr('type', e.type.name);
        //set the id
        label.attr('id', key);


        if(o.values!=null){
            var toFormat = date_Utils.getFormat(o.datesConfig, date_Utils.getDateType(), "gui");
            var value = element_Utils.getElementValue(name, o.values, e);

            if(e.type.name == 'sequence'){
                var items =  element_Utils.getValues(value);
                value = items.join('; ');
            }
            else if(e.type.name == 'select' || e.type.name == 'hierarchy'){
                var labels = element_Utils.getValueLabels(value, o.lang);
                value = labels.join('; ');
            }
            else if(e.type.name == 'entities' || e.type.name == 'subentities'){
                value =  guiLangProps[value];
            }
            else if(e.type.name == 'date'){
                value =  date_Utils.formatDate(value, toFormat);
            }
            else if(e.type.name == 'period'){
                var period = "";
                    if(value.hasOwnProperty("from")) {
                        if(value["from"] !== "") {
                            var fDate = date_Utils.formatDate(value["from"], toFormat);
                            period += fDate;
                        }
                    }
                    if(value.hasOwnProperty("to")) {
                        if(value["to"] !== ""){
                            var efDate = date_Utils.formatDate(value["to"], toFormat);
                            period += " "+langProps.to+" " + efDate;
                        }
                    }

                  value = period;
            }

            if(value !=null && value!= undefined){
                label.append(value);

            }
        }

        var containerId = '#'+ o.container + key;
        if(e.hasOwnProperty("fieldSetId"))  {
            containerId = '#'+o.container + e.fieldSetId+'-'+key;
        }


        label.appendTo(containerId);


        callback();

    };

    Fx_ui_Label.prototype.getValue = function (e) {
        return $("#" + e.id).val();
    };


    return Fx_ui_Label;
});