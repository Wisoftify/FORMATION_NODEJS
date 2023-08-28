const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

for (let i = 0; i < 10000000000; i++) {

}
parentPort.postMessage('finito');