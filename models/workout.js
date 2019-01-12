module.exports = function(sequelize, DataTypes) {
  var Workout = sequelize.define("Workout", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Workout.associate = function(models) {
    // We're saying that a Workout should belong to a User
    // A Workout can't be created without anUser due to the foreign key constraint
    Workout.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Workout;
};
