/*global define */

define([
    "jquery",
    "fx-editor/plugins/Fx-editor-bridge-dataentry-plugin",
    "fx-editor/widgets/Fx-widgets-commons",
    "fx-editor/widgets/Fx-widgets-storage",
    "fx-editor/utils/Fx-json-utils",
    "fx-editor/utils/Fx-lang-utils",
    'nprogress',
    'pnotify',
    'jQuery.XDomainRequest',
    'amplify'
], function ($, Plugin, W_Commons, W_Storage, Json_Utils, LangUtils, NProgress, PNotify) {

    var w_Commons, w_Storage, ajaxConf, mappingConf, guiConf, validationConf, datesConf, resourceType, resourceTypeModule, source, readOnly, cache = {}, json_Utils, lang_Utils, guiIsObj,
        o = {},
        defaultOptions = {
            name : 'fx-editor-dataentry',
            resourceType: "dataset",
            config: {
                ajaxEventCalls: "conf/json/fx-editor-ajax-config.json"
            },
            submit_default_action: null,
            source: null,
            readOnly: false,
            widget: {
                lang: 'EN'
            },
            saveTypes: {
                OVERWRITE: "overwrite",
                CREATE: "create",
                GET: "get"
            },
            events: {
                SELECT: 'fx.editor.menu.select',
                FINAL_SAVE: 'fx.editor.final_save',
                INIT_STORAGE: 'fx.editor.init_storage',
                NEW_METADATA_SUCCESS: "fx.editor.saved",
                OVERWRITE_METADATA_SUCCESS: "fx.editor.overwritten",
                SUBMIT : "fx.editor.form.submit",
                CANCEL_START: "fx.editor.form.cancel.start",
                CANCEL_FORM: "fx.editor.form.cancel",
                CHECK_FORM_CHANGED: "fx.editor.module.form_check",
                SAVE : "fx.editor.save",
                LOAD: "fx.editor.load",
                COPY: "fx.editor.copy",
                METADATA_EDITOR_FINISH: "fx.editor.finish",
                METADATA_EDITOR_ROOT_ENTITY_STATUS: "fx.editor.root.entity.status",
                OVERWRITE : "fx.editor.overwrite",
                REMOVE: "fx.editor.module.remove",
                FIND: "fx.editor.module.find",
                EMPTY_ROOT_ENTITY:  "fx.editor.module.empty_root",
                INVALID: 'fx.editor.form.invalid',
                EXIT_METADATA: 'fx.editor.metadata.exit',
                COPY_METADATA: 'fx.editor.metadata.copy'
            }
            // onFinishClick - callback called when Finish button has been clicked
           //onFinishClick:   function (data) {}
        };

    var selectors = {
        CONTAINER : ".fx-editor-data-entry-container",
        TOGGLE_BTN: ".fx-editor-header-btn-expand"
       // COPY_BTN: ".fx-editor-copy-btn",
      //  FINISH_BTN: ".fx-editor-finish-btn",
      //  INSTRUCTION: "#fx-editor-instruction",
      //  EDITOR_HEADING: "#fx-editor-heading"
    };

    function DataEntryController() {
        //Merge options
        $.extend(o, defaultOptions);

        this.publishFxEditorBridgePlugin();

        w_Commons = new W_Commons();
        w_Storage = new W_Storage();
        json_Utils = new Json_Utils();
        lang_Utils = new LangUtils();
    }

    //(injected)
    DataEntryController.prototype.menu = undefined;

    //(injected)
    DataEntryController.prototype.form = undefined;

    //(injected)
    DataEntryController.prototype.progress = undefined;


    DataEntryController.prototype.init = function (options) {
        $.extend(o, options);
        var self = this;

        ajaxConf = o.config.ajaxEventCalls;
        mappingConf = o.config.jsonMapping;
        guiConf = o.config.gui;
        validationConf = o.config.validation;
        datesConf = o.config.dates;
        resourceType = o.resourceType;
        source = o.source;
        readOnly = o.readOnly;
        guiIsObj = o.config.guiIsObj;

     // SET SAVE ACTION: Default is Create New
        cache.saveAction = {type: o.saveTypes.CREATE};
        cache.saveAjax = {};
    };

    DataEntryController.prototype.prepareGuiConf = function () {
        //console.log("------------ DATA ENTRY CONTROLLER prepareGuiConf () resourceType = "+  resourceType);
        //console.log("------------ DATA ENTRY CONTROLLER prepareGuiConf () guiConf = "+  cache.jsonGuiConf);

        //disable Resource Representation Type
        // set the default resourceRepresentation value
        var pth = json_Utils.findParentPathForProperty(cache.jsonGuiConf, "resourceRepresentationType");

        if (pth) {
            if (pth != null) {
                var parent = json_Utils.findObjectByPath(cache.jsonGuiConf, pth);
                if (parent != undefined) {
                    if (parent["resourceRepresentationType"].hasOwnProperty("source")) {
                        if (parent["resourceRepresentationType"].source.hasOwnProperty("datafields")) {
                            parent["resourceRepresentationType"].source.datafields["defaultCode"] = resourceType;  // reset the defaultCode
                            parent["resourceRepresentationType"].type["enabled"] = false; // disable the select
                        }
                    }
                }
            }

            var parentPth = pth.split(".");
            var parentObj = json_Utils.findObjectByPath(cache.jsonGuiConf, parentPth[0]);
            if (parentObj != undefined) {
                resourceTypeModule = parentObj["module"];
            }
        }

        // Loop on the panels and sub-panels only and remove
        // un-necessary & form will hide the properties

    };

    DataEntryController.prototype.renderComponents = function () {
        var self = this;
        NProgress.start();
      //  $(".fx-header:first").hide(); // Fenix Data Editor title
      //  $(selectors.EDITOR_HEADING).hide();
      //  $(selectors.INSTRUCTION).hide();

        if(guiIsObj){
            //The configuration is an object and not a file
            //Cache json configuration files: Validation and Json Mapping
            $.when($.getJSON(ajaxConf), $.getJSON(mappingConf), $.getJSON(validationConf),  $.getJSON(datesConf))
                .done(function( ajaxJsn, mappingJsn, validationJsn, datesJsn) {
                    cache.jsonAjax = ajaxJsn[0];
                    cache.jsonMapping = mappingJsn[0];
                    cache.jsonGuiConf = guiConf;
                    cache.jsonValidationConf = validationJsn[0];
                    cache.jsonDatesConf = datesJsn[0];

                    cache.rootEntity = getRootEntity();
                    cache.rootLabel = getRootLabel(cache.rootEntity);

                    self.prepareGuiConf();
                    self.form.render({config: {cache: {mapping: cache.jsonMapping, validation: cache.jsonValidationConf,  dates: cache.jsonDatesConf}}});

                    self.menu.render({config: {cache: {gui: cache.jsonGuiConf, validation: cache.jsonValidationConf}}}, function(panels){

                        //  if(cache.jsonAjax.hasOwnProperty("onSave")){
                        if(cache.jsonAjax.hasOwnProperty("create")){
                            cache.saveAjax[o.saveTypes.CREATE] = {url: cache.jsonAjax.create.url, type: cache.jsonAjax.create.type, response: cache.jsonAjax.create.response};
                        }
                        if(cache.jsonAjax.hasOwnProperty("overwrite")){
                            cache.saveAjax[o.saveTypes.OVERWRITE] = {url: cache.jsonAjax.overwrite.url, type: cache.jsonAjax.overwrite.type, request: cache.jsonAjax.overwrite.request};
                        }

                        if(cache.jsonAjax.hasOwnProperty("get")){
                            cache.saveAjax[o.saveTypes.GET] = {url: cache.jsonAjax["get"].url, type: cache.jsonAjax["get"].type,  response: cache.jsonAjax["get"].response};
                        }
                        // }

                        //LOADING DATA
                        if (source!=null) {
                            self.populateStorageWithSpecialEntities();
                            var keys =  w_Storage.getAllKeys();
                            if(o.submit_default_action)
                            {
                                cache.saveAction.type = o.submit_default_action;
                            }
                            w_Commons.raiseCustomEvent(document.body, o.events.LOAD, {url:source.url, type: source.type, mapping: cache.jsonMapping, keys: keys, call: "DATA-ENTRY: LOAD"});
                        } else {
                            //alert("MENU DEFAULT")
                            if(o.submit_default_action)
                            {
                                cache.saveAction.type = o.submit_default_action;
                            }
                            self.menu.setDefault();
                        }
                        NProgress.done();
                    });
                });
        }
        else
        {
            //Cache json configuration files: Validation and Json Mapping
            $.when($.getJSON(ajaxConf), $.getJSON(mappingConf),  $.getJSON(guiConf), $.getJSON(validationConf),  $.getJSON(datesConf))
                .done(function( ajaxJsn, mappingJsn, guiJsn, validationJsn, datesJsn) {
                    cache.jsonAjax = ajaxJsn[0];
                    cache.jsonMapping = mappingJsn[0];
                    cache.jsonGuiConf = guiJsn[0];
                    cache.jsonValidationConf = validationJsn[0];
                    cache.jsonDatesConf = datesJsn[0];

                    cache.rootEntity = getRootEntity();
                    cache.rootLabel = getRootLabel(cache.rootEntity);

                    self.prepareGuiConf();

                    //  console.log("MAPPING CACHE ....");
                    //  console.log( cache.jsonMapping);
                    //  console.log("AJAX CACHE ....");

                    //self.menu.render();
                    if(o.submit_default_action)
                    {
                        cache.saveAction.type = o.submit_default_action;
                    }
                    self.form.render({config: {cache: {mapping: cache.jsonMapping, validation: cache.jsonValidationConf,  dates: cache.jsonDatesConf}}});

                    //HIDE PROGRESS FOR NOW
                    //  self.progress.render();
                    //TEST

                    self.menu.render({config: {cache: {gui: cache.jsonGuiConf, validation: cache.jsonValidationConf}}}, function(panels){

                        //  if(cache.jsonAjax.hasOwnProperty("onSave")){
                    if (cache.jsonAjax.hasOwnProperty("create")) {
                        cache.saveAjax[o.saveTypes.CREATE] = {
                            url: cache.jsonAjax.create.url,
                            type: cache.jsonAjax.create.type,
                            response: cache.jsonAjax.create.response
                        };
                    }
                    if (cache.jsonAjax.hasOwnProperty("overwrite")) {
                        cache.saveAjax[o.saveTypes.OVERWRITE] = {
                            url: cache.jsonAjax.overwrite.url,
                            type: cache.jsonAjax.overwrite.type,
                            request: cache.jsonAjax.overwrite.request
                        };
                    }

                    if (cache.jsonAjax.hasOwnProperty("get")) {
                        cache.saveAjax[o.saveTypes.GET] = {
                            url: cache.jsonAjax["get"].url,
                            type: cache.jsonAjax["get"].type,
                            response: cache.jsonAjax["get"].response
                        };
                        }
                        // }
                    if (source == null)
                        w_Storage.deleteItem("dsd");
                    //console.log("flush")
                        //LOADING DATA
                        if (source!=null) {
                            self.populateStorageWithSpecialEntities();
                            // $(selectors.FINISH_BTN).html(lang_Utils.save);
                            // $(".fx-header:first").hide();
                            // $(selectors.EDITOR_HEADING).show();
                            // $(selectors.INSTRUCTION).hide();

                            var keys =  w_Storage.getAllKeys();

                        amplify.publish(o.events.LOAD, {
                            url: source.url,
                            type: source.type,
                            mapping: cache.jsonMapping,
                            keys: keys,
                            call: "DATA-ENTRY: LOAD"
                        });

                            //self.parseData();
                            //console.log("hasproperty "+cache.jsonAjax["onLoad"]);
                        } else {
                            //  $(selectors.FINISH_BTN).html(lang_Utils.saveAndClose);
                            // $(".fx-header:first").show();
                            // $(selectors.EDITOR_HEADING).hide();
                            // $(selectors.INSTRUCTION).show();

                            self.menu.setDefault();
                        }

                        /** if (cache.jsonAjax.hasOwnProperty("onLoad")) {
                        var keys =  w_Storage.getAllKeys();
                        //console.log("========================== renderComponents: onLoad ---- type = "+cache.jsonAjax.onLoad.type);
                        w_Commons.raiseCustomEvent(document.body, o.events.LOAD, {url: cache.jsonAjax.onLoad.url, type: cache.jsonAjax.onLoad.type, mapping: cache.jsonMapping, keys: keys, call: "DATA-ENTRY: LOAD"});
                        //self.parseData();
                        //console.log("hasproperty "+cache.jsonAjax["onLoad"]);
                    } else {
                        self.menu.setDefault();
                    }   **/

                        NProgress.done();
                    });

                    /**   $.when(self.menu.render())
                     .done(function(panels) {
                        console.log("========================== renderComponents: ---- MENU RENDER DONE "+panels);

                        self.form.render();

                        if (cache.jsonAjax.hasOwnProperty("onLoad")) {
                            var keys =  w_Storage.getAllKeys();
                            console.log("========================== renderComponents: onLoad ---- type = "+cache.jsonAjax.onLoad.type);
                            onLoad = true;
                            w_Commons.raiseCustomEvent(document.body, "load.editor.fx", {url: cache.jsonAjax.onLoad.url, type: cache.jsonAjax.onLoad.type, mapping: cache.jsonMapping, keys: keys, call: "DATA-ENTRY: LOAD"});
                            //self.parseData();
                            //console.log("hasproperty "+cache.jsonAjax["onLoad"]);
                        }
                    });
                     **/
                    //self.menu.render();
                    // self.form.render();
                });
        }
    };

//EVT handlers
    DataEntryController.prototype.evtSelect = function (e) {
        //console.log("----------------- DATA ENTRY (SELECT) "+e.detail.module);
        var moduleId = e.module.module;
        var module = e.module;
        var gui = e.gui;

        this.createForm(moduleId, module, gui);
    };
    DataEntryController.prototype.evtExitMetadata = function (e) {
        //console.log("----------------- EXIT_METADATA ");
        var type, url, event;
        //Get the urls based on the cache.saveAction type
        url = cache.saveAjax[o.saveTypes.OVERWRITE].url;
        type = cache.saveAjax[o.saveTypes.OVERWRITE].type;

        if (cache.saveAction.type == o.saveTypes.OVERWRITE) {
            var rootValues = w_Storage.getItem(cache.rootEntity);
            if (rootValues != "") {
                //w_Commons.raiseCustomEvent(document.body, o.events.FINAL_SAVE, { url: url, type: type, mapping: cache.jsonMapping, call: "DATA-ENTRY: FINAL SAVE" });
                amplify.publish(o.events.FINAL_SAVE, {
                    url: url,
                    type: type,
                    mapping: cache.jsonMapping,
                    call: "DATA-ENTRY: FINAL SAVE"
                });
            }
        }
        else {
            //w_Commons.raiseCustomEvent(document.body, o.events.METADATA_EDITOR_FINISH, { data: null, call: "DATA-ENTRY: FINISH" });
            amplify.publish(o.events.METADATA_EDITOR_FINISH, {data: null, call: "DATA-ENTRY: FINISH"})
        }
    };
    DataEntryController.prototype.evtCopyMetadata = function (e) {
        var version = e.version;
        var uid = e.uid;

        // console.log("COPY_METADATA: uid = "+uid + " | version = "+version);

        if (cache.saveAjax.hasOwnProperty(o.saveTypes.GET)) {
            var url = cache.saveAjax[o.saveTypes.GET].url;
            var type = cache.saveAjax[o.saveTypes.GET].type;


            if (version !== "" && uid !== null) {
                url = url.replace("version", version);
                url = url.replace("uid", uid);
            }
            if (version == "" && uid !== null) {
                url = url.replace("uid", "uid/" + uid);
                url = url.replace("/version", "");
            }

            //SPECIAL ENTITIES included in copy, but will be set to null
            this.populateStorageWithSpecialEntities();

            var keys = w_Storage.getAllKeys();
            //w_Commons.raiseCustomEvent(document.body, o.events.COPY, { url: url, type: type, mapping: cache.jsonMapping, keys: keys, call: "DATA-ENTRY: COPY" });
            amplify.publish(o.events.COPY, {
                url: url,
                type: type,
                mapping: cache.jsonMapping,
                keys: keys,
                call: "DATA-ENTRY: COPY"
            });
        }
    };
    DataEntryController.prototype.evtInitStorage = function (e) {

        if (source === null && resourceTypeModule !== undefined && e.id === resourceTypeModule) {
            var resourceTypeModuleValues = {};
            resourceTypeModuleValues["resourceRepresentationType"] = resourceType;
            resourceTypeModuleValues["isRoot"] = false;
            w_Storage.setItem(e.id, resourceTypeModuleValues);
        }
        else {

            w_Storage.setItem(e.id, "");
        }
    };
    DataEntryController.prototype.evtCheckFormChanged = function (e) {
        //  if (this.form.serialize() !=  w_Storage.getItem(this.form.getCurrentModule())) {
        // Something changed
        // }
    };
    DataEntryController.prototype.evtSubmit = function (e) {
        var form = e.form,
            module = e.module,
            moduleLabel = e.moduleLabel,
            url,
            type,
            event;

        this.cacheFormValues();


        //Get the urls based on the cache.saveAction type
        if (cache.saveAction.type == o.saveTypes.CREATE) {
            url = cache.saveAjax[o.saveTypes.CREATE].url;
            type = cache.saveAjax[o.saveTypes.CREATE].type;
            event = o.events.SAVE;

        }
        else if (cache.saveAction.type == o.saveTypes.OVERWRITE) {
            url = cache.saveAjax[o.saveTypes.OVERWRITE].url;
            type = cache.saveAjax[o.saveTypes.OVERWRITE].type;
            event = o.events.OVERWRITE;
        }

        //console.log("----------------- DATA ENTRY (SAVE) "+cache.saveAction.type);


        if (cache.rootEntity != undefined) {
            var rootValues = w_Storage.getItem(cache.rootEntity);

            if (rootValues != "") {
                //w_Commons.raiseCustomEvent(form, event, { url: url, type: type, mapping: cache.jsonMapping, call: "DATA-ENTRY: SAVE" });
                amplify.publish(event, {url: url, type: type, mapping: cache.jsonMapping, call: "DATA-ENTRY: SAVE"});
            } else {
                //w_Commons.raiseCustomEvent(document.body, o.events.EMPTY_ROOT_ENTITY, { moduleLabel: moduleLabel, root: cache.rootLabel });
                amplify.publish(o.events.EMPTY_ROOT_ENTITY, {moduleLabel: moduleLabel, root: cache.rootLabel});
            }
        }
    };
    DataEntryController.prototype.evtEmptyRootEntity = function (e) {
        var rootEntity = e.root;
        var moduleSaved = e.moduleLabel;

        var noRootNotice = lang_Utils.noRootNotice({
            rootModule: rootEntity
        });

        var noRootError = lang_Utils.noRootError({
            currentModule: moduleSaved,
            rootModule: rootEntity
        });

        new PNotify({
            title: noRootNotice,
            text: noRootError,
            type: 'error',
            nonblock: {
                nonblock: true
            }
        });
    };
    DataEntryController.prototype.evtInvalid = function (e) {
        var errors = e.errors;
        var text = lang_Utils.requiredFieldsError({});
        var errorList = [];
        text += '</br>';
        for (var m = 0; m < errors.length; m++) {

            text += $(errors[m]).attr('id');

            if (m < errors.length - 1) {
                text += '</br>'
            }
        }

        new PNotify({
            title: lang_Utils.requiredFieldsNotice,
            text: text,
            type: 'error',
            nonblock: {
                nonblock: true
            }
        });
    };
    DataEntryController.prototype.evtNewMetadataSuccess = function (e) {
        var text = lang_Utils.newMetadataSuccess({});

        new PNotify({
            title: lang_Utils.updateNotice,
            text: text,
            type: 'success',
            nonblock: {
                nonblock: true
            }
        });

        // Activate/Deactivate finish button
        if (cache.rootEntity != undefined) {
            var rootValues = w_Storage.getItem(cache.rootEntity);
            if (rootValues != "") {
                this.rootEntityStatus(true);
                //if($(selectors.FINISH_BTN).attr("disabled")=="disabled") {
                //  $(selectors.FINISH_BTN).removeAttr("disabled");
                // }
            } else {
                this.rootEntityStatus(false);
                // $(selectors.FINISH_BTN).attr("disabled", "disabled");
            }
        } else {
            this.rootEntityStatus(false);
            // $(selectors.FINISH_BTN).attr("disabled", "disabled");
        }

        // RE-SET SAVE ACTION: OVERWRITE
        cache.saveAction = {type: o.saveTypes.OVERWRITE};
    };
    DataEntryController.prototype.evtOverwriteMetadataSuccess = function (e) {
        var text = lang_Utils.successfulUpdate({});

        new PNotify({
            title: lang_Utils.updateNotice,
            text: text,
            type: 'success',
            nonblock: {
                nonblock: true
            }
        });

        // SET SAVE ACTION: Default OVERWRITE
        cache.saveAction = {type: o.saveTypes.OVERWRITE};
    };
    DataEntryController.prototype.evtFind = function (e) {
        //console.log("----------------- DATA ENTRY (FIND) ");
        var path = e.path;
        var formItemValues = w_Storage.getItem(path);
        if (formItemValues != "") {
        }
    };
    DataEntryController.prototype.evtLoad = function (e) {
        //cache data
    };
    DataEntryController.prototype.evtRemove = function (e) {
        this.menu.activate(e.type);
        this.form.removeItem(e.module);
    };
    DataEntryController.prototype.evtCancel = function (data) {
        amplify.publish(o.events.CANCEL_START, this);
    }
    //END evt handlers

    DataEntryController.prototype.initEventListeners = function () {

        amplify.subscribe(o.events.SELECT, this, this.evtSelect)
        amplify.subscribe(o.events.EXIT_METADATA, this, this.evtExitMetadata)
        amplify.subscribe(o.events.COPY_METADATA, this, this.evtCopyMetadata)
        amplify.subscribe(o.events.INIT_STORAGE, this, this.evtInitStorage);
        amplify.subscribe(o.events.CHECK_FORM_CHANGED, this, this.evtCheckFormChanged);
        amplify.subscribe(o.events.SUBMIT, this, this.evtSubmit);
        amplify.subscribe(o.events.EMPTY_ROOT_ENTITY, this, this.evtEmptyRootEntity);
        amplify.subscribe(o.events.INVALID, this, this.evtInvalid);
        amplify.subscribe(o.events.NEW_METADATA_SUCCESS, this, this.evtNewMetadataSuccess);
        amplify.subscribe(o.events.OVERWRITE_METADATA_SUCCESS, this, this.evtOverwriteMetadataSuccess);
        amplify.subscribe(o.events.FIND, this, this.evtFind);
        amplify.subscribe(o.events.LOAD, this, this.evtLoad);
        amplify.subscribe(o.events.REMOVE, this, this.evtRemove);
        amplify.subscribe(o.events.CANCEL_FORM, this, this.evtCancel);


        $(selectors.TOGGLE_BTN).on('click', {self: this}, function (e) {
            if ($(selectors.CONTAINER).is(":visible")) {
                e.data.self.collapseFilter();
            } else {
                e.data.self.openFilter();
            }
        });
    };

    DataEntryController.prototype.finish = function (data) {
        // console.log("Data Entry Controller: finish() DATA = "+data + " source "+source);

        if (source == null) {
            //  if(typeof o.onFinishClick === 'function')
            //  o.onFinishClick(data);

            //w_Commons.raiseCustomEvent(document.body, o.events.METADATA_EDITOR_FINISH, { data: data, call: "DATA-ENTRY: FINISH" });
            amplify.publish(o.events.METADATA_EDITOR_FINISH, {data: data, call: "DATA-ENTRY: FINISH"});
        } else {
            if (Object.keys(data).length > 0) {


                amplify.publish(o.events.METADATA_EDITOR_FINISH, {data: data, call: "DATA-ENTRY: FINISH"});
                //w_Commons.raiseCustomEvent(document.body, o.events.METADATA_EDITOR_FINISH, { data: data, call: "DATA-ENTRY: FINISH" });
                amplify.publish(o.events.OVERWRITE_METADATA_SUCCESS, {});
                //w_Commons.raiseCustomEvent(document.body, o.events.OVERWRITE_METADATA_SUCCESS, {});
            }
        }

    };

    DataEntryController.prototype.createForm = function (moduleId, module, gui) {
        // var moduleId = e.detail.module.module;


        // console.log("----------------- DATA ENTRY (SELECT): createForm "+moduleId);
        if (w_Storage.getItem(moduleId)) {
            //var jsn = w_Storage.getItem(moduleId)[moduleId];
            var jsn = w_Storage.getItem(moduleId);
            // console.log("----------------- DATA ENTRY (SELECT) "+jsn);
            // var values = JSON.parse(jsn);
            var values = jsn;
            //  console.log("========= JSN SELECT PARSE +++++++++++++++++++")
            //  console.log(values)

            // needs to be adjusted for when there is more than 1 item in the array
            if ($.isArray(jsn)) {
                values = jsn[0];
            }

            //console.log(values);
            //console.log(values.length);


            if (values !== "") {
                if (typeof values === 'object' && Object.keys(values).length > 0)
                    this.form.createModuleForm(module, w_Storage, gui, values);
                else
                    this.form.createModuleForm(module, w_Storage, gui, null);
            }
            else
                this.form.createModuleForm(module, w_Storage, gui, null);
        }
        else {
            this.form.createModuleForm(module, w_Storage, gui, null);
        }
    };

    DataEntryController.prototype.preValidation = function () {

        if (!this.menu) {
            throw new Error("DataEntryController: INVALID MENU ITEM.")
        }
        if (!this.form) {
            throw new Error("DataEntryController: INVALID FORM ITEM.")
        }


    };

    DataEntryController.prototype.render = function () {
        //console.log("------------ (2) DATA ENTRY CONTROLLER (i.e. FILTER) RENDER COMPONENTS() ");
        this.preValidation();
        this.initEventListeners();

        this.renderComponents();

    };

    DataEntryController.prototype.publishFxEditorBridgePlugin = function () {
        //console.log("------------ (2) DATA ENTRY CONTROLLER publishFxEditorBridgePlugin "+o.name);
        //FENIX Editor Plugin Registration
        if (!window.Fx_editor_bridge_plugins) {
            window.Fx_editor_bridge_plugins = {};
        }

        window.Fx_editor_bridge_plugins[o.name] = new Plugin();

        //console.log("------------ (2) DATA ENTRY CONTROLLER publishFxEditorBridgePlugin  window.Fx_editor_bridge_plugins = ");
        //console.log(window.Fx_editor_bridge_plugins);

    };

    DataEntryController.prototype.cacheFormValues = function () {
        //console.log("cache")
        var moduleIdentifier = this.form.getCurrentModule();
        var moduleValues = this.form.getValues();
        //console.log("moduleValues = "+moduleValues);
        //console.log(moduleValues);

        // console.log("moduleIdentifier = "+moduleIdentifier);
        w_Storage.setItem(moduleIdentifier, moduleValues);

    };

    DataEntryController.prototype.getValues = function () {
        return this.getAllFormValues();
    };

    DataEntryController.prototype.getAllFormValues = function () {
        var keys = w_Storage.getAllKeys();
        var root = {};
        // Delete the "EntityPath" and "isRoot" properties

        for (var i = 0; i < keys.length; i++) {
            var formItemValues = w_Storage.getItem(keys[i]);
            var values = formItemValues;

            //  console.log("============ key "+keys[i] + ' | ' +formItemValues);
            // console.log(values);

            if (values != "") {
                // needs to be adjusted for when there is more than 1 item in the array
                var isArray = false;
                if ($.isArray(values)) {
                    values = values[0];
                    // console.log("============ key "+keys[i] + ' is ARRAY | ');
                    isArray = true;
                }

                if (values.hasOwnProperty("isRoot")) {
                    if (values.isRoot) {
                        root = formItemValues;
                        // delete formItemValues.isRoot;
                    } else {
                        //  console.log("============ key "+keys[i] + ' | ' +values);
                        //  console.log(values);

                        var formObs;
                        if (values.hasOwnProperty("entityPath")) {
                            var ePth = values.entityPath.split('.');
                            //console.log("============ split ePth "+ePth + " for "+keys[i]);
                            if (isArray)
                                this.nest(ePth, root, formItemValues);
                            else
                                this.nest(ePth, root, values);
                            // delete formItemValues.entityPath;
                        }
                        else {
                            //  console.log("============ split NO Entity Path "+keys[i]);
                            // var formObs;
                            //if(formItemValues.hasOwnProperty("entityPath")){
                            //  var ePth = formItemValues.entityPath.split('.');
                            //  this.nest(ePth, root, formItemValues);
                            // delete formItemValues.entityPath;
                            // }
                            // else {
                            if (root[keys[i]] === undefined) {
                                root[keys[i]] = formItemValues;
                                // delete formItemValues.isRoot;
                            } else {
                                root[keys[i]] = root[keys[i]];

                                //This needs to be extended so that it is recursive
                                for (var item in values) {
                                    root[keys[i]][item] = values[item];
                                    // delete formItemValues[item].isRoot;

                                }
                            }
                            // }
                        }
                    }
                }

            }

        }
        // console.log("======================== ROOT ====================");
        //console.log(root);
        return root;


        /**  console.log("============ key length "+keys.length);
         for(var i=0; i<keys.length; i++){
          var formItemValues = w_Storage.getItem(keys[i]);
          console.log("============ key START "+keys[i] + ' | ' +formItemValues);
          console.log(formItemValues);

          if(formItemValues!=""){
     //   if(json_Utils.isJsonString(formItem[keys[i]])){

         //  var formItemValues = json_Utils.parse(formItem[keys[i]]);   // Parse To create JS Object
           // console.log("============ values = ");
           // console.log(formItemValues);

           if(formItemValues.hasOwnProperty("isRoot")){
              if(formItemValues.isRoot){
                 root =  formItemValues;
                 // console.log("============ key "+keys[i] + ' isRoot ');
                 //console.log(root);
                 delete formItemValues.isRoot;
              } else {
                 var formObs;
                if(formItemValues.hasOwnProperty("entityPath")){
                   var ePth = formItemValues.entityPath.split('.');
                   this.nest(ePth, root, formItemValues);
                    delete formItemValues.entityPath;
                }
                else {
                  if(root[keys[i]] === undefined){
                    root[keys[i]] = formItemValues;
                    delete formItemValues.isRoot;
                  } else {
                      root[keys[i]] = root[keys[i]];

                      //This needs to be extended so that it is recursive
                      for(var item in formItemValues) {
                          root[keys[i]][item] = formItemValues[item];
                          delete formItemValues[item].isRoot;

                      }
                  }
                }
              }
            }
           }
        }

        return root;    **/
    };

    DataEntryController.prototype.deleteObjects = function (obj, find) {
        //  console.log("======================== parseMetadata: iterate: find "+find);
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                // console.log("======================== parseMetadata: iterate: prop "+ property);

                if (typeof obj[property] == "object") {
                    // console.log("======================== parseMetadata: iterate: isObject "+ obj[property] + " prop "+property);

                    if (property == find) {
                        // console.log("MATCH find: "+find + " | prop: "+ property + "   " + obj[property]);
                        delete obj[property];
                        break;
                    }
                    else {
                        this.deleteObjects(obj[property], find);
                    }
                } //else {
                //  console.log("======================== parseMetadata: iterate: isProperty "+ obj[property]);
                //console.log("======================== parseMetadata: iterate:prop: "+ property + "   " + obj[property]);
                //if(property == find) {
                // console.log("MATCH find: "+find + " | prop: "+ property + "   " + obj[property]);
                //}
                // }
            }
        }
    };

    DataEntryController.prototype.iterate = function (obj, find, json) {
        // console.log("======================== parseMetadata: iterate: find "+find);
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                // console.log("======================== parseMetadata: iterate: prop "+ property);

                if (typeof obj[property] == "object") {
                    //   console.log("======================== parseMetadata: iterate: isObject "+ obj[property] + " prop "+property);

                    if (property == find) {
                        // console.log("MATCH find: "+find + " | prop: "+ property + "   " + obj[property]);
                        json = obj[property];
                        break;
                    }
                    else {
                        this.iterate(obj[property], find);
                    }
                } //else {
                //  console.log("======================== parseMetadata: iterate: isProperty "+ obj[property]);
                //console.log("======================== parseMetadata: iterate:prop: "+ property + "   " + obj[property]);
                //if(property == find) {
                // console.log("MATCH find: "+find + " | prop: "+ property + "   " + obj[property]);
                //}
                // }
            }
        }
        // console.log("JSON: "+json);
        // console.log(json);
        return json;
    };


    DataEntryController.prototype.updateCopyCache = function (data) {

        //console.log("updateCopyCache")
        // Determine the root entity
        var storageKeys = w_Storage.getAllKeys();
        //Populate the storage cache
        for (var i = 0; i < storageKeys.length; i++) {
            // console.log(storageKeys[i]);
            // console.log(data[storageKeys[i]]);
            w_Storage.setItem(storageKeys[i], data[storageKeys[i]]);
        }


        var responseObj = cache.saveAjax[o.saveTypes.GET].response;
        var moduleKFields = {};
        var moduleAFields = {};


        // set key fields as empty
        if (responseObj != undefined) {
            if (responseObj.hasOwnProperty("keyFields")) {
                for (var j = 0; j < responseObj["keyFields"].length; j++) {
                    var modObj = responseObj["keyFields"][j];
                    setFieldsToEmpty(modObj, moduleKFields);

                }
            }

            if (responseObj.hasOwnProperty("addedEntitites")) {
                // console.log(responseObj["addedEntitites"]);
                for (var k = 0; k < responseObj["addedEntitites"].length; k++) {
                    var moObj = responseObj["addedEntitites"][k];
                    setFieldsToEmpty(moObj, moduleAFields);
                }
            }
        }


        // console.log("=============== AFTER LOAD =================");

        // for(var i=0; i<storageKeys.length; i++){
        //  console.log(w_Storage.getItem(storageKeys[i]));

        // }

        // SET SAVE ACTION: remains as create
        cache.saveAction = {type: o.saveTypes.CREATE};

        this.menu.setDefault();

    };


    function setFieldsToEmpty(propObj, moduleFields) {
        if (typeof propObj === 'object') {
            for (var prop in propObj) {
                if (propObj.hasOwnProperty(prop)) {
                    setNullValues(prop, propObj[prop], moduleFields, false)
                }
            }
        } else {

            setNullValues(propObj, propObj, moduleFields, true)

        }


    }

    function setNullValues(prop, propObj, moduleFields, isArray) {
        moduleFields[prop];

        var jsn = w_Storage.getItem(prop);
        // console.log(jsn);
        if (isArray) {
            w_Storage.setItem(prop, "");
        }

        if (jsn != null) {
            var values = jsn;
            if ($.isArray(jsn)) {
                values = jsn[0];
            }

            var fields = propObj;
            var fieldsArry = [];
            var fieldValues = {};
            moduleFields[prop] = fields;


            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];

                //set value to null
                var value = null;
                values[field] = value;
                fieldValues[field] = value;
                fieldsArry.push(fieldValues);
            }

            moduleFields[prop] = fieldsArry;


        }


    }

    DataEntryController.prototype.updateCache = function (data) {
        var self = this;
        // console.log(data);
        var storageKeys = w_Storage.getAllKeys();
        //Populate the storage cache
        for (var i = 0; i < storageKeys.length; i++) {
            //  console.log("=================== updateCache");
            //  console.log(storageKeys[i]);
            // console.log("=================== result ");
            //console.log(data[storageKeys[i]]);
            w_Storage.setItem(storageKeys[i], data[storageKeys[i]]);
        }


        // SET SAVE ACTION: As the data was loaded
        cache.saveAction = {type: o.saveTypes.OVERWRITE};

        //Test Get storage cache
        // for(var i=0; i<storageKeys.length; i++){
        //  console.log("============= TEST: STORAGE KEY = "+storageKeys[i]);
        //  console.log( w_Storage.getItem(storageKeys[i]));
        // }

        // Activate/Deactivate finish button
        if (cache.rootEntity != undefined) {
            var rootValues = w_Storage.getItem(cache.rootEntity);
            if (rootValues != "") {
                self.rootEntityStatus(true);
                // if($(selectors.FINISH_BTN).attr("disabled")=="disabled") {
                //   $(selectors.FINISH_BTN).removeAttr("disabled");
                // }
            } else {
                self.rootEntityStatus(false);
                // $(selectors.FINISH_BTN).attr("disabled", "disabled");
            }
        } else {
            self.rootEntityStatus(false);
            // $(selectors.FINISH_BTN).attr("disabled", "disabled");
        }

        this.menu.setDefault();

        //  console.log("this.menu.getSelectedModule() = "+this.menu.getSelectedModule().module) ;

        // this.createForm(this.menu.getSelectedModule().module, this.menu.getSelectedModule());
    };

    DataEntryController.prototype.rootEntityStatus = function (isAvailable) {
        //w_Commons.raiseCustomEvent(document.body, o.events.METADATA_EDITOR_ROOT_ENTITY_STATUS, { data: { "available": isAvailable }, call: "DATA-ENTRY: ROOT_ENTITY_STATUS" });
        amplify.publish(o.events.METADATA_EDITOR_ROOT_ENTITY_STATUS, {
            data: {"available": isAvailable},
            call: "DATA-ENTRY: ROOT_ENTITY_STATUS"
        });
    };

    DataEntryController.prototype.parseData = function () {
        var json = '{"uid":"ss","version":"ss","language":{"codes":[{"code":"AR"}],"codeList":"FAO_Languages","version":"1.0"},"languageDetail":{"EN":"ss"},"title":{"EN":"ss"},"characterSet":{"codes":[{"code":"AR"}],"codeList":"FAO_Languages","version":"1.0"},"parentIdentifier":"","metadataStandardName":{"EN":"ss"},"metadataStandardVersion":{"EN":"ss"},"metadataLanguage":{"codes":[{"code":"AR"},{"code":"ZH"},{"code":"EN"}],"codeList":"FAO_Languages","version":"1.0"},"contacts":{"name":"ss","organization":{"EN":"ss"},"organizationUnit":{"EN":"ss"},"position":{"EN":""},"role":[{"code":""}],"specify":{"EN":""},"contactInfo":{"phone":"111","address":"","emailAddress":"","hoursOfService":{"EN":""},"contactInstruction":{"EN":""}}},"noDataValue":{"EN":""},"content":{"resourceRepresentationType":[{"code":"dataset"}],"keyWords":{"EN":"www,fff"},"description":{"EN":"wwww"},"statisticalConceptsDefinition":{"EN":"www"},"referencePopulation":{"statisticalPopulation":{"EN":"www"},"statisticalUnit":{"EN":"ww"},"referencePeriod":[{"code":"day"}],"referenceArea":[{"code":"adminlevel2"}]},"coverage":{"coverageSectors":[{"code":"agriculture"}],"coverageSectorsDetails":{"EN":"sector1"},"coverageGeographic":[{"code":"africa"}]}}}';
        var loadedJsnObj = json_Utils.parse(json);
        // console.log("======================== parseMetadata jsonObj = ");
        //console.log(loadedJsnObj);
        // console.log("parseData: cache.jsonMapping ======================== "+ cache.jsonMapping);

        // Determine the root entity
        var rootIdentifier = cache.rootEntity;


        // console.log("parseData: rootIdentifier ======================== "+ rootIdentifier);


        var storageKeys = w_Storage.getAllKeys();
        // Create object, whose properties match the storage keys and values are the loadedJsnObj split by key
        var splitObj = json_Utils.splitJsnByKeys(storageKeys, loadedJsnObj, rootIdentifier);
        // console.log("parseData: splitObj ======================== "+ splitObj);
        // Delete the value Obj properties that match the storage keys
        var cleanedUpObj = json_Utils.deleteRootProperties(storageKeys, splitObj);

        //Populate the storage cache
        for (var i = 0; i < storageKeys.length; i++) {
            w_Storage.setItem(storageKeys[i], cleanedUpObj[storageKeys[i]]);
        }

        //Test Get storage cache
        //for(var i=0; i<storageKeys.length; i++){
        // console.log("============= TEST: STORAGE KEY = "+storageKeys[i]);
        // console.log( w_Storage.getItem(storageKeys[i]));
        //}
    };

    function getRootEntity() {
        var rootEntity;
        var jsnRootPath = json_Utils.findParentPathForValue(cache.jsonMapping, "root");

        var rootJsnEntity = json_Utils.findObjectByPath(cache.jsonMapping, jsnRootPath);

        if (rootJsnEntity.hasOwnProperty("entity")) {
            rootEntity = rootJsnEntity["entity"];
        }

        return rootEntity;
    }

    function getRootLabel(rootEntity) {
        var rootEntityLabel;
        var jsnRootPath = json_Utils.findParentPathForValue(cache.jsonGuiConf, rootEntity);

        var rootJsnEntity = json_Utils.findObjectByPath(cache.jsonGuiConf, jsnRootPath);

        if (rootJsnEntity.hasOwnProperty("label")) {
            rootEntityLabel = rootJsnEntity["label"][o.widget.lang];
        }

        return rootEntityLabel;
    }


    DataEntryController.prototype.splitJsnByKeys = function (storageKeys, loadedJsnObj, rootIdentifier) {
        // find storage key Object in Loaded JSON
        // If defined, then the keyObj is set to the key property in the splitJsnObj

        var splitJsnObj = {};

        for (var i = 0; i < storageKeys.length; i++) {
            var keyPath = json_Utils.findParentPathForProperty(loadedJsnObj, storageKeys[i]);
            var keyObj;
            if (keyPath === undefined) {
                keyObj = "";
                if (rootIdentifier != undefined) {   // If rootIdentifier is defined then the key is the root Object and the whole loadedJsnObj is assigned to keyObj
                    if (storageKeys[i] === rootIdentifier) {
                        keyObj = loadedJsnObj;
                        keyObj.isRoot = true;
                    }
                    else {
                        keyObj = "";
                    }
                }
            }
            else {
                if (keyPath == 'rootProp') {  // keyPath = 'rootProp', means that the key is a direct property of the root object  e.g. {"content":{}}
                    keyObj = loadedJsnObj[storageKeys[i]];
                }
                else {
                    keyObj = json_Utils.findObjectByPath(loadedJsnObj, keyPath + "[" + storageKeys[i] + "]");
                }

            }

            splitJsnObj[storageKeys[i]] = keyObj;

        }

        return splitJsnObj;

    };

    DataEntryController.prototype.nest = function (keys, obj, values) {
        if (keys.length > 0) {
            var key = keys.shift()

            if (obj[key] === undefined) {
                if (keys.length === 0) {
                    // createCodes(key, value, obj, codeObj, codesArray);
                    obj[key] = values;
                } else {
                    obj[key] = {}
                }
            }
            else {
                if (keys.length === 0) {
                    obj[key] = values;
                    //createCodes(key, value, obj, codeObj, codesArray);
                } else {
                    obj[key] = obj[key];
                }
            }

            var nestingBookmark = obj[key];
        }
        if (keys.length !== 0) {
            this.nest(keys, nestingBookmark, values);
        }
    };

    DataEntryController.prototype.getName = function () {
        return o.name;
    };

    DataEntryController.prototype.collapseFilter = function () {

        $(selectors.CONTAINER).hide();
    };

    DataEntryController.prototype.openFilter = function () {

        $(selectors.CONTAINER).show();
    };

    DataEntryController.prototype.populateStorageWithSpecialEntities = function () {
        if (cache.saveAjax[o.saveTypes.GET].hasOwnProperty("response")) {
            if (cache.saveAjax[o.saveTypes.GET]["response"].hasOwnProperty("addedEntitites")) {
                var newEntities = cache.saveAjax[o.saveTypes.GET]["response"]["addedEntitites"];
                for (var i = 0; i < newEntities.length; i++) {
                    w_Storage.setItem(newEntities[i], "");
                }
            }
        }


    };

    DataEntryController.prototype.updateStorage = function (response) {
        if (response) {
            var keys = w_Storage.getAllKeys();
            var moduleIds = [];
            var moduleFields = {};


            var responseObj = cache.saveAjax[cache.saveAction.type].response;

            if (responseObj != undefined && responseObj.hasOwnProperty("keyFields")) {
                for (var j = 0; j < responseObj["keyFields"].length; j++) {
                    var moduleObj = responseObj["keyFields"][j];

                    for (var prop in moduleObj) {
                        if (moduleObj.hasOwnProperty(prop)) {
                            moduleIds.push(prop);
                            moduleFields[prop];

                            var jsn = w_Storage.getItem(prop);
                            var values = jsn;
                            if ($.isArray(jsn)) {
                                values = jsn[0];
                            }

                            var fields = moduleObj[prop];
                            var fieldsArry = [];
                            var fieldValues = {};
                            moduleFields[prop] = fields;
                            for (var i = 0; i < fields.length; i++) {
                                var field = fields[i];


                                var value = response[field];
                                values[field] = value;
                                fieldValues[field] = value;
                                fieldsArry.push(fieldValues);
                            }
                            moduleFields[prop] = fieldsArry;
                        }
                    }
                }
            }

            var currentForm = this.form.getCurrentModule();

            if ($.inArray(currentForm, moduleIds) >= 0) {
                this.form.refresh(moduleFields[currentForm]);
            } else {
                //w_Commons.raiseCustomEvent(document.body, o.events.NEW_METADATA_SUCCESS, {});
                amplify.publish(o.events.NEW_METADATA_SUCCESS, {});
            }


        }

    };

    DataEntryController.prototype.unbindEventListeners = function () {

        amplify.unsubscribe(o.events.SELECT, this.evtSelect);
        amplify.unsubscribe(o.events.EXIT_METADATA, this.evtExitMetadata);
        amplify.unsubscribe(o.events.COPY_METADATA, this.evtCopyMetadata);
        amplify.unsubscribe(o.events.INIT_STORAGE, this.evtInitStorage);
        amplify.unsubscribe(o.events.CHECK_FORM_CHANGED, this.evtCheckFormChanged);
        amplify.unsubscribe(o.events.SUBMIT, this.evtSubmit);
        amplify.unsubscribe(o.events.EMPTY_ROOT_ENTITY, this.evtEmptyRootEntity);
        amplify.unsubscribe(o.events.INVALID, this.evtInvalid);
        amplify.unsubscribe(o.events.NEW_METADATA_SUCCESS, this.evtNewMetadataSuccess);
        amplify.unsubscribe(o.events.OVERWRITE_METADATA_SUCCESS, this.evtOverwriteMetadataSuccess);
        amplify.unsubscribe(o.events.FIND, this.evtFind);
        amplify.unsubscribe(o.events.LOAD, this.evtLoad);
        amplify.unsubscribe(o.events.REMOVE, this.evtRemove);
        amplify.unsubscribe(o.events.CANCEL_FORM, this.evtCancel);

        $(selectors.TOGGLE_BTN).off();
    };

    DataEntryController.prototype.overwriteMessage = function (response) {

        if (Object.keys(response).length > 0) {
            //w_Commons.raiseCustomEvent(document.body, o.events.OVERWRITE_METADATA_SUCCESS, {});
            amplify.publish(o.events.OVERWRITE_METADATA_SUCCESS, {});
        }
    };

    DataEntryController.prototype.destroy = function () {
        this.menu.destroy();

        this.form.destroy();

        this.unbindEventListeners();
    };

    return DataEntryController;

});