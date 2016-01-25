define([
    'jquery',
    'fx-MetaEditor2/js/MetadataEditor2/MetadataEditor',
    'bootstrap'
], function ($, MetaEditor) {

    var defConfig = {
    };

    var cfg = {};

    function init(containerID, config, callB) {
        $.extend(true, cfg, defConfig, config);
        this.metaEditor = new MetaEditor(cfg);
        this.metaEditor.render($(containerID), cfg, callB);
    }

    function set(meta) { this.metaEditor.set(meta); }
    function get() { return this.metaEditor.get(); }
    function reset() { return this.metaEditor.reset(); }
    function destroy() { return this.metaEditor.destroy(); }

    /*function validate() { return this.DSDE.validate(); }

    function editable(editable) {
        this.DSDE.editable(editable);
    }

    
    function destroy() { this.DSDE.destroy(); }
    function hasChanged() { return this.DSDE.hasChanged(); }*/
    return {
        init: init,
        set: set,
        get: get,
        reset: reset,
        destroy: destroy
        /*validate: validate,
        editable: editable,
        reset: reset,
        hasChanged: hasChanged*/
    }
});