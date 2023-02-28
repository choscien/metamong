var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;
var XPath = require('xpath');
var XPathResult = XPath.XPathResult;

var xmlParse = require('xslt-processor').xmlParse;
var xsltProcess = require('xslt-processor').xsltProcess;

function xPath(xmlObject, xPathString) {
	return new Promise(function (resolve, reject) {
		var parser = new DOMParser();
		var serializer = new XMLSerializer();

		if (typeof (xmlObject) == 'string') {
			var xmlString = xmlObject;
		} else {
			var xmlString = serializer.serializeToString(xmlObject);
		}
		//console.log(xmlString);

		var xmlDoc = parser.parseFromString(xmlString, "text/xml");
		if (XPath.evaluate) {
			var xmlNodes = XPath.evaluate(xPathString, xmlDoc, null, XPathResult.ANY_TYPE, null);
			//console.log(titleNodes);
			resolve(xmlNodes);
		} else {
			reject(new Error("Has No Evalute Property"));
		}
	});
}

module.exports = {
	xPath: xPath,
};