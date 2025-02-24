import React, {Component} from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/Book.css';
import { GetComments } from './Comment.js';
import { Button } from "../UI/button/CustomButton";
import { apiService } from '../../services/BackApi.js';
import { addBook } from '../../slices/bookListSlice.js'
import { GetAllBookLists } from '../MyBooks.js';


export function BookBaseInfo(props){
    let id = props.book_id;

    const { books } = useSelector(
        (state) => state.book
    )

    let book = books[id]

    return (
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
    )
}

export function Book(props){
    const dispatch = useDispatch()
    const [user, setUser] = useState('')

    let id = props.book.id;
    let book_info_href = "/book_info/" + id;

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

    const addBookInList = async () => {
        try {
            const bookListNum = bookListsList.filter(
                (bookListId) => bookLists[bookListId].author == user_id
            )[0]

            let new_books = []
            new_books.push(...bookLists[bookListNum].books)
            new_books.push(id)

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
            dispatch(addBook({ bookListId: bookListNum, new_book }))
        } catch {}
    }

    return (
        <div className='book_info'>
            <GetAllBookLists />
            <div className='book_description'>
                <BookBaseInfo book_id={id} /> 
                <div className='button'>
                    <Button title="Добавить" href={"/my_books"} onClick={addBookInList} />
                </div>
            </div>
            <div className='coments'>
                <GetComments
                    book_id={id}
                />
                <div className='comments_button'>
                    <Button title="Все отзывы" href={book_info_href} />
                </div>
            </div>
        </div>
    )
}

// export { BookBaseInfo };
