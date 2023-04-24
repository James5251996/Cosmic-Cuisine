import { useState } from 'react';
import Tesseract from 'tesseract.js';
import '../DirectionsInput/Directions.css'
import { useDispatch } from 'react-redux';


function AddDirections() {
  const [ocr, setOcr] = useState('Loading...Directions');
  const [imageData, setImageData] = useState(null);
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(false)

  if (imageData === null) {
    console.log(`add an image`);
  } else {
    Tesseract.recognize(
      imageData,
      'eng',
      { logger: m => console.log(m) },
    ).then(({ data }) => {
      console.log('this is the total data:', data);
      setOcr(data.text)
      setProgress(true)
      console.log('current progress', progress)
    })
  }

  function storeDirections (event) {
    event.preventDefault();
    dispatch({
      type: 'STORE_DIRECTIONS',
      payload: ocr
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
    <div>
      <input type='file' onChange={handleImageChange} placeholder="Add Directions" />
    </div>
    {imageData ?
    <img className='pic' src={imageData}></img> : <p>Add Directions</p>}
     {progress ? <button onClick={storeDirections}>Submit Ingrediets</button>: <p>Loading Directions</p>}
  </>)
}

export default AddDirections;