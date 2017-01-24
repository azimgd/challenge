const path = require('path');
const express = require('express');
const cons = require('consolidate');

const locations = {
  buildFolder: path.join(__dirname, 'public'),
  viewFolder: path.join(__dirname, 'public'),
};

module.exports = {
  init: () => {
    const app = express();
    const buildPath = express.static(locations.buildFolder);

    app.set('view engine', 'html');
    app.set('views', locations.viewFolder);
    app.engine('html', cons.nunjucks);
    app.use('/', buildPath);
    app.get('*', (_, res) => { res.render('index'); });

    return app;
  },
};
