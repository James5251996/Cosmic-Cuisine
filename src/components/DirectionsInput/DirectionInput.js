import { useState } from 'react';
import Tesseract from 'tesseract.js';
import '../DirectionsInput/Directions.css'
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';



function AddDirections() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(false)
  const [ocr, setOcr] = useState('Choose Image for Directions');
  const [loadingBar, setLoadingBar] = useState(false)
  const [openSnackBar, setOpenSnackBar] = useState(false)


  function storeDirections(event) {
    event.preventDefault();
    dispatch({
      type: 'STORE_DIRECTIONS',
      payload: ocr
    })
    setProgress(false)
    setOpenSnackBar(true)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
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
    {loadingBar ? <CircularProgress sx={{ ml: 20 }} color='secondary' /> : <textarea value={ocr} onChange={(event) => setOcr(event.target.value)}></textarea>}
    {progress ? <Button sx={{ ml: 10, backgroundColor: 'lightblue', color: 'black' }} className='submitBtn' variant='contained' onClick={storeDirections}>Submit Ingredients</Button>
      : <p></p>}
    <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ mb: 5 ,width: '100%' }}>
        Submission Accepted
      </Alert>
    </Snackbar>
  </>)
}

export default AddDirections;