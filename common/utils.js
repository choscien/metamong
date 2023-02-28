var fs = require('fs');

function saveFile(filePath, contents) {
    fs.mkdirSync(filePath.substring(0, filePath.lastIndexOf('/')), { recursive: true });
    fs.writeFileSync(filePath, contents, 'utf8');
}

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

module.exports = {
    saveFile: saveFile,
    readFile: readFile,
}