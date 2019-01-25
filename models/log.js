module.exports = function(sequelize, DataTypes) {
  var Log = sequelize.define("Log", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Log.associate = function(models) {
    Log.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Log;
};
