var xmlUtil = require('../common/xmlUtil');
var utils = require('../common/utils');
var config = require('../../common/config');

class Member {
    constructor() {}

    async duplicationCheck(memberId) {
        var xmlString = utils.readFile(config.memberPath + "/memberList.xml");
        var xmlNodes = await xmlUtil.xPath(xmlString, "/memberList/memberItem[memberId='" + memberId + "']");

        if(xmlNodes.nodes.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    // async duplicationCheck(memberId) {

    //     var xmlString = utils.readFile(config.memberPath + "/memberList.xml");
    //     var nodeText = await xmlUtil.checkTagValue(xmlString, "memberId");
    //     nodeText = nodeText.trim();
    //     console.log(nodeText)
    //     console.log(memberId)
    //     if(memberId != nodeText) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }
}

class MemberObject extends Member {

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
        let xmlString = xmlUtil.createMemberXML(this._memberId, this._memberPassword, this.memberName, this._memberEmail);
        console.log("=====-=-=-=-=-member xml=-=-==--=--=");
        console.log(xmlString)
        return xmlString;
    }

    createMemberIndexStr(memberPath) {
        let xmlString = xmlUtil.createMemberIndex(this._memberId, this._memberName, this._memberEmail, memberPath);
        console.log("=====-=-=-=-=-member Index=-=-==--=--=");
        console.log(xmlString)
        return xmlString;
    }

    async authenticate() {
        var memberId = this._memberId;
        var memberPassword = this._memberPassword;

        // check Member's userId
        var memberUserXMLString = utils.readFile(config.memberPath + "/memberList.xml");
        var xmlNodes = await xmlUtil.xPath(memberUserXMLString, "/memberList/memberItem[memberId='" + memberId + "']/memberPath");

        if(xmlNodes.nodes.length > 0) {

            var memberXMLFilePath = xmlNodes.iterateNext().textContent;

            var memberXML = utils.readFile(config.memberPath + memberXMLFilePath);
            var memberNodes = await xmlUtil.xPath(memberXML, "/member[memberPassword='" + memberPassword + "']");

            var memberName = await xmlUtil.xPath(memberXML, "/member/memberName");
            var memberEmail = await xmlUtil.xPath(memberXML, "/member/memberEmail");

            if(memberNodes.nodes.length > 0) {

                this._memberName = memberName;
                this._memberEmail = memberEmail;

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
    Member,
    MemberObject
};