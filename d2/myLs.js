const {Worker} = require("worker_threads");

const myLs = async (path) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./myLsChild.js", {workerData: path});
  
    worker.on("message", (res) => {
      resolve(res);
    })
  })
}

const main = async () => {
  const files = await myLs(process.argv[2]);
  console.log(files.join("\n"));
}
main();