import React from 'react'
import { useState } from 'react';
import { FaCloudDownloadAlt } from "react-icons/fa";

import "./My.css"
export default function FF() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState(0);
  return (
    <form>
      <div className='flex'>

        <div className='flex1' >
      <div>
        <div className='icon'><FaCloudDownloadAlt /></div>
        <div className='text'>
        <h2>Drop file here</h2>
        <p>OR</p>
        <button>Upload File</button>
        </div>
      </div>
      <div className='text'>
        <p>Only PNG,JPG and PDF</p>
        <p>files are supported</p>
      </div>
      </div>


      <div className='flex2'>
       
        <div className="form-group">
          <label className="form-label">Product Name:</label>
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Product Description:</label>
          <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Discount:</label>
          <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className="form-input" />
        </div>
        
        <button type="submit" className="submit-button">Submit</button>
      </div>

      </div>
    </form>
  )
}
