const addIngredientsReducer = (state = [], action) => {
    if (action.type === 'STORE_INGREDIENTS') {
        return [...state, ...action.payload]
    } else
    return state
}

export default addIngredientsReducer