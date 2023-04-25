import '../IngredientsInput/Ingredients.css'
import { useState } from 'react';
import Tesseract from 'tesseract.js';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

function AddIngredients() {
  console.log('add ingredients just loaded')
  const [ocr, setOcr] = useState('Choose Image for Ingredients');
  const [imageData, setImageData] = useState(null);
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(false)
  const [loadingBar, setLoadingBar] = useState(false)


  const doOCR = async (e) => {
    setLoadingBar(true)
    setOcr('Recognizing...');
    console.log('this is my type:', typeof (e.target.files[0].name))
    setImageData(e.target.files[0].name)
    try {
      const result = await Tesseract.recognize(
        e.target.files[0],
        'eng',
        { logger: (m) => console.log(m) },
      );
      setOcr(result.data.text);
      setProgress(true)
      setLoadingBar(false)
    } catch (err) {
      console.error('Error during OCR:', err);
    }
  };

  function storeIngredients (event) {
    event.preventDefault();
    dispatch({
      type: 'STORE_INGREDIENTS',
      payload: ocr
    })
  }





  return (<>
    <div>
      <input type='file' onChange={doOCR} placeholder="Add Ingredients" />
    </div>
    {loadingBar ? <CircularProgress color='secondary' /> : <p>{ocr}</p>}
    {progress ? <button onClick={storeIngredients}>Submit Ingrediets</button> : <p></p>}
  </>)
}

export default AddIngredients;