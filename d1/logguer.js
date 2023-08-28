const log = (message) => {
  console.log(message);
};
const warn = (message) => console.warn(message);
const error = message => console.error(message);

module.exports = [
  log,
  warn,
  error
];