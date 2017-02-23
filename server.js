require('dotenv').config();
const path = require('path');
const express = require('express');
const cons = require('consolidate');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const locations = {
  buildFolder: path.join(__dirname, 'public'),
  viewFolder: path.join(__dirname, 'public'),
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.send(401);
};

module.exports = {
  init: () => {
    const app = express();
    app.use(expressSession({
      secret: process.env.sessionHash,
      resave: true,
      saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.set('view engine', 'html');
    app.set('views', locations.viewFolder);
    app.engine('html', cons.nunjucks);

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));

    passport.serializeUser((user, done) => { done(null, user); });
    passport.deserializeUser((user, done) => { done(null, user); });

    passport.use(new GoogleStrategy({
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.callbackURL,
    }, (accessToken, refreshToken, profile, cb) => {
      cb(null, profile);
    }));

    return Promise.resolve(app);
  },

  routes: (app) => {
    const buildPath = express.static(locations.buildFolder);
    app.get('/user', isAuthenticated, (req, res) => res.json({ displayName: req.user.displayName, name: req.user.name }));
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/' }));
    app.use('/', buildPath);
    app.get('*', (_, res) => { res.render('index'); });

    return Promise.resolve(app);
  },
};
