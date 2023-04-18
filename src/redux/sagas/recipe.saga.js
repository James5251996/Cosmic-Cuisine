import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAllRecipes () {
    try{ 
        const recipes = yield axios.get('/api/recipes');
        //console.log('get all recipes:', recipes.data)
        yield put({ type: 'STORE_RECIPES', payload: recipes.data})
    } catch {
        console.log(`get all recipe error in client`);
    }
}
// my saga to get only breakfast recipes on call
function* getBreakfastRecipes() {
    try{
        const breakfastRecipes = yield axios.get('/api/recipes/breakfast');
        yield put({ type: 'STORE_RECIPES', payload: breakfastRecipes.data})
    } catch {
        console.log(`error in my get breakfast recipe saga`);
    }
}
//my saga to only get entree recipes on call
function* getEntreeRecipes() {
    try{
        const entreeRecipes = yield axios.get('/api/recipes/entree');
        yield put({ type: 'STORE_RECIPES', payload: entreeRecipes.data})
    } catch {
        console.log(`error in my get entree recipe saga`);
    }
}
// my saga to get my desert recipes
function* getDesertRecipes() {
    try{
        const desertRecipes = yield axios.get('/api/recipes/desert');
        yield put({ type: 'STORE_RECIPES', payload: desertRecipes.data})
    } catch {
        console.log(`error in my get desert recipe saga`);
    }
}
// my saga to get my snack recipes
function* getSnackRecipes() {
    try{
        const snackRecipes = yield axios.get('/api/recipes/snack');
        yield put({ type: 'STORE_RECIPES', payload: snackRecipes.data})
    } catch {
        console.log(`error in my get snack recipe saga`);
    }
}
// my saga to get my drink recipes
function* getDrinkRecipes() {
    try{
        const drinkRecipes = yield axios.get('/api/recipes/drink');
        yield put({ type: 'STORE_RECIPES', payload: drinkRecipes.data})
    } catch {
        console.log(`error in my get drink recipe saga`);
    }
}

function* recipeSaga () {
    yield takeLatest('GET_ALL_RECIPES', getAllRecipes);
    yield takeLatest('GET_BREAKFAST_RECIPES', getBreakfastRecipes);
    yield takeLatest('GET_ENTREE_RECIPES', getEntreeRecipes);
    yield takeLatest('GET_DESERT_RECIPES', getDesertRecipes);
    yield takeLatest('GET_SNACK_RECIPES', getSnackRecipes);
    yield takeLatest('GET_DRINK_RECIPES', getDrinkRecipes);
}

export default recipeSaga;
