/***
 * This script exports all functions into functions.json
 * 
 * Import command with ODB console: 
 *     import database functions.json -merge=true
 */

const fs = require("fs")
const odb = new (require('../../common/odb').Odb)();

async function exportFunctions(){
    _session = await odb.startSession()
    var output = '{"records":[';
    let results = await _session.query("select @this.toJSON() from clc where BaseLined = true").all();
    for(var i = 0; i < results.length; i++) {
        var line = JSON.parse(results[i]['@this.toJSON()']);
        delete line["in_SimilarTo"]
        delete line["@rid"]
        output += JSON.stringify(line) + ','
    }
    output = output.slice(0,-1) + "]}"
    //console.log(output)
    fs.writeFile('commandLineClusters.json', output, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
        process.exit();
    }); 
}

exportFunctions();

