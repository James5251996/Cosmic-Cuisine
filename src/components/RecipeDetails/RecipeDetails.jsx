import { useSelector } from "react-redux";
import '../RecipeDetails/RecipeDetails.css'
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function GetRecipesDetails() {
    const details = useSelector(store => store.viewRecipeDetails)
    const dispatch = useDispatch();
    const history = useHistory();

    //console.log('stuff from my details store', details);
    const [open, setOpen] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [category, setCategory] = useState("")
    const [newTitle, setTitle] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [newIngredients, setNewIngredients] = useState("")
    const [newDirections, setNewDirections] = useState("")
    const [idForRecipe, setIdForRecipe] = useState('')

    function updateRecipe(id) {
        // dispatch to update the detail states
        setIdForRecipe(id)
        setOpen(true)
    }
    function sendDispatch() {
        let editedRecipe = {
            title: newTitle,
            image: imageUrl,
            category: category,
            ingredients: newIngredients,
            directions: newDirections,
            id: idForRecipe
        }
        //console.log('this is my edited recipe', editedRecipe);
        dispatch({
            type: 'UPDATE_RECIPE',
            payload: editedRecipe
        })
    
        setOpen(false)
        history.push('/home')
    }

    const updateEditStates = () => {
        setCategory(details.category)
        setTitle(details.title)
        setImageUrl(details.image)
        setNewDirections(details.directions)
        setNewIngredients(details.ingredients)
        updateRecipe(details.id)

    }

    function DeleteRecipe () {
        console.log('this will be my delete dispactch and send back to home screen')
        setOpenAlert(false)
    }

    return (<>
        {details && (<>
            <div className="test">{details.title}</div>
            <img className='detailsImage' src={details.image}></img>
            <div className="test">{details.ingredients}</div>
            <br></br>
            <div className="test">{details.directions}</div>

            <div>
                <Button sx={{ backgroundColor: 'red', color: 'white' }} onClick={() => updateEditStates()}>Edit Recipe</Button>
                <Modal
                    open={open}>
                    <Box>
                        <textarea className="smallInputs" value={newTitle} onChange={(event) => setTitle(event.target.value)}></textarea>
                        <textarea className="smallInputs" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}></textarea>
                        <select className="smallInputs" name="category" value={category} onChange={(event) => setCategory(event.target.value)}>
                            <option>Choose Category</option>
                            <option value='Breakfast'>Breakfast</option>
                            <option value='Entree'>Entree</option>
                            <option value='Dessert'>Dessert</option>
                            <option value='Snack'>Snack</option>
                            <option value='Drink'>Drink</option>
                        </select>
                        <textarea className="largeInputs" value={newIngredients} onChange={(event) => setNewIngredients(event.target.value)}></textarea>
                        <textarea className="largeInputs" value={newDirections} onChange={(event) => setNewDirections(event.target.value)}></textarea>
                        <button onClick={sendDispatch}>Save Changes</button>
                        <Button onClick={() => setOpenAlert(true)}>Delete Recipe</Button>
                        <Dialog
                        open={openAlert}>
                            <DialogContent>
                                Are you sure you want to Delete?
                            </DialogContent>
                            <Button onClick={() => DeleteRecipe()}>Yes</Button>
                            <Button onClick={() => setOpenAlert(false)}>No</Button>
                        </Dialog>
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