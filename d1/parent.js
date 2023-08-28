const {fork} = require('child_process');

const heavyCalc = (n) => new Promise((resolve, reject) => {
  if (n < 0) reject('n must be positive');

  const childProcess = fork("./enfant.js");

  childProcess.on("message", (res) => {
    console.log(res);
    resolve(res);
  })
  childProcess.send(n);
})

console.log("hello");
heavyCalc(10000000000).then(() => console.log("terminé4"));
console.log("world");