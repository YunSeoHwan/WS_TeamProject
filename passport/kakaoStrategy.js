const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("../models/user");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: config.KAKAO_ID,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(
          "-----------------------------------------------------------"
        );
        console.log("kakao profile ", profile);
        console.log(
          "-----------------------------------------------------------"
        );
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              userid: profile.id,
              email: profile._json && profile._json.kakao_account.email,
              name: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
            });
            console.log(
              profile._json.kakao_account.email,
              profile._json,
              newUser.email
            );
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
