process.on('message', message => {
  console.log(`Le processus parent a envoyé le message : ${message}`);
});

// Envoi d'un message au processus parent
process.send('Hello, parent process!');