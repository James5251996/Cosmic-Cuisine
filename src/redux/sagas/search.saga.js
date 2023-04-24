import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* searchForRecipe (action) {
    console.log('here is what i am searching for in my search saga:', action.payload)
    try {
        const search = yield axios.get(`/api/recipes/search/${action.payload}`)
        yield put({ type: 'STORE_RECIPES', payload: search.data})
    } catch (error) {
        console.log('error in search saga', error)
    }
}

function* searchRecipe () {
    yield takeLatest('SEARCH_RECIPE', searchForRecipe)
}

export default searchRecipe;