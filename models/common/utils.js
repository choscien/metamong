var fs = require('fs');

function saveFile(filePath, contents) {
    fs.mkdirSync(filePath.substring(0, filePath.lastIndexOf('/')), { recursive: true });
    fs.writeFileSync(filePath, contents, 'utf8');
}

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function checkFile(filePath) {
	return fs.existsSync(filePath);
}

function createFileName() {
    var d = new Date();
  
    var hh = leadingZeros(d.getHours(), 2);
    var mm = leadingZeros(d.getMinutes(), 2);
    var ss = leadingZeros(d.getSeconds(), 2);
    var ms = leadingZerosReverse(d.getMilliseconds(), 3);
  
    var month = leadingZeros(d.getMonth() + 1, 2);
    var day = leadingZeros(d.getDate(), 2);
    var year = leadingZeros(d.getFullYear(), 4);
  
    //console.log('ss : ' + d.getSeconds());
    //console.log('ms : ' + d.getMilliseconds());
  
    //console.log('ss : ' + ss);
    //console.log('ms : ' + ms);
  
    return [year, month, day, hh, mm, ss, ms].join('');
}
  
function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();
  
    if (n.length < digits) {
      for (i = 0; i < digits - n.length; i++)
        zero += '0';
    }
    return zero + n;
}
  
function leadingZerosReverse(n, digits) {
    var zero = '';
    n = n.toString();
  
    if (n.length < digits) {
      for (i = 0; i < digits - n.length; i++)
        zero += '0';
    }
    return n + zero;
}

module.exports = {
    saveFile: saveFile,
    readFile: readFile,
    checkFile: checkFile,
    createFileName: createFileName
}