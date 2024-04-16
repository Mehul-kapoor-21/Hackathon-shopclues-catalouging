import React, { useEffect } from "react";
import "./title.css";

export default function ({ curr,name, price }) {
  useEffect(() => {
    const triangle = document.querySelector(".title-i");
    triangle.style.background =
      "linear-gradient(" + "30deg" + ", " + curr[1] + ", " + curr[2] + ")";
  }, [curr]);
  return (
    <div className="title-i">
      <h1 className="title-h1">{name}</h1>
      <h2>Price :</h2>
      <h3>₹{price}</h3>
    </div>
  );
}
