const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
  static initiate(sequelize) {
    Post.init({
      purpose: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      field: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      time: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      frequency: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      method: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      shortText: {
        type: Sequelize.STRING(255),
        allowNull: false // 필수
      },
      longText: {
        type: Sequelize.STRING(1000),
        allowNull: false // 필수
      }
    }, {
      sequelize,
      timestamps: true,    // createAt & updateAt 활성화
      underscored: false,
      modelName: 'Post',
      tableName: 'posts', // 테이블 이름
      paranoid: false,    // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
      charset: 'utf8mb4', // 한글 저장
      collate: 'utf8mb4_general_ci', // 한글 저장
    });
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }) // post.addLikers, post.removeLikers
  }
};

module.exports = Post;