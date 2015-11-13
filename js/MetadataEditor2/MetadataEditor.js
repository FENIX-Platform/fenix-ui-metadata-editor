define([
    'jquery',
    'jsTree',
    'alpaca',
    'text!fx-MetaEditor2/js/MetadataEditor2/html/MetadataEditor.html',
//    'text!components/metadataEditor/html/MetadataEditor.html',
    'fx-MetaEditor2/js/MetadataEditor2/translators/MetaAdapterFactory',
    'fx-MetaEditor2/js/MetadataEditor2/validators/MetaValidator',
    'fx-MetaEditor2/js/dataManagementCommons/Notifications'
],
function ($, jsTree, alpaca, MetadataEditorHTML, MetaAdapterFactory, MetaVal, noti) {

    var h = {
        sections: '#metaE_sections',
        editor: '#metaE_editor'
    };

    var defConfig = {
        //schemaPath: '../config/schemas/',
        schemaPath: 'fx-MetaEditor2/config/schemas/'
    };

    var sec = [
        {
            id: "identification", text: "Identification", icon: "img/fenix-catalog-sprite-small.svg",
            state: {
                selected: true
            }
        },
        { id: "contacts", text: "Contacts" },
        {
            id: "content", text: "Content", children: [
                { id: 'content_referencePopulation', text: "Reference Population" },
                { id: 'content_coverage', text: "Coverage" }
            ]
        },
        { id: "institutionalMandate", text: "Institutional Mandate" },
        {
            id: "statisticalProcessing", text: "Statistical Processing", state: { disabled: true, opened: true }, children: [
                   { id: 'statisticalProcessing_primaryDataCollection', text: "Primary Data Collection" },
                   { id: 'statisticalProcessing_secondaryDataCollection', text: "Secondary Data Collection" },
                   { id: 'statisticalProcessing_dataCompilation', text: "Data Compilation" },
                   { id: 'statisticalProcessing_dataValidation', text: "Data Validation" }
            ]
        },
        {
            id: "dataQuality", text: "Data Quality", children: [
              { id: "dataQuality_accuracy", text: "Accuracy" },
              { id: "dataQuality_dataRevision", text: "Data Revision" },
              { id: "dataQuality_relevance", text: "Relevance" },
              { id: "dataQuality_compatibilityCoherence", text: "Compatibility Coherence" },
              { id: "dataQuality_timelinessAndPunctuality", text: "Timeliness and Puctuality" }
            ]
        },
        {
            id: "accessibility", text: "Accessibility", state: { disabled: true, opened: true }, children: [
                {
                    id: "accessibility_dataDissemination", text: "Data Dissemination", state: { disabled: true, opened: true }, children: [
                        { id: "accessibility_dataDissemination_distribution", text: "Distribution" },
                        { id: "accessibility_dataDissemination_releasePolicy", text: "Release Policy" }
                    ],

                },
                { id: "accessibility_clarity", text: "Clarity" },
                { id: "accessibility_confidentiality", text: "Confidentiality" }
            ]
        },
        {
            id: "maintenance", text: "Maintenance", children: [
                { id: "maintenance_update", text: "Update" },
                { id: "maintenance_metadataMaintenance", text: "Metadata Maintenance" }
            ]
        },
        { id: "documents", text: "Documents" }
    ];

    var treeConfig = {
        core: {
            data: sec,
            animation: 0,
            themes: { "stripes": true }
        },
        plugins: ["wholerow"]
    };

    //Also cahnge the state in the tree configuration (sec variable).
    //TODO: assign the starting section to the tree starting with this config
    var startingSection = sec[0];

    function MetadataEditor(config) {
        this.config = {};
        $.extend(true, this.config, defConfig, config);
        this.$cnt = null;
        this.$editor = null;
        this.currentSection = startingSection;

        this.meta = {};
        this.jsForm = null;
        this.$sections = null;
        this.secTree = null;
        this.metaAdapterFactory = new MetaAdapterFactory();

        this.validator = new MetaVal();
    };

    MetadataEditor.prototype.render = function (cnt, config, callB) {
        $.extend(true, this.config, config);
        this.$cnt = cnt;
        this.$cnt.html(MetadataEditorHTML);

        this.$editor = this.$cnt.find(h.editor);
        this.$sections = this.$cnt.find(h.sections);
        this._bindEvents();

        var me = this;
        var schToLoad = this.config.schemaPath + startingSection.id;
        this.loadJSONSchema(schToLoad, callB);

        this.$sections.on("ready.jstree", function () {
            me.$sections.off("ready.jstree");
            me.$sections.jstree(true).select_node(startingSection.id, true);
        });
        this.secTree = this.$sections.jstree(treeConfig);
    };

    MetadataEditor.prototype.validateCurrentForm = function (section) {
        if (this.currentSection == "")
            return true;
        var al = this.$editor.alpaca('get');
        if (al) {
            var valid = al.isValid(true);
            return al.isValid(true);
        }
    };

    MetadataEditor.prototype.changeSection = function (section) {
        if (!section)
            return;

        this.$editor.alpaca('get').refreshValidationState();

        if (!this.validateCurrentForm()) {
            var conf = confirm("The form is not valid, do you want to change section and lose all the changes in the current one?");
            if (conf) {
                this.$editor.alpaca('get').clear();
            }
            else {
                this.$sections.jstree(true).select_node(this.currentSection.id, true);
                this.$sections.jstree(true).deselect_node(section.id, true);
                return;
            }
        }

        var me = this;
        if (this.currentSection != "") {
            this.editorToMeta();
            this.updateValidation(this._uiToMeta(this.meta)); //convert and validate
        }
        /*if (this.currentSection.id == section.id)
            return;*/
        if (this.$editor.alpaca) {
            this.$editor.alpaca('destroy');
        }
        this.currentSection = section;
        var schToLoad = this.config.schemaPath + section.id;
        this.loadJSONSchema(schToLoad);
        /*require([schToLoad], function (data) {
            data.postRender = function () { me.editorReady(); };
            data.data = me.getValsToSet();
            me.$editor.alpaca(
                data
            );
        });*/
        //var isValid = this.updateValidation();
    };

    MetadataEditor.prototype.loadJSONSchema = function (schToLoad, callB) {
        var me = this;
        require([schToLoad], function (data) {
            data.postRender = function () { if (callB) callB(); };
            data.data = me.getValsToSet();
            me.$editor.alpaca(
                data
            );
        });
    };

    MetadataEditor.prototype.getValsToSet = function () {
        if (!this.currentSection)
            return null;
        var toSet = this.meta[this.currentSection.id];

        if (!$.isEmptyObject(toSet)) {
            return toSet;
        }
        return null;
    };

    MetadataEditor.prototype.editorToMeta = function () {
        if (!this.currentSection)
            return
        var val = this.$editor.alpaca('get').getValue();
        this.meta[this.currentSection.id] = val;
    };

    MetadataEditor.prototype.destroy = function () {
        //this.$sections.jstree(true).destroy();
        this.$editor.alpaca('destroy');
        this.meta = {};
    };

    MetadataEditor.prototype._bindEvents = function () {
        var me = this;
        this.$sections.on('changed.jstree', function (e, data) {
            if (data && data.node)
                me.changeSection(data.node.original);
        });
        this.$sections.on('loaded.jstree', function () {
            //me.$sections.jstree(true).select_node("identification");
        });
    };

    MetadataEditor.prototype._uiToMeta = function (uiMeta) {
        //this.editorToMeta();
        var toRet = this.metaAdapterFactory.uiToMeta(uiMeta);
        return toRet;
    };

    /* MetadataEditor.prototype.validate = function () {
         if (!this.jsForm)
             return null;
         this.jsForm.validate();
     };*/

    MetadataEditor.prototype.set = function (m) {
        this.currentSection = "";
        this.meta = this.metaAdapterFactory.metaToUi(m);
        this.changeSection(sec[0]);
    };
    MetadataEditor.prototype.get = function () {
        this.editorToMeta();
        var metaToExport = this._uiToMeta(this.meta);
        var isValid = this.updateValidation(metaToExport);




        //Uncommet that after debug!
        if (!isValid)
            return null;





        return metaToExport;
    };
    MetadataEditor.prototype.reset = function () {
        this.set(null);
    };

    MetadataEditor.prototype.updateValidation = function (convertedMeta) {


        var identVal = this.validator.validateSection(convertedMeta, "identification");
        var contVal = this.validator.validateSection(convertedMeta, "contacts");
        var valid = true;

        /*console.log("identVal");
        console.log(identVal);
        console.log("contVal");
        console.log(contVal);*/

        if (identVal && identVal.length > 0) {
            this.isTreeNodeValid("identification", false);
            valid = false;
        }
        else {
            this.isTreeNodeValid("identification", true);
        }
        if (contVal && contVal.length > 0) {
            this.isTreeNodeValid("contacts", false);
            valid = false;
        }
        else {
            this.isTreeNodeValid("contacts", true);
        }
        return valid;
    };
    MetadataEditor.prototype.isTreeNodeValid = function (nodeId, isValid) {
        if (isValid) {
            this.$sections.jstree(true).set_icon(nodeId, "");
        }
        else {
            this.$sections.jstree(true).set_icon(nodeId, " ");
        }
    };

    return MetadataEditor;
})