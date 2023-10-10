const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const packageRoutes = express.Router();
const PORT = 4000;

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/")
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

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
    .then((package) => 
      res.json(package))
    .catch((err) => console.log(err))
})

packageRoutes.route('/add').post((req, res) => {
  console.log("add package--", req.body);
  let {name, price, description, category, quantity} = new Package(req.body.packag);
  const newPackage = new Package({name, price, description, category, quantity}).save()
    .then(package => {
      res.status(200).json({ msg: 'package added successfully', package: package})
    })
    .catch(err => {
      res.status(400).send({msg: 'adding new package failed'})
    })
})

packageRoutes.route('/update/:id').post((req, res) => {
  Package.findById(req.params.id)
    .then((package) => {
      if (!package) {
        res.status(404).send("data is not found.");
      } else {
        const {name, price, description, category, quantity, img} = req.body.packag;
        package.name = name;
        package.price = price;
        package.description = description;
        package.category = category;
        package.quantity = quantity;
        package.img = img;

        console.log('server/update--', req.body, package);

        package.save()
          .then(package => {
            res.send({
              msg: "Package updated!",
              package
            })
          })
          .catch(err => {
            res.status(400).send("Update failed")
          })
      }
    })
    .catch(err => console.log(err))
})

app.use('/packages', packageRoutes);

const uploadImg = async (req, res, next) => {
  //console.log('req~~~~~~~~~~~~~~~~~', req)
  if (!req.file) {
    res.send({msg: 'No file uploaded'})
  } else {
    res.send({msg: 'Image uploaded', img: {
      path: req.file.path,
      mimetype: req.file.mimetype,
      filename: req.file.filename
    }})
  }
  // let buffer = fs.readFileSync(req.file.path)
  // let newPackage = await Package.findById(product._id)
  // newPackage.img.path = req.file.path;
  // newPackage.img.filename = req.file.filename;
  // newPackage.img.mimetype = req.file.mimetype;
  // await newPackage.save()
}

packageRoutes.post('/upload-img', upload.single('file'), uploadImg)

app.use('/uploads', express.static('uploads'));

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});