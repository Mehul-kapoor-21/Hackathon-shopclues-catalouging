import React, { useEffect } from "react";
import "./triangle.css";

export default function ({ curr }) {
  useEffect(() => {
    const triangle = document.querySelector(".triangle");
    triangle.style.borderTopStyle = "solid";
    triangle.style.borderTopColor = curr[0];
    triangle.style.borderTopWidth = "500px";
  }, [curr]);
  return <div className="triangle"></div>;
}
