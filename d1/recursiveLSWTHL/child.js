const { workerData, parentPort } = require('worker_threads');
const fs = require('fs');
const util = require('util');

const readDir = util.promisify(fs.readdir);

const readPath = async (path, files) => {
  const stats = await fs.promises.stat(path);
  if (stats.isDirectory()) {
    const dir = await readDir(path);
    const subTasks = dir.map((file) => readPath(`${path}/${file}`, files));
    await Promise.all(subTasks);
  } else {
    files.push(path.split('/').pop());
  }
};

const { path, lock } = workerData;
let files = [];
readPath(path, files).then(() => {
  parentPort.postMessage(files);
});
