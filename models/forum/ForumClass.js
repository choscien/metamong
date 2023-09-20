var xmlUtil = require('../common/xmlUtil');
var utils = require('../common/utils');
var config = require('../../common/config');

class Member{

    constructor(memberId, memberPassword, memberName, memberEmail) {
        super();
        this._memberId = memberId;
        this._memberPassword = memberPassword;
        this._memberName = memberName;
        this._memberEmail = memberEmail;
        this._isAuthenticate = false;
    }

    set memberId(memberId) {
        this._memberId = memberId;
    }

    get memberId() {
        return this._memberId;
    }

    set memberPassword(memberPassword) {
        this._memberPassword = memberPassword;
    }

    get memberPassword() {
        return this._memberPassword;
    }

    set memberName(memberName) {
        this._memberName = memberName;
    }

    get memberName() {
        return this._memberName;
    }

    set memberEmail(memberEmail) {
        this._memberEmail = memberEmail;
    }

    get memberEmail() {
        return this._memberEmail;
    }
    
    createMemberXMLStr() {
        let xmlString = memberXmlUtil.createMemberXML(this._memberId, this._memberPassword, this.memberName, this._memberEmail);
        console.log("=====-=-=-=-=-member xml=-=-==--=--=");
        console.log(xmlString)
        return xmlString;
    }

    createMemberIndexStr(memberPath) {
        let xmlString = memberXmlUtil.createMemberIndex(this._memberId, this._memberName, this._memberEmail, memberPath);
        console.log("=====-=-=-=-=-member Index=-=-==--=--=");
        console.log(xmlString)
        return xmlString;
    }

    async authenticate(memberId, memberPassword) {
        var memberId = memberId;
        var memberPassword = memberPassword;

        // check Member's userId
        var memberUserXMLString = utils.readFile(config.memberPath + "/memberList.xml");
        var xmlNodes = await xmlUtil.xPath(memberUserXMLString, "/memberList/memberItem[memberId='" + memberId + "']/memberPath");

        if(xmlNodes.nodes.length > 0) {

            var memberXMLFilePath = xmlNodes.iterateNext().textContent;

            var memberXML = utils.readFile(config.memberPath + memberXMLFilePath);
            var memberNodes = await xmlUtil.xPath(memberXML, "/member[memberPassword='" + memberPassword + "']");

            
            if(memberNodes.nodes.length > 0) {
                var memberNameNodes = await xmlUtil.xPath(memberXML, "/member/memberName");
                var memberEmailNodes = await xmlUtil.xPath(memberXML, "/member/memberEmail");

                this._memberId = memberId;
                this._memberName = memberNameNodes.iterateNext().textContent;
                this._memberEmail = memberEmailNodes.iterateNext().textContent;

                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}

module.exports = {
    Member
};