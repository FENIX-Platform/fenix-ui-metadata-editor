define(function () {

    'use strict';

    return {

        outputFormat: "metadata", // plain metadata

        corePlugins : ['nls', 'incremental', 'standard'],

        cache : false,

        lang : "EN",

        sectionContentClassName : "content",

        sectionIndexClassName : "index",

        nls: ["EN", "FR", "ES"]

    }

});