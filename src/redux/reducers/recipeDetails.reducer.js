const viewRecipeDetails = (state = {}, action) => {
    if (action.type === 'VIEW_DETAILS' ) {
        return action.payload
    } else 
    return state
}


export default viewRecipeDetails;