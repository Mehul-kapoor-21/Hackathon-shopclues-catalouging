import React, { useRef, useState, useEffect } from "react";
import Trianglediv from "../components/Trianglediv/Trianglediv";
import "./Catalog.css";
import s21 from "../images/s21.webp";
import s22 from "../images/s22.jpg";
import s23 from "../images/s23.webp";
import s24 from "../images/s24.webp";
import dot1 from "../images/dot1.jpeg";
import dot2 from "../images/dot2.jpeg";
import p1 from "../images/p1.jpg";
import Discount from "../components/discount/Discount";
import Bestseller from "../components/bestseller/Bestseller";
import Title from "../components/title/Title";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";

export default function Catalog() {
  const pdfRef = useRef(null);
  const location = useLocation();
  console.log(location.state);
  //#c1c3ea
  const [color, setColor] = useState([
    ["#c1c3ea", "#372e59", "#8e86ae", "#dbdaee"],
    ["#f1a624", "#d7ad5e", "#df9408", "#f1a624"],
    ["#d1eea6", "#0e7d0e", "#76eb76", "#d1eea6"],
  ]);
  const [curr, setCurr] = useState(color[0]);
  const [sucmes, setSucmes] = useState(false);

  useEffect(() => {
    const triangle = document.querySelector(".second-div");
    triangle.style.background = curr[3];
  }, [curr]);

  const handleExcel = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/product/excel", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.message === "Success") {
        setSucmes(true);
        setTimeout(() => {
          setSucmes(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generatePDF = () => {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("webpage.pdf");
    });
  };
  return (
    <div>
      <div ref={pdfRef}>
        <div className="first-div">
          <Trianglediv curr={curr} />
          <div className="product-name">
            <h1> {location.state.productName}</h1>
            <p>{location.state.productDescription}</p>
          </div>
          <div className="dot1">
            <img src={dot2} alt="" />
          </div>
          <div className="main-img">
            <img src={location.state.frontimage[0]} alt="" />
            <div className="discount1">
              {location.state.discount != 0 ? (
                <Discount curr={curr} dis={location.state.discount} />
              ) : (
                ""
              )}
            </div>
            <div className="bestseller">
              {location.state.bestseller === "true" ? <Bestseller /> : ""}
            </div>
            <div className="title">
              <Title
                curr={curr}
                name={location.state.companyname}
                price={location.state.price}
              />
            </div>
          </div>
        </div>
        <div className="second-div"></div>
        <div className="third-div">
          <div className="inner1">
            <div className="sideimg">
              <img src={location.state.frontimage[1]} alt="" />
            </div>
            {/* <div className="dis">
              <h2>Soft Fabric</h2>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                fuga ab et eius sequi facere, deserunt accusantium, repudiandae
                voluptas
              </div>
            </div> */}
          </div>
          <div className="inner2">
            <div className="sideimg">
              <img src={location.state.frontimage[2]} alt="" />
            </div>
            {/* <div className="dis">
              <h2>Soft Fabric</h2>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                fuga ab et eius sequi facere, deserunt accusantium, repudiandae
                voluptas
              </div>
            </div> */}
          </div>
          <div className="inner3">
            <div className="sideimg">
              <img src={location.state.frontimage[3]} alt="" />
            </div>

            {/* <div className="dis">
              <h2>Soft Fabric</h2>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                fuga ab et eius sequi facere, deserunt accusantium, repudiandae
                voluptas
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="btn-div">
        <div className="color-div">
          <div onClick={() => setCurr(color[0])} className="purpul"></div>
          <div onClick={() => setCurr(color[1])} className="orange"></div>
          <div onClick={() => setCurr(color[2])} className="green"></div>
        </div>
        <div style={{ margin: "auto", textAlign: "center" }}>
          <button className="btn1" onClick={handleExcel}>
            Create Excel
          </button>
          {sucmes && (
            <p style={{ color: "green", fontSize: "0.7rem", margin: "auto" }}>
              Excel Created!
            </p>
          )}
        </div>

        <button className="btn" onClick={generatePDF}>
          Convert to PDF
        </button>
      </div>
    </div>
  );
}
