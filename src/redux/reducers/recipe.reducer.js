const recipeReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_RECIPES':
            return action.payload
        default:
            return state
    }
};

export default recipeReducer;