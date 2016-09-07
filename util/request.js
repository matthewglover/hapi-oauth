const req = require('request');

const request = (options) =>
  new Promise((resolve, reject) =>
    req(options, (err, response, body) =>
      (err ? reject(err) : resolve({ response, body }))
    )
  );

module.exports = request;
