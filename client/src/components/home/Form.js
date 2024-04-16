import React, { useState } from "react";
import Temp from "./Temp";
import { useNavigate } from "react-router-dom";
import "./My.css";

const Form = () => {
  // State variables to store product information
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [labels, setlabels] = useState([]);
  const [frontimage, setFrontImage] = useState([]);
  const [companyname, setCompanyname] = useState("");
  const [bestseller, setBestSeller] = useState("false");
  const navigate = useNavigate();
  const [features, setFeatures] = useState([]);
  const [color, setColor] = useState("");
  const [style, setStyle] = useState("");
  const [category,setCategory] = useState("");
  const [formData, setFormData] = useState({
    name: productName,
    description: productDescription,
    price: price,
    discount: discount,
    attributes: labels,
  });
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if mandatory fields are filled
    if (!productName || !productDescription || !price) {
      setErrorMessage("Please fill out all mandatory fields.");
      return;
    }
    //console.log(frontimage);
    const formData = {
      name: productName,
      description: productDescription,
      price: price,
      discount: discount,
      attributes: labels,
      color:color,
      category:category,
      style:style,
    };
    console.log(formData);
    try {
      const res = await fetch("http://localhost:8000/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res);

      navigate("/catalog", {
        state: {
          productName,
          labels,
          productDescription,
          price,
          discount,
          frontimage,
          bestseller,
          companyname,
          color,
          style,
          category,
        },
      });

      setSuccessMessage("Product successfully submitted!");
      setProductName("");
      setProductDescription("");
      setProductImages([]);
      setPrice("");
      setDiscount(0);
      setFormData({});
      setErrorMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="maindiv">
      <div className="form-container">
        <h1 className="form-title">CatalogEase</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="div1">
            <Temp
              setProductDescription={setProductDescription}
              setlabels={setlabels}
              images={images}
              setImages={setImages}
              setFrontImage={setFrontImage}
              setFeatures={setFeatures}
              features={features}
              setProductName={setProductName}
              setColor={setColor}
              setCategory={setCategory}
              setStyle={setStyle}
            />
          </div>
          <div className="div2">
            <div className="form-group">
              <label className="form-label">Product Name:</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Company Name:</label>
              <input
                type="text"
                value={companyname}
                onChange={(e) => setCompanyname(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Product Description:</label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Color:</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setProductDescription(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Style:</label>
              <input
                type="text"
                value={style}
                onChange={(e) => setProductDescription(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setProductDescription(e.target.value)}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Price:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Discount:</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Best Seller:</label>
              <input
                type="text"
                value={bestseller}
                placeholder="true or false"
                onChange={(e) => setBestSeller(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            className="submit-button"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
