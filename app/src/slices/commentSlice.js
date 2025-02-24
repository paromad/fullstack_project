import { createSlice } from '@reduxjs/toolkit'
import { normalizeComments } from '../normalize/normalizeComments'

const initialState = {
    commentsList: [],
    comments: {},
    users: {},
}

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setComments: (state, action) => {
            const { result, entities } = normalizeComments(action.payload)

            state.commentsList = result
            state.comments = entities.comments
            state.users = entities.users
        },
        createComment: (state, action) => {
            const { result, entities } = normalizeComments(action.payload)

            state.comments = { ...state.comments, ...entities.comments }
            state.users = { ...state.users, ...entities.users }
        },
    },
})

export const { setComments, createComment } =
    commentSlice.actions

export default commentSlice.reducer
