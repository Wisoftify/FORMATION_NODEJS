const {parentPort, workerData} = require('worker_threads');
const fs = require('fs');

const readDir = fs.promises.readdir;
const stat = fs.promises.stat;

const ls = async (path, files) => {
  const pathStat = await stat(path);
  
  if (pathStat.isDirectory()) {
    let dir = await readDir(path);
    for (let i = 0; i < dir.length; i++)
      files = await ls(`${path}/${dir[i]}`, files);
  } else {
    files.push(path.split("/").pop());
  }
  return files;
}

(async () => {
  let res = await ls(workerData, []);
  parentPort.postMessage(res);
})()