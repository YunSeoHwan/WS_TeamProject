const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const router = express.Router();

/* GET login page. /auth/login */
router.get("/login",isNotLoggedIn, function (req, res, next) {
  res.render('login');
});

// GET /auth/logout
router.get('/logout',isLoggedIn,  (req, res, next) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// GET /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

// GET /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/?error=카카오로그인 실패',
}), (req, res) => {
  res.redirect('/'); // 성공 시에는 /로 이동
});

router.get('/naver', passport.authenticate('naver'));

router.get('/naver/callback', passport.authenticate('naver', {
    failureRedirect: '/?error=네이버로그인 실패',
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;
