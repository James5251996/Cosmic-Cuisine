import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* getRecipeDetails (action) {
 console.log('my id for my saga', action.payload)
 try {
    const recipeDetails = yield axios.get(`/api/recipes/${action.payload}`)
    yield put({ type: 'VIEW_DETAILS', payload: recipeDetails.data})
    console.log('here is my recipe details in my saga', recipeDetails.data)
 } catch (error) {
    console.log(`error in my get recipes details saga ${error}`);
 }
}




function* detailsSaga() {
    yield takeLatest('GET_RECIPE_DETAILS', getRecipeDetails)
}
export default detailsSaga;