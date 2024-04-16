import React, { useEffect } from "react";
import "./discount.css";

export default function ({ curr, dis }) {
  useEffect(() => {
    const triangle = document.querySelector(".discount");
    triangle.style.background =
      "linear-gradient(" + "30deg" + ", " + curr[1] + ", " + curr[2] + ")";
  }, [curr]);
  return (
    <div className="discount">
      <h1 className="discount-h1">{dis}%</h1>
      <h2>Discount</h2>
    </div>
  );
}
