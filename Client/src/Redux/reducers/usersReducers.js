const initialState = {
    users: [],
}
export const usersReducers = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_ALL_USERS': return {
            ...state,
            users: action.payload
        }
        default: return state
    }
}
