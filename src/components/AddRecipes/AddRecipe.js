import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Box, InputLabel, MenuItem, FormControl, Select, TextField } from '@mui/material';
import '../AddRecipes/AddRecipe.css'
import AddIngredients from "../IngredientsInput/IngredientsInput";
import { useState } from "react";
import AddDirections from "../DirectionsInput/DirectionInput";
import { useSelector } from "react-redux";



function AddRecipes() {

    const [category, setCategory] = useState('')
    const [newTitle, setTitle] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [newIngredients, setNewIngredients] = useState('')
    const [newDirections, setNewDirections] = useState('')
    const ingredients = useSelector(store => store.addIngredientsReducer)

    function handleCategory(event) {
        setCategory(event.target.value)
    }

    function saveRecipe (event) {
        let newRecipe = {
            image: imageUrl,
            title: newTitle,
            ingredients: newIngredients,
            directions: newDirections,
            category: category
        }
        console.log('my new recipe', newRecipe)
        console.log('my ingredients to add', ingredients)
    }


    return (<>
        <div>
            <div className='titleAndImage'>
                <TextField id="outlined-basic" label="Title" variant="outlined" size='small' sx={{ backgroundColor: 'lightblue', height: 40, width: 150 }} onChange={(event) => setTitle(event.target.value)}/>
                <TextField id="outlined-basic" label="Image URL" variant="outlined" size="small" sx={{ backgroundColor: 'lightblue', height: 40, width: 150}} onChange={(event) => setImageUrl(event.target.value)}/>
            </div>
            <Box>
                <FormControl sx={{marginLeft: 5}}>
                    <InputLabel id='mealCategory'>Category</InputLabel>
                    <Select labelId="mealCategory"
                        id="category"
                        label='Category'
                        value={category}
                        sx={{ width: 300, color: 'white', backgroundColor: '#e771a2', height: 50}}
                        onChange={handleCategory}>
                        <MenuItem value="Breakfast">Breakfast</MenuItem>
                        <MenuItem value="Entree">Entree</MenuItem>
                        <MenuItem value="Desert">Desert</MenuItem>
                        <MenuItem value="Snack">Snack</MenuItem>
                        <MenuItem value="Drink">Drink</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>
        <AddIngredients/>
        <AddDirections/>
        <button onClick={saveRecipe}>Save Recipe</button>
        <Link to='/home'>
            <button>Home Screen</button>
        </Link>
    </>)
}

export default AddRecipes;