import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Package = props => (
  <tr>
    <td>{props.package.package_name}</td>
    <td>{props.package.package_price}</td>
    <td>{props.package.package_description}</td>
    <td>{props.package.package_category}</td>
    <td>{props.package.package_quantity}</td>
    <td>
      <Link to={"/edit/" + props.package._id}>Edit</Link>
    </td>
  </tr>
)

export default class PackagesList extends Component {
  constructor(props) {
    super(props);
    this.state = { packages: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/packages/')
      .then(response => {
        this.setState({ packages: response.data });
      })
      .catch(err => {
        console.log(err);
      })
  }

  packageList() {
    return this.state.packages.map((currentPackage, i) => {
      return <Package package={currentPackage} key={i} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Packages List</h3>
        <table className='table table-striped' style= {{ marginTop: 20}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            { this.packageList() }
          </tbody>
        </table>
      </div>
    )
  }
}