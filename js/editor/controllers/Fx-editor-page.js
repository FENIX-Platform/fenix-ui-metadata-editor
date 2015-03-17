/*global define */

define([
    'nprogress',
    'pnotify',
    'amplify'
], function (NProgress, PNotify) {
    var o = {};

    function PageController() { }

    //(injected)
    PageController.prototype.dataentry = undefined;

    //(injected)
    PageController.prototype.bridge = undefined;


    PageController.prototype.init = function (options) {
        //console.log("------------ (1) INIT ");

        //Merge options
        $.extend(o, options);

        this.render();
    };



    PageController.prototype.renderComponents = function () {
        // console.log("------------ (2) PAGE CONTROLLER RENDER COMPONENTS() ");
        this.dataentry.render();
    };


    PageController.prototype.editorLoad = function (e) {
        console.log('editorLoad');
        var url = e.url,
                type = e.type,
                mapping = e.mapping;
        this.bridge.init(e);
        NProgress.start();
        this.bridge.get(this.dataentry, this.dataentry.updateCache, this.dataentry);
    }
    PageController.prototype.editorCopy = function (e) {
        console.log('editorCopy');
        var url = e.url,
                type = e.type,
                mapping = e.mapping;

        this.bridge.init(e);
        NProgress.start();
        this.bridge.get(this.dataentry, this.dataentry.updateCopyCache, this.dataentry);
    }
    PageController.prototype.editorSave = function (e) {
        console.log('editorSave');
        console.log(e);

        this.bridge.init(e);
        NProgress.start();
        this.bridge.query(this.dataentry, this.dataentry.updateStorage, this.dataentry);
    }
    PageController.prototype.editorOverwrite = function (e) {
        console.log('editorOverwrite');
        //console.log("------------ PAGE CONTROLLER RENDER submit listener ");
        this.bridge.init(e);
        NProgress.start();
        this.bridge.query(this.dataentry, this.dataentry.overwriteMessage, this.dataentry);
    }
    PageController.prototype.editorFinalSave = function (e) {
        console.log('editorFinalSave');
        //console.log("------------ PAGE CONTROLLER RENDER submit listener ");
        this.bridge.init(e);
        NProgress.start();
        this.bridge.query(this.dataentry, this.dataentry.finish, this.dataentry);
    }
    PageController.prototype.endQueryEditor = function () {
        NProgress.done();
    }
    PageController.prototype.emptyResponseQueryEditor = function () {
        new PNotify({
            title: 'No Result Notice',
            text: 'The request has no results',
            type: 'error',
            nonblock: {
                nonblock: true
            }
        });
    }


    PageController.prototype.initEventListeners = function () {
        var self = this;
        // Load Data
        amplify.subscribe("fx.editor.load", this, this.editorLoad);
        // Copy Data
        amplify.subscribe("fx.editor.copy", this, this.editorCopy);
        amplify.subscribe("fx.editor.save", this, this.editorSave);
        //Save Data
        amplify.subscribe("fx.editor.overwrite", this, this.editorOverwrite);
        //Save Data
        amplify.subscribe("fx.editor.final_save", this, this.editorFinalSave);
        amplify.subscribe("end.query.editor.fx", this, this.endQueryEditor);
        amplify.subscribe("empty_response.query.editor.fx", this, this.emptyResponseQueryEditor);
    };

    PageController.prototype.preValidation = function () {
        if (!this.dataentry) {
            throw new Error("PAGE CONTROLLER: INVALID DATAENTRY ITEM.")
        }

    };



    PageController.prototype.render = function () {

        this.preValidation();
        this.initEventListeners();

        this.renderComponents();
    };

    return PageController;

});