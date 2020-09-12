
// Creating our invoice model
module.exports = function(sequelize, DataTypes) {
    const Invoice = sequelize.define("Invoice", {
      // The email cannot be null, and must be a proper email before creation
      clientName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      jobDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      }

    });
    Invoice.associate(function(models){
        Invoice.belongsTo(models.Client);
    });
    return Invoice;

  };
  