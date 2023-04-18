import { useState } from 'react';
import Tesseract from 'tesseract.js';


function AddDirections ({getDirections}) {
    const [directionsocr, setOcr] = useState('Loading...Directions');
    const [imageData, setImageData] = useState(null);
    getDirections = directionsocr
    
    if (imageData === null) {
        console.log(`add an image`);
      } else {
        Tesseract.recognize(
          imageData,
          'eng',
          { logger: m => console.log(m) }
        ).then(({ data }) => {
          console.log('this is the total data:', data);
          setOcr(data.text)
        })
      }
    
    
      function handleImageChange(e) {
        console.log('this is my file', e.target.files[0])
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageDataUri = reader.result;
          console.log({ imageDataUri });
          setImageData(imageDataUri);
        }
        reader.readAsDataURL(file);
      }
    return (<>
           <input type='file' onChange={handleImageChange} placeholder="Add Directions"/>
        {imageData ? 
        <textarea type='text' className='IngredientInput' value={directionsocr}></textarea> : <p>{directionsocr}</p>}
    </>)
}

export default AddDirections;