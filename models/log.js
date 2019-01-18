module.exports = function(sequelize, DataTypes) {
  var Log = sequelize.define("Log", {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Log.associate = function(models) {
    // We're saying that a Log should belong to a Workout
    // A Log can't be created without an Workout due to the foreign key constraint
    Log.belongsTo(models.Workout, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Log;
};
