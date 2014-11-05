fenix-ui-metadata-editor
========================


Data Object produced by the Editor, when uses clicks on the ‘Save & Close’ Button in the Editor:
{
  "title" : {
    "EN" : "Agriculture production. Crops, National Production ."
  },
  "uid" : "4",
  "rid" : "9_65"
}

Data Object can be accessed by the HOST page either by:

1.       Setting a callback function on the Metadata Editor Configuration parameter  onFinishClick (See metadata.html)
var require = {
        config: {
            'metadata': { //This must match your module name
                container: "div#metadataEditorContainer",
                source: sourceValues,
                resourceType: resourceTypeValue, //dataset, geographic, codelist
                widget: {
                    lang: 'EN'
                },
                onFinishClick: function (data) {
                   console.log(data)
                   // then call your function passing the “data” variable;
                }
            }
        }
    };


2.       Use Event Listener: Where the event = ‘fx.editor.finish’ (See metadata.html)


    document.body.addEventListener("fx.editor.finish", function (e) {
     console.log(e.detail.data)
     // then call your function passing the “e.detail.data”

    }, false);



