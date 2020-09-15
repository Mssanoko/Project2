// Creating our  model
module.exports = function(sequelize, DataTypes) {
  const Client = sequelize.define("Client", {
    // The email cannot be null, and must be a proper email before creation
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    newClient: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      unique: false
    }
  });
  Client.associate = function(models) {
    Client.hasMany(models.Invoice, {
      onDelete: "cascade"
    });
  };
  return Client;
};
