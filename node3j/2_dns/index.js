const dns = require('dns');

dns.resolve("www.google.com", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});