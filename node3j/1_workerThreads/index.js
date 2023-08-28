const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename, { workerData: 'Hello, worker thread!' });

  worker.on('message', message => {
    console.log(`Le thread de travail a renvoyé le message : ${message}`);
  });

  worker.postMessage('Salut, thread de travail!');
} else {
  parentPort.on('message', message => {
    console.log(`Le thread principal a renvoyé le message : ${message}`);
  });
  parentPort.postMessage(workerData);
}