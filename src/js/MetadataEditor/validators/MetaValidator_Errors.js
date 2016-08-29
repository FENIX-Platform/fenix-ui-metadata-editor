if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([],
    function () {
        'use strict';
        var e = {
            MANDATORY_MISSING: 'mandatoryMissing',
            SECTION_MISSING: 'sectionMissing'
        };
        return e;
    })