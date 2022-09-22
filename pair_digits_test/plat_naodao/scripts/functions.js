/**
 *file        : functions.js
 *Author      : zyr
 *Mail        : skyeyeszyr@outlook.com
 *Create Date : 2022-09-21 21:29:32
 *Version     : 1.0.0
*/

/* Custom JS Functions */

// NOTE: When using JS functions, parameters should be defined in order!


// load function from other js file !!!alpha testing!!!
function addScript(url){
	var script = document.createElement('script');
	script.setAttribute('type','text/javascript');
	script.setAttribute('src',url);
	document.getElementsByTagName('head')[0].appendChild(script);
}


// trans csv string to array
function CSVtoArray(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var lines = [];

    for (var i=0; i<allTextLines.length; i++) {
        lines.push(allTextLines[i].split(','));
    }
    return lines
}