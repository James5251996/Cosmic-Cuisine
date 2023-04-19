const addDirectionsReducer = (state = '', action) => {
    if (action.type === 'STORE_DIRECTIONS') {
        return action.payload
    } else
    return state
}

export default addDirectionsReducer