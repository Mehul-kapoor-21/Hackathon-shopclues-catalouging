import React, { useState } from "react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaCloudDownloadAlt } from "react-icons/fa";
import "./My.css";

const Temp = ({
  setProductDescription,
  setlabels,
  images,
  setImages,
  setFrontImage,
  setFeatures,
  features,
  setProductName,
  setColor,
  setCategory,
  setStyle,
}) => {
  const [commonLabels, setCommonLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBnTjuslhNY2wFNGGDS15rZ3EltAn1lYEg"
  );

  const handleImageChange = async (e) => {
    const files = e.target.files;
    const newImages = [];
    const finalImages = [];

    const handleReaderLoad = (event) => {
      const base64String = event.target.result.split(",")[1];
      newImages.push(base64String);

      if (newImages.length === files.length) {
        setImages((prevImages) => [...prevImages, ...newImages]);
      }
    };

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = handleReaderLoad;
      const url = URL.createObjectURL(files[i]);
      finalImages.push(url);
      reader.readAsDataURL(files[i]);
    }
    setFrontImage(finalImages);
    const color = await run("What is the color of the product in image return only color one word answer?");
    setColor(color);
    const category = await run("What is the category of the product in image return only category one word answer?");
    setCategory(category)
    const style = await run("What is the style of the product in image return only style one word answer?");
    setStyle(style);
    const name = await run("What is the name of the product in image return only name one word answer?");
    setProductName(name);
  };

  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  async function run(pro) {
    // For text-and-images input (multimodal), use the gemini-pro-vision model
    //What is the catagory of the product in image return only catagory?
    //write a 3 line discription of the product shown in the image
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = pro;

    const fileInputEl = document.querySelector("input[type=file]");
    const imageParts = await Promise.all(
      [...fileInputEl.files].map(fileToGenerativePart)
    );

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    //console.log(text);
    return text;
  }

  const handledis = async ()=>{
    const dis = await run("write a 3 line discription of the product shown in the image");
    setProductDescription(dis);
  }

  // const generateDescription = async () => {
  //   setLoading(true);
  //   try {
  //     if (images.length === 0) {
  //       throw new Error("Please select at least one image.");
  //     }

  //     // Analyze images using Google Cloud Vision API and extract labels
  //     const labelsMap = new Map(); // Map to store label occurrences

  //     await Promise.all(
  //       images.map(async (image) => {
  //         const visionApiResponse = await axios.post(
  //           "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA5zLUNbzjDwYmRieX2MiuQZJmafTlctYI",
  //           {
  //             requests: [
  //               {
  //                 image: {
  //                   content: image,
  //                 },
  //                 features: [{ type: "LABEL_DETECTION", maxResults: 5 }],
  //               },
  //             ],
  //           }
  //         );

  //         // Count label occurrences
  //         visionApiResponse.data.responses[0].labelAnnotations.forEach(
  //           (label) => {
  //             const description = label.description;
  //             labelsMap.set(description, (labelsMap.get(description) || 0) + 1);
  //           }
  //         );
  //       })
  //     );

  //     // Find labels with occurrences greater than 1
  //     const commonLabels = [];
  //     labelsMap.forEach((count, label) => {
  //       if (count > 1) {
  //         commonLabels.push(label);
  //       }
  //     });
  //     setlabels(commonLabels);

  //     // Generate product description using Google Generative AI
  //     const genAI = new GoogleGenerativeAI(
  //       "AIzaSyDLh2rLIyecQGrf0RvbwBjEB5EqhzhrT1k"
  //     );
  //     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  //     const prompt = `Generate a product description based on the following labels of 3 lines only: ${commonLabels.join(
  //       ", "
  //     )}`;
  //     const result = await model.generateContent(prompt);
  //     const response = await result.response;
  //     const text = response.text();

  //     // Set the generated product description
  //     setProductDescription(text);
  //     // generateFeatures();
  //     console.log(commonLabels);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setProductDescription("Error generating description. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="img-up">
      <div className="icons">
        <FaCloudDownloadAlt></FaCloudDownloadAlt>
        <h6>Upload Here</h6>
      </div>
      <div className="filed">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          placeholder="Drop file Here"
          className="image-drop"
        />
      </div>
      <div className="btn-g">
        <button
          type="button"
          onClick={handledis}
          disabled={images.length === 0 || loading}
          className="btn-img-drop"
        >
          Generate Description
        </button>
      </div>
    </div>
  );
};

export default Temp;
