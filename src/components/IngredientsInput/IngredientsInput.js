import '../IngredientsInput/Ingredients.css'
import { useState } from 'react';
import Tesseract from 'tesseract.js';
import { useDispatch, useSelector } from 'react-redux';

function AddIngredients() {
  console.log('add ingredients just loaded')
  const [ocr, setOcr] = useState('Loading...Ingredients');
  const [imageData, setImageData] = useState(null);
  const dispatch = useDispatch();

  function runTesseract() {
    if (imageData === null) {
      console.log(`add an image`);
    } else {
      console.log('we made it')
      Tesseract.recognize(
        imageData,
        'eng',
        { logger: m => console.log(m) }
      ).then(({ data }) => {
        console.log('this is the total data:', data);
        setOcr(data.lines)
      })
    }
    // dispatch({
    //   type: 'STORE_INGREDIENTS',
    //   payload: ocr
    // })
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
    <input type='file' onChange={handleImageChange} placeholder="Add Ingredients" />
  </>)
}

export default AddIngredients;