var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;
var XPath = require('xpath');
var XPathResult = XPath.XPathResult;
var xmlFormat = require('xml-formatter');
var XmlBeautify = require('xml-beautify');

var sax = require('sax');

var utils = require('../common/utils');

function createForumXML(forumNo, forumTitle, forumContents, forumDate, forumWriter, forumView, forumLike, forumDislike) {
	let doc = new DOMParser().parseFromString('<forum></forum>');

	// forum 정보 노드
	let forumNoNode = doc.createElement('forumNo');
	let forumTitleNode = doc.createElement('forumTitle');
	let forumContentsNode = doc.createElement('forumContents');	
	let forumDateNode = doc.createElement('forumDate');
	let forumWriterNode = doc.createElement('forumWriter');
	let forumViewNode = doc.createElement('forumView');
	let forumLikeNode = doc.createElement('forumLike');	
	let forumDislikeNode = doc.createElement('forumDislike');

	let forumNoValue = doc.createTextNode(forumNo);
	let forumTitleValue = doc.createTextNode(forumTitle);
	let forumContentsValue = doc.createTextNode(forumContents);
	let forumDateValue = doc.createTextNode(forumDate);
	let forumWriterValue = doc.createTextNode(forumWriter);
	let forumViewValue = doc.createTextNode(forumView);
	let forumLikeValue = doc.createTextNode(forumLike);
	let forumDislikeValue = doc.createTextNode(forumDislike);

	forumNoNode.appendChild(forumNoValue);
	forumTitleNode.appendChild(forumTitleValue);
	forumContentsNode.appendChild(forumContentsValue);
	forumDateNode.appendChild(forumDateValue);
	forumWriterNode.appendChild(forumWriterValue);
	forumViewNode.appendChild(forumViewValue);
	forumLikeNode.appendChild(forumLikeValue);
	forumDislikeNode.appendChild(forumDislikeValue);

	doc.documentElement.appendChild(forumNoNode);
	doc.documentElement.appendChild(forumTitleNode);
	doc.documentElement.appendChild(forumContentsNode);
	doc.documentElement.appendChild(forumDateNode);
	doc.documentElement.appendChild(forumWriterNode);
	doc.documentElement.appendChild(forumViewNode);
	doc.documentElement.appendChild(forumLikeNode);
	doc.documentElement.appendChild(forumDislikeNode);

	let xmlDocStr = '<?xml version="1.0" encoding="UTF-8"?>' + new XMLSerializer().serializeToString(doc);
	var beautifiedXmlText = new XmlBeautify({ parser: DOMParser }).beautify(xmlDocStr);
	console.log(beautifiedXmlText);

	return beautifiedXmlText;
}

// memberItem 생성
function createForumIndex(forumNo, forumTitle, forumDate, forumWriter, forumView, forumLike, forumContentsForSearch, forumPath) {
	//const doc = new DOMParser().parseFromString('<users></users>', 'application/xml');	
	let doc = new DOMParser().parseFromString('<forumItem></forumItem>');

	// member 노드 추가
	let forumNoNode = doc.createElement('forumNo');
	let forumTitleNode = doc.createElement('forumTitle');
	let forumDateNode = doc.createElement('forumDate');	
	let forumWriterNode = doc.createElement('forumWriter');
	let forumViewNode = doc.createElement('forumView');
	let forumLikeNode = doc.createElement('forumLike');
	let forumContentsForSearchNode = doc.createElement('forumContentsForSearch');
	let forumPathNode = doc.createElement('forumPath');

	// memberEmailNode.setAttribute("status")

	let forumNoValue = doc.createTextNode(forumNo);
	let forumTitleValue = doc.createTextNode(forumTitle);
	let forumDateValue = doc.createTextNode(forumDate);
	let forumWriterValue = doc.createTextNode(forumWriter);
	let forumViewValue = doc.createTextNode(forumView);
	let forumLikeValue = doc.createTextNode(forumLike);
	let forumContentsForSearchValue = doc.createTextNode(forumContentsForSearch);
	let forumPathValue = doc.createTextNode(forumPath);

	forumNoNode.appendChild(forumNoValue);
	forumTitleNode.appendChild(forumTitleValue);
	forumDateNode.appendChild(forumDateValue);
	forumWriterNode.appendChild(forumWriterValue);
	forumViewNode.appendChild(forumViewValue);
	forumLikeNode.appendChild(forumLikeValue);
	forumContentsForSearchNode.appendChild(forumContentsForSearchValue);
	forumPathNode.appendChild(forumPathValue);

	doc.documentElement.appendChild(forumNoNode);
	doc.documentElement.appendChild(forumTitleNode);
	doc.documentElement.appendChild(forumDateNode);
	doc.documentElement.appendChild(forumWriterNode);
	doc.documentElement.appendChild(forumViewNode);
	doc.documentElement.appendChild(forumLikeNode);
	doc.documentElement.appendChild(forumContentsForSearchNode);
	doc.documentElement.appendChild(forumPathNode);

	// 생성된 XML 문자열 반환
	return new XMLSerializer().serializeToString(doc).trim();
}

module.exports = {
	createForumXML: createForumXML,
	createForumIndex: createForumIndex
};