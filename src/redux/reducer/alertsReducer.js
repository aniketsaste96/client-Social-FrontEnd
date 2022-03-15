const initialState = {
    loading: false,
    likeOrUnlikeLoading: false,
    addCommentLoading: false
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
        case 'ADD_COMMENT_LOADING': return {
            //whenever add comment cliked we are going to call this
            ...state,
            addCommentLoading: action.payload
        }
        default: return state
    }
}