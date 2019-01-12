module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("Users", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 320]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 20]
      }
    }
  }, {
    freezeTableName: true
  });
  User.associate = function (models) {
    User.hasMany(models.Workouts, {
      onDelete: "cascade"
    });
  };

  return User;
};