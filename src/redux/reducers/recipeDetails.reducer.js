const viewRecipeDetails = (state = {}, action) => {
    if (action.type === 'VIEW_DETAILS' ) {
        console.log("View Details state", state)
        console.log("ViewDetails:", action.payload[0])
        return {...state, ...action.payload[0]}
    } else 
    return state
}


export default viewRecipeDetails;