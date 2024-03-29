"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    product.init(
        {
            uuid: DataTypes.STRING,
            product: DataTypes.STRING,
            image: DataTypes.STRING,
            price: DataTypes.INTEGER,
            categoryId: DataTypes.INTEGER,
            isDeleted: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "product",
        }
    );
    product.associate = (models) => {
        product.belongsTo(models.category, { foreignKey: 'categoryId' });
        product.belongsToMany(models.transaction, { through: 'order' , foreignKey: 'productId'});
        product.hasMany(models.order, { foreignKey: 'productId' });
    }
    return product;
};
