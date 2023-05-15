var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;
var XPath = require('xpath');
var XPathResult = XPath.XPathResult;
var xmlFormat = require('xml-formatter');

var xmlParse = require('xslt-processor').xmlParse;
var xsltProcess = require('xslt-processor').xsltProcess;

var sax = require('sax');

var utils = require('../common/utils');

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

function checkTagValue(xmlString, targetTagName) {
	return new Promise((res, rej) => {
		let parser = sax.parser(true);
		let tagValue = '';

		parser.onopentag = (node) => {
			if (node.name === targetTagName) {
				// 특정 태그가 시작되면 tagValue 변수 초기화
				tagValue = '';
			}
		};

		parser.ontext = (text) => {
			// 태그 내용을 tagValue 변수에 추가
			tagValue += text;
		};

		parser.onclosetag = (name) => {
			if (name === targetTagName) {
				// 특정 태그가 닫히면 tagValue 반환
				res(tagValue);
			}
		};

		parser.onend = () => {
			// 파싱이 끝날 때까지 특정 태그가 없으면 reject
			rej(new Error(`Tag ${targetTagName} not found`));
		};
	
		parser.write(xmlString).close();
	})
}

function createMemberXML(memberId, memberPassword, memberName, memberEmail) {
	let doc = new DOMParser().parseFromString('<member></member>');

	// member 정보 노드
	let memberIdNode = doc.createElement('memberId');
	let memberPasswordNode = doc.createElement('memberPassword');
	let memberNameNode = doc.createElement('memberName');	
	let memberEmailNode = doc.createElement('memberEmail');

	let memberIdValue = doc.createTextNode(memberId);
	let memberPasswordValue = doc.createTextNode(memberPassword);
	let memberNameValue = doc.createTextNode(memberName);
	let memberEmailValue = doc.createTextNode(memberEmail);

	memberIdNode.appendChild(memberIdValue);
	memberPasswordNode.appendChild(memberPasswordValue);
	memberNameNode.appendChild(memberNameValue);
	memberEmailNode.appendChild(memberEmailValue);

	doc.documentElement.appendChild(memberIdNode);
	doc.documentElement.appendChild(memberPasswordNode);
	doc.documentElement.appendChild(memberNameNode);
	doc.documentElement.appendChild(memberEmailNode);

	let xmlDocStr = '<?xml version="1.0" encoding="UTF-8"?>' + new XMLSerializer().serializeToString(doc);

	return xmlFormat(xmlDocStr);
}

// memberItem 생성
function createMemberIndex(memberId, memberName, memberEmail, memberPath) {
	//const doc = new DOMParser().parseFromString('<users></users>', 'application/xml');	
	let doc = new DOMParser().parseFromString('<memberItem></memberItem>');

	// member 노드 추가
	let memberIdNode = doc.createElement('memberId');
	let memberPathNode = doc.createElement('memberPath');
	let memberNameNode = doc.createElement('memberName');	
	let memberEmailNode = doc.createElement('memberEmail');

	memberEmailNode.setAttribute("status")

	let memberIdValue = doc.createTextNode(memberId);
	let memberPathValue = doc.createTextNode(memberPath);
	let memberNameValue = doc.createTextNode(memberName);
	let memberEmailValue = doc.createTextNode(memberEmail);

	memberIdNode.appendChild(memberIdValue);
	memberPathNode.appendChild(memberPathValue);
	memberNameNode.appendChild(memberNameValue);
	memberEmailNode.appendChild(memberEmailValue);

	doc.documentElement.appendChild(memberIdNode);
	doc.documentElement.appendChild(memberPathNode);
	doc.documentElement.appendChild(memberNameNode);
	doc.documentElement.appendChild(memberEmailNode);

	// 생성된 XML 문자열 반환
	return new XMLSerializer().serializeToString(doc);
}

function insertIndex(indexPath, listTagName, templateString) {
	return new Promise((resolve, reject) => {

		var indexXML = utils.readFile(indexPath);
		indexXML = indexXML.replace(new RegExp('<\/' + listTagName + '>$', 'gm'), templateString + '</' + listTagName + '>');
		indexXML = xmlFormat(indexXML);
        utils.saveFile(indexPath, indexXML);
        resolve();
	});
}

module.exports = {
	xPath: xPath,
	checkTagValue: checkTagValue,
	createMemberXML: createMemberXML,
	createMemberIndex: createMemberIndex,
    insertIndex: insertIndex
};