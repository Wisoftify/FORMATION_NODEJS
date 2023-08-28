const { fork } = require('child_process');

// Création d'un nouveau processus en utilisant fork()
const childProcess = fork('child.js');

// Écoute des messages envoyés par le processus enfant
childProcess.on('message', message => {
  console.log(`Le processus enfant a envoyé le message : ${message}`);
});

// Envoi d'un message au processus enfant
childProcess.send('Hello, child process!');