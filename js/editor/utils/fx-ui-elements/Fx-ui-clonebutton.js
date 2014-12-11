define([
    "jquery"], function ($) {

    var defaultOptions = {
        css_classes: {
            ICON_EXPAND: "fa fa-caret-down fa-fw",
            ICON_COLLAPSE: "fa fa-caret-up fa-fw"
        }
    };

    function Fx_ui_CloneButton() {
    }

    Fx_ui_CloneButton.prototype.validate = function (e) {
        return true;
    };

    Fx_ui_CloneButton.prototype.render = function (e, name, key, o, callback) {

        var rule, css = 'btn btn-default';
        var counter = 0;

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
            "class": 'btn btn-default',
            "name" : key,
            "type" : 'button'
        });
        $addButton.text("Add Another");

        if(rule &&  bootstrapValidator_Utils){
            bootstrapValidator_Utils.setValidationAttributes($addButton, rule, o.lang);
        }

        // Add button click handler
        if(e.type.hasOwnProperty("clone")) {
            var clone = e.type.clone,
                resetFields = [];

            //Fields whose values should be set to '', when cloned
            if(clone.hasOwnProperty("resetFields")){
                resetFields =  clone["resetFields"];
            }

            // set button disabled, by default
            //element.prop("disabled",true);


            $addButton.on('click', {clone: clone}, function() {

                if(clone.hasOwnProperty("property")){

                    // set data about the template
                    $addButton.attr("data", {"template": "#"+clone.property});

                    // find template, which will be cloned
                    var $template = $("#"+clone.property);
                    var templateName = $template.attr("name");
                    //Track how many clones have been added (indexing starts at 1 for the first clone, as the template itself will be index == 0)
                    var indexCounter = (++counter);

                    // clone the template
                    var $clone = $template.clone(true, true);

                    //Modify the attributes of the clone
                    //change ids
                    $clone.attr('id',$clone.attr('id').replace(/\w+$/, function(str) {
                        return str + indexCounter; }) );

                    //change Legend label text and track the label-index
                    $clone.find('legend:first label').each(function() {
                        var $legend = $(this);
                        $legend.attr("data-label-index", (indexCounter+1) ); // Label Index is the 'indexCounter' incremented by 1, as it is more useful to the user e.g. index 0 = Item 1 label, index 1 = Item 2 label
                        $legend.text(function(idx,text){
                            return text.replace(/\w+$/, function(str) { return str +" "+ $legend.attr("data-label-index"); })
                        });

                    });

                    // Find all elements in $clone that have an id attribute and set a new ID, reset value property
                    $clone.find('[id]').each(function() {
                        //Perform the same replace as above
                        var $el = $(this);
                        var id  = $el.attr('id');
                        var name  = $el.attr('name');

                        //set new value
                        if($.inArray(id, resetFields) > -1){
                            $el.val("");   // reset field values
                        }

                        //set new id
                        var newID = id.replace(/\w+$/, function(str) { return str + indexCounter; });
                        $el.attr('id', newID);

                        //set new name and reset Bootstrap Validator attributes (if defined)
                        if(name!=undefined){
                            var newName = $el.attr('name').replace(templateName, function(str) {
                                return str +"["+indexCounter+"]";
                            });

                            //Bootstrap Validator Parameters
                            if($el.attr('data-bv-field') != undefined){
                                $el.attr('data-bv-field', newName);
                                // The following elements need to be removed, as they will be regenerated on the basis of the newName
                                // When bootstrapValidator('addField') is called
                                $el.next().remove();  // First next refers to <i> element
                                $el.next().remove();  // Subsequent next refers to <small> element
                            }

                            $el.attr('name', newName);

                        }
                    });

                    //set some padding, so there is a space between each added clone
                    $clone.css("margin-bottom", "20px");


                    //Create Remove Button
                    var $removeButton = $("<button/>", {
                        "class": 'btn btn-default pull-right',
                        "name" : key+"-remove",
                        "type" : 'button'
                    });

                    $removeButton.text("Remove");
                    //set clone ID onto removeButton
                    $removeButton.attr("data-clone", $clone.attr('id'));
                    $removeButton.on('click', {}, function() {

                        //Before removing the clone, the corresponding Bootstrap Validator fields should be removed
                        $('#'+$(this).attr("data-clone")+' .form-control').each(function() {
                            var removeField = $(this);
                            var removeFieldName = $(this).attr("name");
                            if(removeField.attr('data-bv-field') != undefined){
                                $('#fx-form-10').bootstrapValidator('removeField', removeField);
                            }
                        });

                        // Remove the Clone
                        $('#'+$(this).attr("data-clone")).remove();

                        // On the remaining clones (except the first one i.e. the template), the IDs and Names are reset
                        if($('fieldset[name="'+key+'"]').size() > 1){

                             //Legend label and label index updated
                            $('fieldset[name="'+key+'"]').find('legend:first label').each(function() {
                                var $legend = $(this),
                                    newLabelIndex = 1;
                                if($legend.attr('data-label-index') != undefined && $legend.attr('data-label-index') > 1){
                                    newLabelIndex = $legend.attr('data-label-index').replace(/\d+/, function(str) {
                                        return str - 1;
                                    });
                                }

                                $legend.attr("data-label-index", newLabelIndex );

                                $legend.text(function(idx,text){
                                    return text.replace(/\d+/,$legend.attr('data-label-index'));
                                });

                            });

                            // Find all form control elements in the remaining clones and set a new ID, name and reset Bootstrap Validator Variables
                            $('fieldset[name^="'+key+'"] .form-control').each(function() {
                                var clonedfs = $(this);
                                var clonedfsName = clonedfs.attr('name');
                                //New name
                                var newName = clonedfsName.replace(/\d+/, function(str) { return str-1; });
                                clonedfs.attr('name', newName);

                                //New Id
                                var clonedfsId = clonedfs.attr('id');
                                var newId = clonedfsId.replace(/\d+/, function(str) { return str-1; });
                                clonedfs.attr('id', newId);

                                //Bootstrap Validator Parameters
                                if(clonedfsId.attr('data-bv-field') != undefined){
                                    //Remove the existing field first, from the validator first as the name has changed
                                    $('#fx-form-10').bootstrapValidator('removeField',  clonedfs);

                                    clonedfs.attr('data-bv-field', newName);
                                    // The following elements need to be removed, as they will be regenerated on the basis of the newName
                                    // When bootstrapValidator('addField') is called
                                    clonedfs.next().remove();  // First next refers to <i> element
                                    clonedfs.next().remove();  // Subsequent next refers to <small> element

                                    //Re-Add the modified field to the bootstrapValidator
                                    $('#fx-form-10').bootstrapValidator('addField',  clonedfs);
                                }

                });

                        }

                    });


                    $clone.find('legend:first').each(function() {
                        $(this).append($removeButton);
                    });


                    // First parent fieldset
                    var $fs = $('fieldset[name="'+key+'"]:first');
                    $clone.insertBefore($fs);


                    $clone.find(".form-control:first").each(function() {
                        $(this).focus();
                    });

                    $clone.find('.form-control').each(function() {
                        var fc = $(this);
                        if(fc.attr('data-bv-field') != undefined){
                            $('#fx-form-10').bootstrapValidator('addField', fc);

                     }
                    });

                   // console.log("HERE");
                    //console.log( JSON.stringify($('#fx-form-10').data('bootstrapValidator').options.fields));

                    /**   $('fieldset[name="'+key+'"]:not(:first)').each(function(idx, item) {
                      //$('#'+$(item).attr("id")).find("*:not(legend, legend *)").toggle();

                      if ($('#'+$(item).attr("id")).find("*:not(legend, legend *)").is(':visible')) {
                          console.log($('#'+$(item).attr("id")));
                          $('#'+$(item).attr("id")).find("*:not(legend, legend *)").hide();
                      }

                        // $(this).find("*:not(legend, legend *)").collapse();
                            //if(idx > 0)  {
                            // $('#'+$(this).attr("id")).find("*:not(legend, legend *)").toggle();
                           // $(this).find("legend:first span:first").removeClass();
                           // $(this).find("legend:first span:first").addClass(defaultOptions.css_classes.ICON_COLLAPSE);
                           // }
                    });   **/




                }



            });
        }

        // console.log('SELECT validate '+ e.type + ' for '+name);

        var containerId = '#'+ o.container + key;
        if(e.hasOwnProperty("fieldSetId"))  {
            containerId = '#'+o.container + e.fieldSetId+'-'+key;
        }
        $addButton.appendTo(containerId);

        callback();

    };

    Fx_ui_CloneButton.prototype.getValue = function (e) {
        return $("#" + e.id).val();
    };


    return Fx_ui_CloneButton;
});