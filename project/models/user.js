const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init({
      // id가 기본적으로 들어있다.
      email: {
        type: Sequelize.STRING(255), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true,
        unique: true, // 고유한 값
      },
      userid: {
        type: Sequelize.STRING(255),
        allowNull: false, // 필수
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false, // 필수
        defaultValue: 'local',
      },
      snsId: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' })
  }
};

module.exports = User;