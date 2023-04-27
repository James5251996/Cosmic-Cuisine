import '../IngredientsInput/Ingredients.css'
import { useState } from 'react';
import Tesseract from 'tesseract.js';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function AddIngredients() {
  //console.log('add ingredients just loaded')
  const [ocr, setOcr] = useState('Choose Image for Ingredients');
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(false)
  const [loadingBar, setLoadingBar] = useState(false)


  const doOCR = async (e) => {
    setLoadingBar(true)
   //console.log('this is my type:', typeof (e.target.files[0]))
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

  function storeIngredients(event) {
    event.preventDefault();
    dispatch({
      type: 'STORE_INGREDIENTS',
      payload: ocr
    })
    setProgress(false)
  }

  return (<>
    <div>
      <input type='file' onChange={doOCR} placeholder="Add Ingredients" />
    </div>
    {loadingBar ? <CircularProgress color='secondary' /> : <textarea color='warning' placeholder='Ingredients' value={ocr} onChange={(event) => setOcr(event.target.value)}/>}
    {progress ? <Button sx={{ml: 10, backgroundColor: 'lightblue', color: 'black'}} className='submitBtn' variant='contained' onClick={storeIngredients}>Submit Ingredients</Button> 
    : <Button sx={{ml: 10, backgroundColor: 'lightblue', color: 'black'}} disabled variant='contained' >Submit Ingredients</Button>}

  </>)
}

export default AddIngredients;