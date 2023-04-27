import { useState } from 'react';
import Tesseract from 'tesseract.js';
import '../DirectionsInput/Directions.css'
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';



function AddDirections() {
  //const [ocr, setOcr] = useState('Loading...Directions');
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(false)
  const [ocr, setOcr] = useState('Choose Image for Directions');
  const [loadingBar, setLoadingBar] = useState(false)


  function storeDirections(event) {
    event.preventDefault();
    dispatch({
      type: 'STORE_DIRECTIONS',
      payload: ocr
    })
    setProgress(false)
  };

  const doOCR = async (e) => {
    setLoadingBar(true)
    //console.log('this is my type:', typeof (e.target.files[0].name))
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
    {loadingBar ? <CircularProgress color='secondary' /> : <textarea value={ocr} onChange={(event) => setOcr(event.target.value)}></textarea>}
    {progress ? <button onClick={storeDirections}>Submit Directions</button> : <p>Directions Submitted</p>}
  </>)
}

export default AddDirections;