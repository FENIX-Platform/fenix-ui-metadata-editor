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