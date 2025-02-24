import { createSlice } from '@reduxjs/toolkit'
import { normalizeBookLists } from '../normalize/normalizeBookLists'
import { normalizeBook } from '../normalize/normalizeBooks'

const initialState = {
    bookListsList: [],
    bookLists: {},
    books: {},
    users: {},
}

export const bookListSlice = createSlice({
    name: 'bookList',
    initialState,
    reducers: {
        setBookLists: (state, action) => {
            const { result, entities } = normalizeBookLists(action.payload)

            state.bookListsList = result
            state.bookLists = entities.book_list
            state.books = entities.books
            state.users = entities.users
        },
        createBookList: (state, action) => {
            const { result, entities } = normalizeBookLists(action.payload)

            state.bookLists = { ...state.bookLists, ...entities.bookLists }
            state.books = { ...state.books, ...entities.books }
            state.users = { ...state.users, ...entities.users }
        },
        addBook: (state, action) => {
            const { result, entities } = normalizeBook(action.payload.new_book)

            state.books = { ...state.books, ...entities.books }
            state.bookLists[action.payload.bookListId].book_set = {...state.bookLists[action.payload.bookListId].book_set, ...result}
        },
        deleteBook: (state, action) => {
            console.log("deleteBook")
            console.log(action.payload)
            const { result, entities } = normalizeBook(action.payload.new_book)
            console.log(result)
            console.log(entities)

            // const filteredArray = state.bookLists[action.payload.bookListId].book_set.filter(e => e !== action.payload.result)
            // console.log("filteredArray")
            // console.log(filteredArray)
            
            // const array = {...state.bookLists[action.payload.bookListId].book_set}
            // console.log("array")
            // console.log(array)
            // const filteredArray = array.filter(e => e !== action.payload.result)
            // console.log("filteredArray")
            // console.log(filteredArray)
            // const item = action.payload.result
            // console.log("item")
            // console.log(item)
            // const index = array.indexOf(item);
            // console.log("index")
            // console.log(index)
            // if (index !== -1) {
            //     array.splice(index, 1);
            // }
            // console.log("array2")
            // console.log(array)

            // state.bookLists[action.payload.bookListId].book_set = {...array}

            const bookId = action.payload.result
            const bookListId = action.payload.bookListId

            // Удаляем книгу из объекта книг
            // delete state.books[bookId]

            // Удаляем книгу из соответствующего списка
            // const bookSet = state.bookLists[bookListId].book_set
            // console.log(bookSet)
            // console.log("Object.keys(bookSet)")
            // console.log(Object.keys(bookSet))
            // state.bookLists[bookListId].book_set = Object.keys(bookSet)
            //     .filter(id => id !== bookId)
            //     .reduce((obj, id) => {
            //         obj[id] = bookSet[id]
            //         return obj
            //     }, {})

            const bookSet = state.bookLists[bookListId].book_set;
            console.log("Before if")
            console.log(bookSet)

            if (Array.isArray(bookSet)) {
                console.log("Array.isArray(bookSet)")
                state.bookLists[bookListId].book_set = bookSet.filter(id => id !== bookId);
            } else if (typeof bookSet === 'object' && bookSet !== null) {
                console.log("Else if")
                delete bookSet[bookId];
            } else {
                console.log(bookSet)
            }
            console.log("After if")
        
        }
    },
})

export const { setBookLists, createBookList, addBook, deleteBook } =
    bookListSlice.actions

export default bookListSlice.reducer
