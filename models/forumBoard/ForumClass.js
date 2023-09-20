var xmlUtil = require('../common/xmlUtil');
var forumXmlUtil = require('./forumXmlUtil');
var utils = require('../common/utils');
var config = require('../../common/config');

class Forum{

    constructor(no, title, contents, date, writer, view, like, dislike, contentsForSearch) {
        this._no = no;
        this._title = title;
        this._contents = contents;
        this._date = date;
        this._writer = writer;
        this._view = view;
        this._like = like;
        this._dislike = dislike;
        this._contentsForSearch = contentsForSearch;
    }

    set no(no) {this._no = no;}
    get no() {return this._no;}

    set title(title) {this._title = title;}
    get title() {return this._title;}

    set contents(contents) {this._contents = contents;}
    get contents() {return this._contents;}

    set date(date) {this._date = date;}
    get date() {return this._date;}

    set writer(writer) {this._writer = writer;}
    get writer() {return this._writer;}

    set view(view) {this._view = view;}
    get view() {return this._view;}

    set like(like) {this._like = like;}
    get like() {return this._like;}

    set dislike(dislike) {this._dislike = dislike;}
    get dislike() {return this._dislike;}

    set contentsForSearch(contentsForSearch) {this._contentsForSearch = contentsForSearch;}
    get contentsForSearch() {return this._contentsForSearch;}
    
    createForumStr() {
        let xmlString = forumXmlUtil.createMemberXML(this._no, this._title, this.contents, this._date, this._writer, this._view, this._like, this._dislike, this._contentsForSearch);
        console.log("=====-=-=-=-=-forum xml=-=-==--=--=");
        console.log(xmlString)
        return xmlString;
    }

    createForumIndexStr(memberPath) {
        let xmlString = forumXmlUtil.createMemberIndex(this._no, this._title, this._date, this._writer, this._view, this._like, this._contentsForSearch, forumPath);
        console.log("=====-=-=-=-=-forum Index=-=-==--=--=");
        console.log(xmlString)
        return xmlString;
    }  

}

module.exports = {
    Forum
};