define([
    'jquery',
    'MetadataEditor/MetadataEditor',
    'bootstrap'
], function ($, MetaEditor) {

    var defConfig = {},
        cfg = {};

    function init(containerID, config, callB) {
        $.extend(true, cfg, defConfig, config);
        this.metaEditor = new MetaEditor(cfg);
        this.metaEditor.render($(containerID), cfg, callB);
    }

    function set(meta) { this.metaEditor.set(meta); }
    function get() { return this.metaEditor.get(); }
    function reset() { return this.metaEditor.reset(); }
    function destroy() { return this.metaEditor.destroy(); }

    return {
        init: init,
        set: set,
        get: get,
        reset: reset,
        destroy: destroy
    }
});