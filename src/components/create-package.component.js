import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePackage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      package_name: '',
      package_price: 0,
      package_description: '',
      package_category: '',
      package_quantity: 0,
      // Package: img
    }

    this.onChangePackageName = this.onChangePackageName.bind(this);
    this.onChangePackagePrice = this.onChangePackagePrice.bind(this);
    this.onChangePackageDescription = this.onChangePackageDescription.bind(this);
    this.onChangePackageCategory = this.onChangePackageCategory.bind(this);
    this.onChangePackageQuantity = this.onChangePackageQuantity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangePackageName(e) {
    this.setState({
      package_name: e.target.value
    })
  }

  onChangePackagePrice(e) {
    this.setState({
      package_price: e.target.value
    })
  }

  onChangePackageDescription(e) {
    this.setState({
      package_description: e.target.value
    })
  }

  onChangePackageCategory(e) {
    this.setState({
      package_category: e.target.value
    })
  }

  onChangePackageQuantity(e) {
    this.setState({
      package_quantity: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Submit package: ${this.state}`);

    const newPackage = {
      package_name: this.state.package_name,
      package_price: this.state.package_price,
      package_description: this.state.package_description,
      package_category: this.state.package_category,
      package_quantity: this.state.package_quantity,
    }

    axios.post('http://localhost:4000/packages/add', newPackage)
      .then(res => console.log(res.data))

    this.setState({
      package_name: '',
      package_price: 0,
      package_description: '',
      package_category: '',
      package_quantity: 0,
    })
  }
  
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create New Package</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input type="text"
              className="form-control"
              value={this.state.package_name}
              onChange={this.onChangePackageName}
            />
          </div>
          <div className="form-group">
            <label>Price: </label>
            <input type="text"
              className="form-control"
              value={this.state.package_price}
              onChange={this.onChangePackagePrice}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input type="text"
              className="form-control"
              value={this.state.package_description}
              onChange={this.onChangePackageDescription}
            />
          </div>
          <div className="form-group">
            <label>Category: </label>
            <input type="text"
              className="form-control"
              value={this.state.package_category}
              onChange={this.onChangePackageCategory}
            />
          </div>
          <div className="form-group">
            <label>Quantity: </label>
            <input type="text"
              className="form-control"
              value={this.state.package_quantity}
              onChange={this.onChangePackageQuantity}
            />
          </div>
          
          <div className="form-group">
            <input type="submit" value="Create Package" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}