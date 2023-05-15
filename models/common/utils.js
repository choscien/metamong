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

module.exports = {
    saveFile: saveFile,
    readFile: readFile,
    checkFile: checkFile
}