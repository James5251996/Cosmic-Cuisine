import { useSelector } from "react-redux";
import '../RecipeDetails/RecipeDetails.css'
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";


function GetRecipesDetails() {
    const details = useSelector(store => store.viewRecipeDetails[0])

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const [category, setCategory] = useState('')
    const [newTitle, setTitle] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [newIngredients, setNewIngredients] = useState('')
    const [newDirections, setNewDirections] = useState('')


    let editedRecipe = {
        title: newTitle,
        image: imageUrl,
        category: category,
        ingredients: newIngredients,
        directions: newDirections
    }

    function updateRecipe (event) {
        event.preventDefault();
        console.log(newIngredients)
        console.log(newDirections)
        setOpen(false)
    }


    return (<>
        {details && (<>
            <div className="test">{details.title}</div>
            <img className='detailsImage' src={details.image}></img>
            <div className="test">{details.ingredients}</div>
            <br></br>
            <div className="test">{details.directions}</div>
        
        <div>
            <Button sx={{ backgroundColor: 'red', color: 'white' }} onClick={handleOpen}>Edit Recipe</Button>
            <Modal
            open={open}>
                <Box>
                    <textarea className="smallInputs">{details.title}</textarea>
                    <textarea className="smallInputs">{details.image}</textarea>
                    <textarea className="smallInputs">{details.category}</textarea>
                    <textarea className="largeInputs" onChange={(event) => setNewIngredients(event.target.value)}>{details.ingredients}</textarea>
                    <textarea className="largeInputs" onChange={(event) => setNewDirections(event.target.value)}>{details.directions}</textarea>
                    <button onClick={updateRecipe}>Close Modal</button>
                </Box>
            </Modal>
        </div>
        </>)}
        <Link to='/home'>
            <button>Back to Home</button>
        </Link>

    </>)
}
export default GetRecipesDetails;