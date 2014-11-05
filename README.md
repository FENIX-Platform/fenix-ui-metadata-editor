Fenix UI Metadata Editor
========================
FENIX component to edit resource metadata information

#Requirements

* [NodeJS](http://nodejs.org/)
* [NPM](https://npmjs.org/)

#Deploy

```bash
npm install             Download source from remote repositories

```
  
#Interact with the component

Data Object produced by the Editor, when uses clicks on the ‘Save & Close’ Button in the Editor:

```bash
{
  "title" : {
    "EN" : "Agriculture production. Crops, National Production ."
  },
  "uid" : "4",
  "rid" : "9_65"
}
```

Data Object can be accessed by the HOST page either by:

##Setting a callback
Setting a callback function on the Metadata Editor Configuration parameter onFinishClick (See index.html)

```bash
var require = {
        config: {
            'main': { //This must match your module name
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
```

##Use events
Use Event Listener: Where the event = ‘fx.editor.finish’ (See metadata.html)

```bash
document.body.addEventListener("fx.editor.finish", function (e) {
 console.log(e.detail.data)
 // then call your function passing the “e.detail.data”

}, false);
```