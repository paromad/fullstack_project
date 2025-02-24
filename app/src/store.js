import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './slices/bookSlice'
import bookListReducer from './slices/bookListSlice'
import commentReducer from './slices/commentSlice'

export const store = configureStore({
  reducer: {
    book: bookReducer,
    comment: commentReducer,
    bookList: bookListReducer,
  },
})
