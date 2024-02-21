const functions = require('@google-cloud/functions-framework');

functions.http('helloHttp', (req, res) => {
  const name = 'Will Lapinel';
  res.send(name + ` says ${req.query.keyword}!`);
});
