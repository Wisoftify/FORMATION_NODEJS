const { parentPort, workerData } = require('worker_threads');
const fs = require("fs");
const util = require("util");

const readDir = util.promisify(fs.readdir);
let path = workerData;
let __files__ = [];

const readPath = async (path, files) => {
  const stats = await fs.promises.stat(path);
  if (stats.isDirectory()) {
    const dir = await readDir(path);
    for (let i = 0; i < dir.length; i++) {
      await readPath(`${path}/${dir[i]}`, files);
    }
  } else {
    files.push(path.split("/").pop());
  }
  return files;
}

readPath(path, __files__).then((files) => {
  parentPort.postMessage(files.join("\n"));
});
