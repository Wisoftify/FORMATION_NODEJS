const { fork } = require('child_process');

// Créer un processus enfant en utilisant fork
const childProcess = fork('child.js');

// Écouter les messages du processus enfant
childProcess.on('message', message => {
  console.log(`Le processus enfant a renvoyé le message : ${message}`);
});

// Envoyer un message au processus enfant
childProcess.send('Salut, processus enfant!');