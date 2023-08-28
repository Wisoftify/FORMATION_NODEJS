
process.on("message", message => {
  console.log(message, typeof(message));
  for (let i = 0; i < message; i++) {}//calcul lourd
  console.log("fin du calcul")
  process.send('done');
  process.exit();
})