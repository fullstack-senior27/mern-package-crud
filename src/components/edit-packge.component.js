import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



export default function EditPackage() {
  let params = useParams();
  console.log('function--', params);

  const [packag, setPackage] = useState({
    package_name: '',
    package_price: 0,
    package_description: '',
    package_category: '',
    package_quantity: 0,
  })

  useEffect(() => {
    axios.get('http://localhost:4000/packages/' + params.id)
      .then(response => {
        setPackage({
          package_name: response.data.package_name,
          package_price: response.data.package_price,
          package_description: response.data.package_description,
          package_category: response.data.package_category,
          package_quantity: response.data.package_quantity,
        });
      })
      .catch(err => {
        console.log(err)
      });
  }, []);

  const navigate = useNavigate();
  
  const onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      package_name: packag.package_name,
      package_price: packag.package_price,
      package_description: packag.package_description,
      package_category: packag.package_category,
      package_quantity: packag.package_quantity,
    };
    console.log(obj);
    axios.post('http://localhost:4000/packages/update/' + params.id, obj)
      .then(res => console.log(res.data));

    navigate('/');
  }

  return (
    <div>
      <h3 align="center">Update Package</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Name: </label>
          <input type='text'
            className='form-control'
            value={packag.package_name}
            onChange={e => setPackage({ ...packag, package_name: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <label>Price: </label>
          <input type='number'
            className='form-control'
            value={packag.package_price}
            onChange={e => setPackage({ ...packag, package_price: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <label>Description: </label>
          <input type='text'
            className='form-control'
            value={packag.package_description}
            onChange={e => setPackage({ ...packag, package_description: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <label>Category: </label>
          <input type='text'
            className='form-control'
            value={packag.package_category}
            onChange={e => setPackage({ ...packag, package_category: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <label>Quantity: </label>
          <input type='text'
            className='form-control'
            value={packag.package_quantity}
            onChange={e => setPackage({ ...packag, package_quantity: e.target.value })}
          />
        </div>

        <br />

        <div className='form-group'>
          <input type='submit' value='Update Todo' className='btn btn-primary' />
        </div>
      </form>
    </div>
  );
}