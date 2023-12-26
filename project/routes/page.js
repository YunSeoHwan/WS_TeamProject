const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET board page. */
router.get("/board", isLoggedIn, function (req, res, next) {
  res.render('board');
});

/* GET profile page. */
router.get("/profile", isLoggedIn, function (req, res, next) {
  res.render('profile');
});

/* GET start page. */
router.get("/start",isLoggedIn, function (req, res, next) {
  res.render('start');
});

module.exports = router;
