import { useState } from 'react';
import Tesseract from 'tesseract.js';
import '../DirectionsInput/Directions.css'
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';



function AddDirections() {
  //const [ocr, setOcr] = useState('Loading...Directions');
  const [imageData, setImageData] = useState('');
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(false)
  const [ocr, setOcr] = useState('');
  const [loadingBar, setLoadingBar] = useState(false)


  function storeDirections(event) {
    event.preventDefault();
    dispatch({
      type: 'STORE_DIRECTIONS',
      payload: ocr
    })
  }




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



  return (<>
    <div>
      <input type='file' onChange={doOCR} placeholder="Add Directions" />
    </div>
    {loadingBar ? <CircularProgress color='secondary' /> : <p>{ocr}</p>}
    {progress ? <button onClick={storeDirections}>Submit Ingrediets</button> : <p></p>}
  </>)
}

export default AddDirections;