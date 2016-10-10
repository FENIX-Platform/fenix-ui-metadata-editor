# FENIX "Metadata Editor"

```javascript
var MDE = new MDE({
    el : "#MDEditor",
    config: {
           	identification: {
           		title: 'Identification',
           		description: 'Basic Metadata',
           		sections: { },
           		items: {
           			title : { <CONFIGURATION>, validation: { mandatory : true } },
           			creationDate : { <CONFIGURATION> format: 'date', validation: { mandatory : true } },
           			characterSet : { <CONFIGURATION>, validation: { mandatory : true } },
           			metadataStandardName : { <CONFIGURATION>, default: 'FENIX', validation: { mandatory : true } },
           			language : { <CONFIGURATION> },
           			languageDetails : { <CONFIGURATION> },
           			metadataStandardVersion : { <CONFIGURATION> },
           			metadataLanguage : { <CONFIGURATION> },
           			noDataValue : { <CONFIGURATION> }
           		},
           		validator : {
           			valIdentification : true
           		}
           	}
           ...           	        
           
    },
    ...
    
});
```

# Configuration

Check `config.js` to have a look of the default configuration.

Put here the table, meanwhile...

 - el: as usual
 - model: the data model, using the plain configuration
 - lang: current lang
 - environment: current env
 - config: the big object
 - output: type of output using the
 
# the `config` object

 - title: title of the section
 - description: description of the sections
 - sections : [] < if is compilated, show subsection. can be recursive
 - items : [] < if is compilated, shows the items
 - validator: {} < validator to be run in order return a valid object




<<< OLD >>>

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