## Places wiki API
<hr>

<img align="right" src="https://img.shields.io/badge/Platform-heroku-informational?style=flat&logo=heroku&logoColor=white&color=8424bf">

<img align="right" src="https://img.shields.io/badge/Code-JavaScript-informational?style=flat&logo=javascript&logoColor=white&color=ebd234"> 

<img align="right" src="https://img.shields.io/badge/Tools-node.js-informational?style=flat&logo=node.js&logoColor=white&color=5aa154">

## About
* Plaki : API to get basic information about **pla**ces from wi**ki**pedia. 
    * Description : brief description
    * Coordinates : latitude and longitude
    * Extract     : Summary
    * Image       : Wiki image link
    * pageid      : Wiki page ID

#### Node.js Example

```javascript
const https = require('https')
const place = maldives
var options = {
    hostname: 'plaki.herokuapp.com',
    port: 443,
    path:`api?place=${place}`
}
const req = https.get(options, res => {
    res.on("data", function (response) {
        console.log(JSON.parse(response));
    });
```

#### JSON Structure
<img src="/images/plaki.png">
