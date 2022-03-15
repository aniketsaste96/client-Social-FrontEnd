const initialState = {
    loading: false,
    likeOrUnlikeLoading: false
}

export const alertsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING": return {
            ...state,
            loading: action.payload
        }
        case "LIKE_UNLIKE_LOADING": return {
            ...state,
            likeOrUnlikeLoading: action.payload
        }
        default: return state
    }
}