import { createSlice } from '@reduxjs/toolkit'
import { normalizeBooks } from '../normalize/normalizeBooks'

const initialState = {
    booksList: [],
    books: {},
}

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setBooks: (state, action) => {
            console.log("SetBooks")
            console.log(action.payload)
            const { result, entities } = normalizeBooks(action.payload)
            console.log(result)
            console.log(entities)

            state.booksList = result
            state.books = entities.books
        },
    },
})

export const { setBooks } =
  bookSlice.actions

export default bookSlice.reducer
