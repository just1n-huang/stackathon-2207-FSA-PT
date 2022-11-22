const conn = require("./conn");
const { STRING, INTEGER } = conn.Sequelize;

const Fave = conn.define("fave", {
  id: {
    type: STRING,
    primaryKey: true,
  },
  imageUrl: {
    type: STRING,
    allowNull: false,
  },
  alt_description: {
    type: STRING,
    allowNull: true,
  },
  likes: {
    type: INTEGER,
  },
  username: {
    type: STRING,
    allowNull: true,
  },
  portfolioUrl: {
    type: STRING,
    allowNull: true,
  },
  profileImage: {
    type: STRING,
  },
});

module.exports = Fave;
