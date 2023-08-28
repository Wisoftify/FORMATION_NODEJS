const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const path = process.argv[2];

const recursiveLs = () => new Promise((resolve, reject) => {
  const worker = new Worker("./child.js", { workerData: path });

  worker.on('message', message => {
    resolve(message);
  });
});

const main = async () => {
  const files = await recursiveLs();
  console.log(files);
}
main();