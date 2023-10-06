const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const packageRoutes = express.Router();
const PORT = 4000;

let Package = require('./model/package.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/my-store', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
  console.log("MongoDB database connection established successfully");
})

packageRoutes.route('/').get(function (req, res) {
  Package.find()
    .then((packages) => {
      res.json(packages);
    })
    .catch((err) => console.log(err));
})

packageRoutes.route('/:id').get((req, res) => {
  let id = req.params.id;
  Package.findById(id)
    .then((package) => res.json(package))
    .catch((err) => console.log(err))
})

packageRoutes.route('/add').post((req, res) => {
  let package = new Package(req.body);
  package.save()
    .then(package => {
      res.status(200).json({ 'package': 'package added successfully' })
    })
    .catch(err => {
      res.status(400).send('adding new package failed')
    })
})

packageRoutes.route('/update/:id').post((req, res) => {
  Package.findById(req.params.id)
    .then((package) => {
      if (!package) {
        res.status(404).send("data is not found.");
      } else {
        package.package_name = req.body.package_name;
        package.package_cost = req.body.package_cost;
        package.package_description = req.body.package_description;
        package.package_category = req.body.package_category;
        package.package_quantity = req.body.package_quantity;

        package.save()
          .then(package => {
            res.json("Package updated!")
          })
          .catch(err => {
            res.status(400).send("Update failed")
          })
      }
    })
    .catch(err => console.log(err))
})

app.use('/packages', packageRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});