var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;
var XPath = require('xpath');
var XPathResult = XPath.XPathResult;
var xmlFormat = require('xml-formatter');
var XmlBeautify = require('xml-beautify');

var sax = require('sax');

var utils = require('../common/utils');

function createForumXML(memberId, memberPassword, memberName, memberEmail) {
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
	var beautifiedXmlText = new XmlBeautify({ parser: DOMParser }).beautify(xmlDocStr);
	console.log(beautifiedXmlText);

	return beautifiedXmlText;
}

// memberItem 생성
function createForumIndex(memberId, memberName, memberEmail, memberPath) {
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
	return new XMLSerializer().serializeToString(doc).trim();
}

module.exports = {
	createForumXML: createForumXML,
	createForumIndex: createForumIndex
};