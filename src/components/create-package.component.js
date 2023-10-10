import React, { Component, useState } from 'react';
import { createPackage, uploadImg } from './../apiCalls/packageController';
import axios from 'axios';
import "../Styles/edit-card-modal-styles.css";
import "../App.css";

export default function CreatePackage() {
  const [packag, setPackage] = useState({
    name: '',
    price: 0,
    description: '',
    category: '',
    quantity: 0,
  });
  const [file, setFile] = React.useState();
  const [img, setImg] = React.useState();
  const [newImg, setNewImg] = React.useState(false);

  const handleChange = (e) => {
    setPackage({ ...packag, [e.target.id]: e.target.value });
  };

  const onFileChange = (event) => {
    // Update the state
    if (event.target.files[0]) {
      console.log('event.target.files', event.target.files)
      setNewImg(true);
      setFile(event.target.files[0]);
      let image = URL.createObjectURL(event.target.files[0]);
      setImg(image);
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Create New Package</h3>
      <div className='row'>
        <div className="ms-2 me-2 col-md-6">
          <h5 className="mt-2 mb-2">
            Add Photo for this package:
          </h5>
          <img src={img} style={{maxWidth: '100%'}} className="col-sm ms-2 mb-2" alt="" />
          <div className="col-sm">
            <input
              type="file"
              id="imgupload"
              onChange={onFileChange}
            />
          </div>

        </div>

        <div className="ms-2 me-2 col-md-6 d-flex flex-column justify-items-center align-content-center admin-edit-card">

          <form style={{ overflow: "hidden"}}>
            <div className="form-group ms-2 me-2">
              <label className="mt-3 mb-2 text-danger inputDish">
                Name:
              </label>
              <input type="text"
                className="form-control"
                id="name"
                value={packag.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group ms-2 me-2">
              <label className="mt-2 mb-2 text-danger">Price: </label>
              <input type="text"
                className="form-control"
                id="price"
                value={packag.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group ms-2 me-2">
              <label className="mt-2 mb-2 text-danger">Description: </label>
              <input type="text"
                className="form-control"
                id="description"
                value={packag.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group ms-2 me-2">
              <label className="mt-2 mb-2 text-danger">Category: </label>
              <input type="text"
                className="form-control"
                id="category"
                value={packag.category}
                onChange={handleChange}
              />
            </div>
            <div className="form-group ms-2 me-2">
              <label className="mt-2 mb-2 text-danger">Quantity: </label>
              <input type="text"
                className="form-control"
                id="quantity"
                value={packag.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <button
                className="ms-2 me-2 mt-4 mb-4 btn btn-danger"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  createPackage(packag).then((pack) => {
                    // console.log(prod)
                    if (newImg) {
                      uploadImg(file, pack).then(() => { });
                    }
                  });
                }}
              >
                Create Package
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}