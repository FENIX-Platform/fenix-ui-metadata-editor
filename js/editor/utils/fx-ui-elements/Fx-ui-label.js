define([
    "jquery",
    "fx-editor/utils/Fx-element-utils",
    "i18n!fx-editor/conf/nls/guiLangProps",
    "i18n!fx-editor/nls/langProperties",
    "fx-editor/utils/Fx-date-utils",
    "fx-editor/utils/Fx-json-utils",
    "fx-editor/utils/fx-ui-elements/Fx-ui-clonebutton"], function ($, Element_Utils, guiLangProps, langProps, Date_Utils, Json_Utils, Clone_Utils) {

    var element_Utils, date_Utils, json_Utils, clone_Utils, hasMoreThanOneItem = false;

    function Fx_ui_Label() {
        element_Utils = new Element_Utils();
        date_Utils = new Date_Utils();
        json_Utils = new Json_Utils();
        clone_Utils = new Clone_Utils();
    }

    Fx_ui_Label.prototype.validate = function (e) {
        return true;
    };

    Fx_ui_Label.prototype.render = function (e, name, key, o, callback) {

        var self = this, formIdentifier = '#'+o.formIdentifier;

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
            "for": name,
            "name" : name,
            "data-mappedpath": e.fieldSetMappedName
        });

        label.attr('data-readonly', true);

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
            else if(e.type.name == 'clonebutton'){
                if(value !=null && value!= undefined){
                    if(value instanceof Array){
                        if(value.length > 1)  {
                          hasMoreThanOneItem = true;
                        }
                    }
                }

                if(e.type.hasOwnProperty("clone") && hasMoreThanOneItem){
                    var clone = e.type.clone, cloneLegendTitleFields = [],
                label = $("<button/>", {
                    "class": 'btn btn-default',
                    "name" : key,
                    "type" : 'button',
                    "id": "show-all-"+key
                });
                label.text(guiLangProps.showAll);
                if(e.type.hasOwnProperty("buttons"))
                 clone_Utils.setButtonProperties(e.type.buttons, "show", label);

                 //Fields whose values should be used to append to the Field Set Legend, when cloned
                 if(e.type.clone.hasOwnProperty("cloneTitleFields")){
                        cloneLegendTitleFields =  e.type.clone["cloneTitleFields"];
                 }


                 label.on('click', {clone: clone}, function() {
                  //  var value = element_Utils.getElementValue(name, o.values, e);


                    //start from second item (j == 1)
                    for(var j = 1; j < value.length; j ++)  {
                        if(clone.hasOwnProperty("property")){
                            // set data about the template
                            label.attr("data", {"template": "#"+clone.property});
                            var $clone = clone_Utils.createClone(o, e, clone, formIdentifier, j, key, cloneLegendTitleFields, null, value);

                        }
                    }
                    $(this).attr('disabled', 'disabled');
                    $(this).css('color', 'black');
                });
                }
           }
            else if(e.type.name == 'select' || e.type.name == 'hierarchy'){
                if(e.source.type.hasOwnProperty("multipleChoice")){
                   label.attr("multiple-choice", name);
                   value = element_Utils.getElementValue(name+"Label"+"."+o.lang, o.values, e);
                } else {
                    var labels = element_Utils.getValueLabels(value, o.lang);
                    value = labels.join('; ');
                }
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

        //label.appendTo(containerId);   REFACTORING
        $(containerId).html(label);

        callback();
    };

    Fx_ui_Label.prototype.getValue = function (e) {
        return $("#" + e.id).val();
    };


    return Fx_ui_Label;
});