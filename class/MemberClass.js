var xmlUtil = require('../common/xmlUtil');
var utils = require('../common/utils');
var config = require('../common/config');

class Member {
    constructor() {}

    async duplicationCheck(memberId) {
        console.log(memberId)
        console.log("중복체크시작")
        var xmlString = utils.readFile(config.memberPath + "/memberList.xml");
        console.log(xmlString);

        var xmlNodes = await xmlUtil.xPath(xmlString, "/memberList/memberItem[memberId='" + memberId + "']");

        if(xmlNodes.nodes.length > 0) {
            return true;
        } else {
            return false;
        }
    }
}

class MemberObject extends Member {

    constructor({memberId, memberPassword, memberName, memberEmail}) {
        super();
        this._memberId = memberId;
        this._memberPassword = memberPassword;
        this._memberName = memberName;
        this._memberEmail = memberEmail;
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
}

module.exports = {
    Member,
    MemberObject
};