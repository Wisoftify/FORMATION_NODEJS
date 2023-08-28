const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const heavyCalc = () => new Promise((resolve, reject) => {
  const worker = new Worker("./heavyCalcChild.js");

  worker.on('message', message => {
    resolve(message);
    console.log(`Le thread de travail a renvoyé le message : ${message}`);
  });
});

const main = async () => {
  console.log("hello");
  heavyCalc();
  console.log("world");
}

main();