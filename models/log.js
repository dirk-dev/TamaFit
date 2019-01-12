module.exports = function(sequelize, DataTypes) {
  var Log = sequelize.define("Log", {
    // title: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [1]
    //   }
    // },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Log.associate = function(models) {
    // We're saying that a Log should belong to a User
    // A Log can't be created without anUser due to the foreign key constraint
    Log.belongsTo(models.Workout, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Log;
};
