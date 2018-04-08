const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const port = 9999;
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Connect
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

//Define Product Model
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


//Setting Templating Engine To Pug
app.set('view engine', 'pug')

app.use(express.static(__dirname + '/public'));

//We Test Connection To The MySQL Database
sequelize
  .authenticate()
  .then(function () {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.error('Unable to connect to the database:', err);
  });

app.get('/', function (req, res) {

  Product.findAll().then(function (products) {
    if (products.length > 1) {
      res.render('home', {
        pagename: "Bamazon",
        products: products,
      })
    }
    else {
      res.render("error", {
        pagename: "Bamazon Error",
        error: "I Think There Is An Error With The Database"
      })
    }
  }).catch(function () {
    res.render("error", {
      pagename: "Bamazon Error",
      error: "I Think There Is An Error With The Database"
    })
  })
});

app.get('/:itemid', function (req, res) {

  let itemid = req.params.itemid;

  Product.findOne({
    where: { item_id: itemid }
  }).then(function (product) {

    if (product) {
      res.render('product', {
        pagename: "Bamazon Product",
        product: product,
      })
    }
    else {
      res.render("error", {
        pagename: "Bamazon Error",
        error: "Could Not Find The Product"
      })
    }

  })

})

app.post('/buyitem', function (req, res) {
  let itemtobuy = req.body.productid;
  let itemquantity = req.body.quantity;

  Product.findOne({
    where: { item_id: itemtobuy }
  }).then(function (product) {
    console.log(product.dataValues.product_stock);

    let itemquantity = req.body.quantity;
    if (product.dataValues.product_stock > 0) {

      console.log(product.dataValues.product_stock - itemquantity);
      console.log();

      if ((product.dataValues.product_stock - itemquantity) >= 0) {
        product.decrement("product_stock", { by: itemquantity }).then(function () {
          res.redirect("/")
        })
      }
      else {
        res.render("error", {
          pagename: "Bamazon Error",
          error: "Not Enough Stock To Process Order"
        })
      }

      
    }
    else {
      res.render("error", {
        pagename: "Bamazon Error",
        error: "No Stock!"
      })
    }

  })
})

app.get('*', function (req, res) {

  res.render("error", {
    pagename: "Bamazon Error",
    error: "404"
  })

});

app.listen(port, function () {
  console.log('Bamazon Customer now listening on port ' + port);
})

