const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

console.log(await readFileAsync('fichier.txt', 'utf8'));
