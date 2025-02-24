import React, { Component } from 'react';
import { Book } from './Book.js';
import '../../styles/MainBody.css';
import Search from './Search.js';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    setBooks
} from '../../slices/bookSlice'
import {
    setComments
} from '../../slices/commentSlice'


export function GetBooks(){
    const dispatch = useDispatch()

    useEffect(() => {
        (async() => {
            const response = await fetch('http://127.0.0.1:8000/api/book')
            const books = await response.json()
            dispatch(setBooks(books))
        })()
    }, []);

    const { books, booksList } = useSelector(
        (state) => state.book
    )

    return (
        booksList.map(bookId => <Book key={bookId} book={books[bookId]}></Book>)
    )
}

export function GetAllComments(){
    const dispatch = useDispatch()

    useEffect(() => {
        (async() => {
            const response = await fetch('http://127.0.0.1:8000/api/comment')
            const comments = await response.json()
            dispatch(setComments(comments))
        })()
    }, []);
}

function MainBody(){
    return (
        <div className='main_body'>
            <Search />
            <GetBooks />
            <GetAllComments />
        </div>
    )
}

export default MainBody;