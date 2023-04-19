import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addRecipe (action) {
    console.log('my action payload', action.payload)
    try {
        yield axios.post('/api/recipes', action.payload)
    } catch (error) {
        console.log('error in add recipe saga', error)
    }
}

function* postRecipeSaga () {
    yield takeLatest('POST_RECIPE', addRecipe)
}
export default postRecipeSaga;