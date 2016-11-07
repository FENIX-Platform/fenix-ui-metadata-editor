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

            /*title : {
                validoSeGliAltriEsistono : {
                    altri : "languageDetails"
                }
            }*/

        },

        validators : {
            validoSeGliAltriEsistono :  function(value, values, params, key){

                var altri = params.altri,
                    langValue = this.getNestedProperty(altri, values)

                /*console.log(value)
                console.log(values)
                console.log(params)
                console.log(this)
                console.log(this.getNestedProperty(key, values));
*/
                return langValue.length === 0 ? ["test not passed"] : true; //return true or and array of errors
            }
        }
    }
});