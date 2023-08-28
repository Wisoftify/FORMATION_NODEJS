const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('message', (arg) => {
  console.log("file: ", arg)
});

// list local files recursively
const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ?
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(process.argv[2], function (filePath) {
  emitter.emit('message', filePath);
});


/*
  Idée de tp:

*/