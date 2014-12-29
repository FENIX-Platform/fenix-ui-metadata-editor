define([
    "jquery",
    "fx-editor/utils/Fx-element-utils",
    "i18n!fx-editor/conf/nls/guiLangProps"], function ($, Element_Utils, guiLangProps) {

    var defaultOptions = {
        css_classes: {
            ICON_EXPAND: "fa fa-caret-down fa-fw",
            ICON_COLLAPSE: "fa fa-caret-up fa-fw"
        }
    }, element_Utils, counter = 0;

    function Fx_ui_CloneButton() {
        element_Utils = new Element_Utils();
    }

    Fx_ui_CloneButton.prototype.validate = function (e) {
        return true;
    };


    Fx_ui_CloneButton.prototype.render = function (e, name, key, o, callback) {

        var rule, css = 'btn btn-default',
        hasMoreThanOneItem = false,
        formIdentifier = '#'+o.formIdentifier;

        if(o.values!=null){
            var value = element_Utils.getElementValue(name, o.values, e);
            if(value !=null && value!= undefined){
                if(value instanceof Array){
                    if(value.length > 1)  {
                        counter = value.length - 1;
                        hasMoreThanOneItem = true;
                    }
                }
            }
        }

        var self = this;

        var bootstrapValidator_Utils;

        if(o.validationUtils != undefined) {
            bootstrapValidator_Utils = o.validationUtils;
        }

        if(e.hasOwnProperty("rule")){
            rule = e.rule;
        }

        if(e.type.hasOwnProperty("style")) {
            css = e.type.style;
        }

        var $addButton = $("<button/>", {
            "class": 'btn btn-default pull-right',
            "type" : 'button',
            "name" : key,
            "id": "add-clone-"+key
        });

        $addButton.text(" "+ guiLangProps.addAnother);
        if(e.type.hasOwnProperty("buttons"))
            self.setButtonProperties(e.type.buttons, "add", $addButton);


        var $showOthersButton = $("<button/>", {
            "class": 'btn btn-default',
            "name" : key,
            "type" : 'button',
            "id": "show-all-"+key
        });

        $showOthersButton.text(guiLangProps.showAll);
        $showOthersButton.attr("data-disabled", false);

        if(e.type.hasOwnProperty("buttons"))
            self.setButtonProperties(e.type.buttons, "show", $showOthersButton);

        if(rule &&  bootstrapValidator_Utils){
            bootstrapValidator_Utils.setValidationAttributes($addButton, rule, o.lang);
        }

        // Add button click handler
        if(e.type.hasOwnProperty("clone")) {
            var clone = e.type.clone,
                resetFields = [], cloneLegendTitleFields = [];

            //Fields whose values should be set to '', when cloned
            if(clone.hasOwnProperty("resetFields")){
                resetFields =  clone["resetFields"];
            }

            //Fields whose values should be used to append to the Field Set Legend, when cloned
            if(clone.hasOwnProperty("cloneTitleFields")){
                cloneLegendTitleFields =  clone["cloneTitleFields"];
            }


            // set button disabled, by default
            //element.prop("disabled",true);


            $addButton.on('click', {clone: clone}, function() {

                if(clone.hasOwnProperty("property")){

                    // set data about the template
                    $addButton.attr("data", {"template": "#"+clone.property});

                    var indexCounter = (++counter);




                    var $clone = self.createClone(o, e, clone, formIdentifier, indexCounter,  key, cloneLegendTitleFields, resetFields);

                    $clone.find(".form-control:first").each(function() {
                        $(this).focus();
                    });


                    //collapse fieldsets except the newly added clone
                    $('fieldset[name="'+key+'[0]"]').each(function() {
                       if($(this).attr("id")!=$clone.attr("id")){
                          $(this).find("*:not(legend, legend *, i, small)").toggle(false);
                           $(this).find("legend:first span:first").removeClass();
                           $(this).find("legend:first span:first").addClass(defaultOptions.css_classes.ICON_EXPAND);
                        }  else {
                           $(this).find("*:not(legend, legend *, i, small)").toggle(true);
                       }
                    });
                }
            });


            $showOthersButton.on('click', {clone: clone}, function() {
                var value = element_Utils.getElementValue(name, o.values, e);

                //start from second item (j == 1)
                for(var j = 1; j < value.length; j ++)  {
                    if(clone.hasOwnProperty("property")){
                        // set data about the template
                        $showOthersButton.attr("data", {"template": "#"+clone.property});
                        var $clone = self.createClone(o, e, clone, formIdentifier, j, key, cloneLegendTitleFields, null, value);

                    }
                }
                $showOthersButton.attr('data-disabled', true);
                $showOthersButton.attr('disabled', 'disabled');
                $showOthersButton.css('color', 'black');
            });
        }

        // console.log('SELECT validate '+ e.type + ' for '+name);

        var containerId = '#'+ o.container + key;
        if(e.hasOwnProperty("fieldSetId"))  {
            containerId = '#'+o.container + e.fieldSetId+'-'+key;
        }

        if(hasMoreThanOneItem)  {
            //$showOthersButton.appendTo(containerId);    REFACTORING
            $(containerId).html($showOthersButton);
        }


        //$addButton.appendTo(containerId);  REFACTORING
        $(containerId).html($addButton);

        callback();

    };


    Fx_ui_CloneButton.prototype.getValue = function (e) {
        return $("#" + e.id).val();
    };

    Fx_ui_CloneButton.prototype.createRemoveButton = function (e, resetFields, key, formIdentifier, $clone) {
       var self = this;

        //Create Remove Button
        var $removeButton = $("<button/>", {
            "class": 'btn btn-default pull-right',
            "name" : key,
            "type" : 'button',
            "id": "remove-clone-"+key
        });

        $removeButton.text(guiLangProps.remove);
        if(e.type.hasOwnProperty("buttons"))
            self.setButtonProperties(e.type.buttons, "remove", $removeButton);


        var arrayList = [];


        //set clone ID onto removeButton
        $removeButton.attr("data-clone", $clone.attr('id'));
        $removeButton.on('click', {}, function() {

            //Before removing the clone, the corresponding Bootstrap Validator fields should be removed
            $('#'+$(this).attr("data-clone")+' .form-control').each(function() {
                var removeField = $(this);
                if(removeField.attr('data-bv-field') != undefined){
                    $(formIdentifier).bootstrapValidator('removeField', removeField);
                }
            });

            // Remove the Clone
            $('#'+$(this).attr("data-clone")).remove();



            // On the remaining clones (except the first one i.e. the template), the IDs and Names are reset
            //fieldset name starts with key
            if($('fieldset[name^="'+key+'"]').size() > 1){
                //reduce the counter by one
                --counter;

                    $($('fieldset[name="'+key+'[0]"]').get().reverse()).each(function(index, value) {

                        var fieldSet = $(value),
                            $legend = $('#'+fieldSet.attr('id') + ' legend:first label'),
                            $legendFirst = $('#'+fieldSet.attr('id') + ' legend:first'),
                            $formControl =  $('#'+fieldSet.attr('id') + ' .form-control');


                        $legendFirst.attr("data-label-index", (index + 1));
                        $legendFirst.attr("data-array-index", index );

                        //$legend.text(function(idx,text){
                          //  return text.replace(/\d+/,$legendFirst.attr('data-label-index'));
                        //});

                        // Find all form control elements in the remaining clones and set a new ID, name and reset Bootstrap Validator Variables
                        $formControl.each(function(){
                            var fCtrl = $(this);
                            var fCtrlName = fCtrl.attr('name');

                            //New name
                            var newName = fCtrlName.replace(/\d+/, function(str) {
                                return   index;//$legendFirst.attr("data-array-index");// return str > 0 ? str-1 :str;
                            });
                            fCtrl.attr('name', newName);

                            //New Id
                            var fCtrlId = fCtrl.attr('id');
                            var newId = fCtrlId.replace(/\d+/, function(str) {
                                return   index;//return str > 0 ? str-1 :str;
                            });
                            fCtrl.attr('id', newId);

                            //Bootstrap Validator Parameters
                            if(fCtrl.attr('data-bv-field') != undefined){
                                //Remove the existing field first, from the validator first as the name has changed
                                $(formIdentifier).bootstrapValidator('removeField',  fCtrl);

                                fCtrl.attr('data-bv-field', newName);
                                // The following elements need to be removed, as they will be regenerated on the basis of the newName
                                // When bootstrapValidator('addField') is called
                                //clonedfs.next().remove();  // First next refers to <i> element
                                // clonedfs.next().remove();  // Subsequent next refers to <small> element
                                fCtrl.nextAll().remove();

                                //Re-Add the modified field to the bootstrapValidator
                                $(formIdentifier).bootstrapValidator('addField',  fCtrl);
                            }
                        });
                    });

            }

        });


        return $removeButton;
    };

    Fx_ui_CloneButton.prototype.setButtonProperties = function(eButtons, buttonType, button){
        if(eButtons.hasOwnProperty(buttonType)){
            if (eButtons[buttonType].hasOwnProperty("langProp")){
                button.text(" "+guiLangProps[eButtons[buttonType]["langProp"]]);
            }

            if (eButtons[buttonType].hasOwnProperty("icon")){
                $( "<span class='"+eButtons[buttonType].icon+"'></span>" ).prependTo(button);
            }
        }
    };


    Fx_ui_CloneButton.prototype.createClone = function (o, e, clone, formIdentifier, indexCounter, key, cloneLegendTitleFields, resetFields, value) {

        var self = this, cssProp = "margin-bottom";

        if(clone.hasOwnProperty("property")){

            // find template, which will be cloned
            var $template = $("#"+clone.property);
            var templateName = $template.attr("name");




                //return text.replace(/\w+$/, function(str) { return str +" [NEW] "+ $legend.attr("data-label-index"); })


            //Track how many clones have been added (indexing starts at 1 for the first clone, as the template itself will be index == 0)
            // clone the template
            var $clone = $template.clone(true, true);

            //ensure template select values are set in the clone
            $template.find('select').each(function(i) {
                $clone.find('select').eq(i).val($(this).val());
            });


            //Modify the attributes of the clone
            //change ids
            $clone.attr('id',$clone.attr('id').replace(/\w+$/, function(str) {
                return str + indexCounter; }) );




            // Find all elements in $clone that have an id attribute and set a new ID, reset value property
            $clone.find('[id]').each(function() {
                //Perform the same replace as above
                var $el = $(this);
                var id  = $el.attr('id');
                var name  = $el.attr('name');



                //set new id
                $el.attr('baseIdentifier', id);

                var newID = id.replace(/\w+$/, function(str) { return str + indexCounter; });
                $el.attr('id', newID);

                //set new name and reset Bootstrap Validator attributes (if defined)
                if(name!=undefined){

                    //\d = replacing the digit in the name
                    var newName = $el.attr('name').replace(/\d+/, function(str) { return indexCounter; });
                    $el.attr('name', newName);


                    // This is read only: To ensure that select multiple choice label can be found
                    if(o.readOnly && $el.attr("data-mappedpath")!=undefined && e.type.name == 'clonebutton') {
                         $el.attr('data-mappedpath', $el.attr('data-mappedpath').replace(/\d+/, function(str) {
                            return indexCounter; }) );
                           e.fieldSetMappedName = $el.attr("data-mappedpath");
                    }

                    //  console.log(id + " "+$el.val());
                    //set values
                    if(resetFields!==undefined && resetFields!==null){
                        if($.inArray(id, resetFields) > -1){
                            $el.val("");   // reset field values
                        }
                    } else if(value!== undefined) {

                        // reset all field values
                        $el.val("");

                        if(o.readOnly  && $el.attr('data-readonly')!=undefined)  {
                           $el.text("");
                        }

                        var keys = newName.split('.');
                        var parent = keys[0];
                        var find = newName.replace(parent+'.','');


                        var val = element_Utils.getElementValue(find, value[indexCounter], $el);

                        if($el.is('select') ) {
                            if(val!=null && val!=undefined){
                                var codes = element_Utils.getValues(val);
                                val = element_Utils.removeDuplicatesFromArray(codes);
                            }
                        }
                        if(val !=null && val!= undefined){
                            if(o.readOnly)  {
                                if($el.attr('type')!=undefined) {
                                   if($el.attr('type') == 'select'){
                                       if($el.attr('multiple-choice')!= undefined){
                                             val = element_Utils.getElementValue($el.attr('name')+"Label"+"."+o.lang, o.values, e);
                                       } else {
                                           var labels = element_Utils.getValueLabels(value, o.lang);
                                           val = labels.join('; ');
                                       }
                                   }
                                }
                                //$el.append(val); REFACTORING
                                $el.html(val);
                            }
                            else {
                              $el.val(val);
                            }
                        }


                    }



                    //Bootstrap Validator Parameters
                    if($el.attr('data-bv-field') != undefined){
                        $el.attr('data-bv-field', newName);
                        // The following elements need to be removed, as they will be regenerated on the basis of the newName
                        // When bootstrapValidator('addField') is called
                        // $el.next().remove();  // First next refers to <i> element
                        //$el.next().remove();  // Subsequent next refers to <small> element

                        $el.nextAll().remove();

                    }
                }
            });



            //set some padding, so there is a space between each added clone
            $clone.css(cssProp, "20px");

            if(!o.readOnly){
                $clone.find('legend:first').each(function() {
                    //$(this).append(self.createRemoveButton(e, resetFields, key, formIdentifier, $clone));  REFACTORING
                    $(this).html(self.createRemoveButton(e, resetFields, key, formIdentifier, $clone));
                });
            }

            var $fs = $('fieldset[name^="'+key+'"]:first');
            $clone.insertBefore($fs);

            $clone.find('.form-control').each(function() {
                var fc = $(this);
                if(fc.attr('data-bv-field') != undefined){
                    $(formIdentifier).bootstrapValidator('addField', fc);

                }
            });

            //change Legend label text and track the label-index  and array-index
            $clone.find('legend:first').each(function() {
                var $leg = $(this);
                var label="";
                $leg.attr("data-array-index", (indexCounter) );
                $leg.attr("data-label-index", (indexCounter+1) ); // Label Index is the 'indexCounter' incremented by 1, as it is more useful to the user e.g. index 0 = Item 1 label, index 1 = Item 2 label

                if($leg.attr("data-labels")!=undefined && $leg.attr("data-labels")!==null){
                     label = self.buildLegendLabel($leg, o.readOnly);
                }

                $leg.find('label').each(function() {

                var $legend = $(this);
                $legend.attr("data-array-index", $leg.attr("data-array-index") );
                $legend.attr("data-label-index", $leg.attr("data-label-index")  ); // Label Index is the 'indexCounter' incremented by 1, as it is more useful to the user e.g. index 0 = Item 1 label, index 1 = Item 2 label

                self.setLegendText($legend, label);

            });
            });
        }

        return $clone;
    };

    Fx_ui_CloneButton.prototype.buildLegendLabel = function ($legend, isReadOnly) {
        var label="", fieldsArray = [];

            if(/,/.test($legend.attr("data-labels")))
                fieldsArray = $legend.attr("data-labels").split(",");
            else
                fieldsArray.push($legend.attr("data-labels"));

            for(var k = 0; k < fieldsArray.length; k++){
                var field;
                var value;

                if($legend.attr("data-array-index") == '0'){
                    field = $("#"+fieldsArray[k]);
                }  else {
                    field = $("#"+fieldsArray[k]+$legend.attr("data-array-index"));
                }

                if(isReadOnly)
                    value = field.text();
                else {
                   value =  field.val();
                }

                if(value!=undefined){
                    label += value;
                }

            }

            if(label == ""){
                label = "["+guiLangProps.new+"]";
            }

        return label;
    };

    Fx_ui_CloneButton.prototype.setLegendText = function ($legendLabel, label) {
       $legendLabel.text(function(idx,text){
           //If legend label text contains colon, take split and take the first part
            if(/:/.test(text))
                return text.split(/:/)[0] +": "+ label ;
            else
                return text +": "+ label ;
        });
    }


    return Fx_ui_CloneButton;
});