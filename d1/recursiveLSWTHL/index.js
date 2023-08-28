const { Worker } = require('worker_threads');

class WorkerLock {
  constructor() {
    this.isLocked = false;
    this.queue = [];
  }

  acquire() {
    return new Promise((resolve) => {
      if (this.isLocked) {
        this.queue.push(resolve);
      } else {
        this.isLocked = true;
        resolve();
      }
    });
  }

  release() {
    if (this.queue.length > 0) {
      const nextResolve = this.queue.shift();
      nextResolve();
    } else {
      this.isLocked = false;
    }
  }
}

const path = process.argv[2];
let files = new Set();
let pendingWorkers = 0;
const lock = new WorkerLock();

const worker = new Worker('./child.js', { workerData: { path, lock } });

pendingWorkers++;

worker.on('message', (message) => {
  lock.acquire();
  message.forEach((file) => files.add(file));
  lock.release();
});

worker.on('error', (error) => {
  console.error(error);
});

worker.on('exit', () => {
  pendingWorkers--;
  if (pendingWorkers === 0) {
    console.log(Array.from(files).join('\n'));
  }
});
