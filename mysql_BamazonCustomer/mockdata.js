const uuidv4 = require('uuid/v4');
const Sequelize = require('sequelize');
//bamazon = database, root = user, superman69 = password
const sequelize = new Sequelize('bamazon', 'root', 'superman69', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

const Product = sequelize.define('Product', {
    item_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: function () {
            return uuidv4().toString();
        }
    },
    product_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    department_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    product_price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    product_stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

sequelize
    .authenticate()
    .then(function () {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.error('Unable to connect to the database:', err);
    });

Product.sync()
    .then(function () {
        return Product.create({
            product_name: "Burger",
            department_name: "Food",
            product_price: 79.99,
            product_stock: 100,
        });
    }).then(function () {
        return Product.create({
            product_name: "Pizza",
            department_name: "Food",
            product_price: 49.99,
            product_stock: 50,
        })
    }).then(function () {
        return Product.create({
            product_name: "Pasta",
            department_name: "Food",
            product_price: 19.99,
            product_stock: 75,
        })
    }).then(function () {
        return Product.create({
            product_name: "French Fries",
            department_name: "Food",
            product_price: 9.99,
            product_stock: 1000,
        })
    }).then(function () {
        return Product.create({
            product_name: "Coke",
            department_name: "Drink",
            product_price: 5.49,
            product_stock: 500,
        })
    }).then(function () {
        return Product.create({
            product_name: "Sprite",
            department_name: "Drink",
            product_price: 6.99,
            product_stock: 450,
        })
    }).then(function () {
        return Product.create({
            product_name: "Fanta",
            department_name: "Drink",
            product_price: 2.19,
            product_stock: 900,
        })
    }).then(function () {
        return Product.create({
            product_name: "Nuggets",
            department_name: "Food",
            product_price: 25.99,
            product_stock: 60,
        })
    }).then(function () {
        return Product.create({
            product_name: "IceCream",
            department_name: "Food",
            product_price: 42.50,
            product_stock: 100,
        })
    }).then(function () {
        return Product.create({
            product_name: "Doughnut",
            department_name: "Food",
            product_price: 9.99,
            product_stock: 25,
        })
    });

