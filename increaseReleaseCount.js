const fs = require("fs");
let version = require('./src/version');

// New release
version['release'] = Date.now();
version['releaseVersion'] += 1;

// stringify JSON Object
var jsonContent = JSON.stringify(version);
console.log(jsonContent);

fs.writeFile("src/version.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file has been saved.");
});