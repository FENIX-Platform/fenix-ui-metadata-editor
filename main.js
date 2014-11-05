// relative or absolute path of Components' main.js

define(['module'], function(module){

    var userConfig =  module.config();

    var override = {
        lib : '../lib',
        'fast-fix':"../lib/fastfix"
    };

    require(['./js/paths'], function( MetadataEditor ) {

        // NOTE: This setTimeout() call is used because, for whatever reason, if you make
        //       a 'require' call in here or in the Cart without it, it will just hang
        //       and never actually go fetch the files in the browser. There's probably a
        //       better way to handle this, but I don't know what it is.


        setTimeout(function() {


            /*
             @param: prefix of Components paths to reference them also in absolute mode
             @param: paths to override
             @param: options passed in to override defaults
             @param: callback function
             */

            MetadataEditor.initialize('./js', override, userConfig, function() {

                require(['fx-editor/start' ], function( StartUp ){

                    new StartUp().init(userConfig);
                });
            });

        }, 0);
    });

});