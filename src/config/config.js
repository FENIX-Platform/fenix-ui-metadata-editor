define(function () {

    'use strict';

    return {

        outputFormat: "metadata", // plain metadata

        nls: ["EN", "FR", "ES"],

        cache : false,

        lang : "EN",

        sectionContentClassName : "content",

        sectionIndexClassName : "index",

        constraints : {
            title : {
                ifOtherExists : {
                    others : "languageDetails"
                }

            }

        },

        validators : {
            ifOtherExists :  function(value, values, params, key){
                // value = obj, value of the caller
                // values = obj, value of the all object
                // params = obj, the object called
                // key = string, the key of the caller
                console.log("ifOtherExists", value, values, params, key);

                var others = params.others,
                    langValue = this.getNestedProperty(others, values);

                console.log(others, langValue);
                //return langValue.length === 0 ? ["test not passed"] : true; //return true or and array of errors
                return true;

            }
        }
    }
});