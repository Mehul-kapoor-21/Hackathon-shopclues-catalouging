import React, { useState } from 'react';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
const Temp = ({setProductDescription}) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = async (event) => {
      const base64String = event.target.result.split(',')[1];
      setImage(base64String);
    };
  
    reader.readAsDataURL(file);
  };

  const generateDescription = async () => {
    setLoading(true);
    try {
      if (!image) {
        throw new Error('Please select an image.');
      }
  
      // Image recognition using Google Cloud Vision API
      const visionApiResponse = await axios.post(
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA5zLUNbzjDwYmRieX2MiuQZJmafTlctYI',
        {
          requests: [
            {
              image: {
                content: image,
              },
              features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
            },
          ],
        }
      );

      const labels = visionApiResponse.data.responses[0].labelAnnotations.map(
        (label) => label.description
      );

      // Convert labels into a comma-separated string
      const labelString = labels.join(', ');
      
      // Analyze entities using Google Cloud Natural Language API
      const languageApiResponse = async ()=>{
        const genAI = new GoogleGenerativeAI('AIzaSyDLh2rLIyecQGrf0RvbwBjEB5EqhzhrT1k');
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
        const prompt = `Generate a product description based on the following label: ${labelString}`
      
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
    //    setDescription(text);
       setProductDescription(text)
      }
      languageApiResponse();
      // Extract relevant entities and create a detailed description
    //   const entities = languageApiResponse.data.entities;
    //   const entityDescriptions = entities.map(entity => entity.name + (entity.metadata && entity.metadata.wikipedia_url ? ` (${entity.metadata.wikipedia_url})` : ''));
    //   const description = `This product includes ${entityDescriptions.join(', ')}.`;

    //   setDescription(description);
    } catch (error) {
      console.error('Error:', error);
      setDescription('Error generating description. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={generateDescription} disabled={!image || loading}>
        Generate Description
      </button>
      {/* {loading && <p>Loading...</p>} */}
      {/* {description && <p>{description}</p>} */}
    </div>
  );
};

export default Temp;
