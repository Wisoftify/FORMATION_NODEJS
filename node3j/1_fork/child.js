// Code dans child.js (processus enfant)

// Écouter les messages du processus principal
process.on('message', message => {
  console.log(`Le processus principal a renvoyé le message : ${message}`);
});

// Envoyer un message au processus principal
process.send('Bonjour, processus principal!');