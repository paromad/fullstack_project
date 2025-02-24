import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import '../styles/MainPage.css';
import Search from './MainBody/Search.js';
import { apiService } from '../services/BackApi.js';
import { Button } from "./UI/button/CustomButton";
import { deleteBook } from "../slices/bookListSlice.js";

import {
    setBookLists
} from '../slices/bookListSlice'

export function GetAllBookLists(){
    const dispatch = useDispatch()

    useEffect(() => {
        (async() => {
            const response = await fetch('http://127.0.0.1:8000/api/book_list')
            const bookLists = await response.json()
            dispatch(setBookLists(bookLists))
        })()
    }, []);
}

export function BookInList(props){
    const dispatch = useDispatch()

    console.log("BookInList")
    const [user, setUser] = useState('')
    let book = props.book;
    let id = book.id 

    useEffect(() => {
        (async () => {
            const user = await apiService('user/current/')
            setUser(user)
        })()
    }, [])

    const user_id = user.id
    console.log(user_id)

    const { bookLists, bookListsList, books } = useSelector(
        (state) => state.bookList
    )

    const deleteBookFromList = async () => {
        console.log("deleteBookFromList")
        try {
            const bookListNum = bookListsList.filter(
                (bookListId) => bookLists[bookListId].author == user_id
            )[0]

            let new_books = []
            new_books.push(...bookLists[bookListNum].books)
            console.log(new_books)

            var index = new_books.indexOf(id);
            if (index !== -1) {
                new_books.splice(index, 1);
            }
            // new_books.delete(id)
            console.log("new_books")
            console.log(new_books)
            console.log(new_books.length)
            // new_books.push(id)
            

            const responce = await apiService(`book_list/${bookListNum}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: bookLists[bookListNum].name,
                    books: new_books
                }),
            })

            const new_book = await apiService(`book/${id}/`)
            dispatch(deleteBook({ bookListId: bookListNum, new_book }))
            // window.location.reload()
        } catch (err) {
            console.log("ERROR")
            console.log(err)
        }
    }

    return (
        <div>
            <div class='book_info'>
                <div className='base_book_info'>
                    <div className='book_container'>
                        <img src={book.image} className='image'/>
                        <div className='book_titles'>
                            <div className='book_text'>
                                <b>Название: </b>
                                <p>{book.title}</p></div>
                            <div className='book_text'>
                                <b>Автор: </b>
                                <p>{book.author}</p></div>
                            <div className='book_date'>
                                <b>Год написания:</b>
                                <p>{book.year}</p></div>
                        </div>
                    </div>
                    <div className='button'>
                        <Button title="Удалить" href={"/my_books"} onClick={deleteBookFromList} />
                    </div>
                </div>
                <div className="annotation">
                    <div className="annotation_title"> Аннотация </div>
                    <div className="annotation_text">
                        {book.annotation}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function GetMyBooks() {
    const [user, setUser] = useState('')
    useEffect(() => {
        (async () => {
            const user = await apiService('user/current/')
            setUser(user)
        })()
    }, [])

    const user_id = user.id

    const { bookLists, bookListsList, books } = useSelector(
        (state) => state.bookList
    )

    try {
        const bookListNum = bookListsList.filter(
            (bookListId) => bookLists[bookListId].author == user_id
        )[0]
        const neededBooks = bookLists[bookListNum].books
        return (
            neededBooks.map(
                (book_id) => <BookInList book_id={book_id} book={books[book_id]} />
            )
        ) 
    } catch {
        return <div className='auth_text'>
            Вы ещё не добавили ни одной книги
        </div>
    }    
}

export function MyBooks(){
    const accessToken = window.localStorage.getItem('ACCESS')

    return (
        <div className='full_book_info'>
            <GetAllBookLists />
        { accessToken ?
                <GetMyBooks />
        :   <div className='auth_text'>
                Зарегистрируйтесь, чтобы создать свой список
            </div>
        }</div>
    )
}
