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

function* recipeSaga () {
    yield takeLatest('GET_ALL_RECIPES', getAllRecipes)
}

export default recipeSaga;
