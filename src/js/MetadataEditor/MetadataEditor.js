define([
        'jquery',
        'jstree',
        'alpaca',
        'html/MetadataEditor.html',
        'translators/MetaAdapterFactory',
        './MetaValidator',
        '../../../config/config',
        '../../../config/config-default'
    ],
    function ($, jsTree, alpaca, MetadataEditorHTML, MetaAdapterFactory, MetaVal, C, DC) {

        var h = {
            sections: '#metaE_sections',
            editor: '#metaE_editor'
        };

        var defConfig = C.METADATA_PATH || DC.METADATA_PATH;
        var sec = C.METADATA_SEC || DC.METADATA_SEC;
        var locale = C.LOCALE || DC.LOCALE;

        var treeConfig = {
            core: {
                data: sec,
                animation: 0,
                themes: {
                    //"stripes": true
                }
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

            this.uid = null;
            this.version = null;
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
                //me.$sections.jstree(true).select_node(startingSection.id, true);
            });
            this.secTree = this.$sections.jstree(treeConfig);
        };

        //Validates the form
        MetadataEditor.prototype.validateCurrentForm = function (section) {
            if (this.currentSection == "")
                return true;
            var al = this.$editor.alpaca('get');
            if (al) {
                var valid = al.isValid(true);
                return al.isValid(true);
            }
        };

        //Switches the current section
        MetadataEditor.prototype.changeSection = function (section) {
            if (!section)
                return;

            this.$editor.alpaca('get').refreshValidationState();
            var invalidState = false;

            //To avoid sending incomplete/invalid data to the server each section must be valid or empty
            if (!this.validateCurrentForm()) {
                var conf = confirm("The form is not valid, do you want to change section and lose all the changes in the current one?");
                if (conf) {
                    this.$editor.alpaca('get').clear();
                    invalidState = true;
                }
                else {
                    this.$sections.jstree(true).select_node(this.currentSection.id, true);
                    this.$sections.jstree(true).deselect_node(section.id, true);
                    return;
                }
            }

            var me = this;
            if (this.currentSection != "") {
                this.editorToMeta(invalidState);
                this.updateValidation(this._uiToMeta(this.meta)); //convert and validate
            }
            if (this.$editor.alpaca) {
                this.$editor.alpaca('destroy');
            }
            this.currentSection = section;
            var schToLoad = this.config.schemaPath + section.id;
            this.loadJSONSchema(schToLoad);
        };

        //Loads the js containing the JSon schema
        MetadataEditor.prototype.loadJSONSchema = function (schToLoad, callB) {
            var me = this;
            //Load and set the values
            require([schToLoad], function (data) {
                data.postRender = function () {
                    if (callB) callB();
                };
                data.view = {"locale": locale };
                data.data = me.getValsToSet();
                me.$editor.alpaca(
                    data
                );
            });
        };

        //Gets the portion of the metadata to be sent to the interface
        MetadataEditor.prototype.getValsToSet = function () {
            if (!this.currentSection)
                return null;
            var toSet = this.meta[this.currentSection.id];

            if (!$.isEmptyObject(toSet)) {
                return toSet;
            }
            return null;
        };

        //Gets the values from the interface and merges them in the meta object
        MetadataEditor.prototype.editorToMeta = function (clearSection) {
            if (!this.currentSection)
                return
            if (clearSection) {
                if (this.meta[this.currentSection.id])
                    delete this.meta[this.currentSection.id];
            } else {
                var val = this.$editor.alpaca('get').getValue();
                this.meta[this.currentSection.id] = val;
            }
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

        //From the interface's format to the metadata format (it can be exported)
        MetadataEditor.prototype._uiToMeta = function (uiMeta) {
            //this.editorToMeta();
            var toRet = this.metaAdapterFactory.uiToMeta(uiMeta);
            return toRet;
        };

        //Sets the metadata converting them to the interface's format
        MetadataEditor.prototype.set = function (m) {
            if (m.uid)
                this.uid = m.uid;
            else
                this.uid = null;
            if (m.version)
                this.version = m.version;
            else
                this.version = null;
            this.currentSection = "";
            this.meta = this.metaAdapterFactory.metaToUi(m);
            this.changeSection(sec[0]);
        };
        //Returns the metadata converting them from the interface's format to the external one
        MetadataEditor.prototype.get = function () {
            this.editorToMeta();
            var metaToExport = this._uiToMeta(this.meta);
            var isValid = this.updateValidation(metaToExport);
            if (!isValid)
                return null;
            if (this.uid)
                metaToExport.uid = this.uid;
            if (this.version)
                metaToExport.version = this.version;
            return metaToExport;
        };
        MetadataEditor.prototype.reset = function () {
            this.set(null);
        };

        //Validates the meta
        MetadataEditor.prototype.updateValidation = function (convertedMeta) {
            var identVal = this.validator.validateSection(convertedMeta, "identification");
            var contVal = this.validator.validateSection(convertedMeta, "contacts");
            var valid = true;

            this.$sections.find('.fx-panel-required').remove();

            if (identVal && identVal.length > 0) {
                this.nodeError("identification");
                valid = false;
            }
            if (contVal && contVal.length > 0) {
                this.nodeError("contacts");
                valid = false;
            }

            return valid;
        };
        //Shows the error on the sections' menu
        MetadataEditor.prototype.nodeError = function (nodeId) {
            var node = this.$sections.jstree(true).get_node(nodeId, true);
            node.append('<span class="fx-panel-required" title="Required metadata entity"></span>');
        };

        return MetadataEditor;
    })