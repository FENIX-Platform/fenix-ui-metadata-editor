define([
    "loglevel",
    "jquery"
], function (log, $) {

    'use strict';

    var s = {
    };

    function MetaDataEditor(obj) {
        log.info("[MDE] Meta Data Editor", obj);

        //$.extend(true, this, C, {initial: obj || {}, $el: $(obj.el)});

        var valid = this._validateInput();

        if (valid === true) {

            //this.readConfiguration();
            //this._initVariables();
            //this._bindEventListeners();
            this.valid = true;
            return this;

        } else {
            this.valid = false;
            log.error("Impossible to create MDE", valid);
        }
    }



    MetaDataEditor.prototype._validateInput = function () {
        //TODO: Validate
        return true;
    };

    MetaDataEditor.prototype._initVariables = function () {
        console.log(this);
    };


    return MetaDataEditor;
});
