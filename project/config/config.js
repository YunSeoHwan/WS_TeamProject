require("dotenv").config({
  path: ".env",
});

module.exports = {
  development: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: "mysql",
    KAKAO_ID: process.env.KAKAO_ID,
    NAVER_ID: process.env.NAVER_ID,
    NAVER_SECRET: process.env.NAVER_SECRET,
  },
  test: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: "mysql",
    KAKAO_ID: process.env.KAKAO_ID,
    NAVER_ID: process.env.NAVER_ID,
    NAVER_SECRET: process.env.NAVER_SECRET,
  },
  production: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: "mysql",
    logging: process.env.KAKAO_IDAKAO_ID,
    NAVER_ID: process.env.NAVER_ID,
    NAVER_SECRET: process.env.NAVER_SECRET,
  },
};
