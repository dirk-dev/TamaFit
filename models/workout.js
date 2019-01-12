module.exports = function (sequelize, DataTypes) {
  var Workout = sequelize.define("Workout", {
    // Giving the Workout model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20]
      }
    }
  });

  Workout.associate = function (models) {
    // Associating Workout with Logs
    // When a Workout is deleted, also delete any associated Logs
    Workout.hasMany(models.Log, {
      // onDelete: "cascade"
    });
  };

  return Workout;
};