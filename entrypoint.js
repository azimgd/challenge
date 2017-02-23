require('dotenv').config();
const Server = require('./server.js');

const port = (process.env.PORT || 8080);
Server.init()
  .then(Server.routes)
  .then(app => app.listen(port))
  .then(() => console.log(`Listening at http://localhost:${port}`));
