const fs = require('fs');

fs.readFile('fichier.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});