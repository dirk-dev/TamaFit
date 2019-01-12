module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the User model a firstName of type STRING
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
        len: [6, 320]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 20]
      }
    }
  });

  User.associate = function (models) {
    // Associating User with Workouts
    // When an User is deleted, also delete any associated Workouts
    User.hasMany(models.Workout, {
      onDelete: "cascade"
    });
  };

  return User;
};