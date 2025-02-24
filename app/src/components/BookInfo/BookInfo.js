import React, {Component, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { BookBaseInfo } from '../MainBody/Book';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "../UI/button/CustomButton";
import CustomInput from "../UI/input/CustomInput"
import { GetAllBookComments } from "../MainBody/Comment.js"
import { apiService } from '../../services/BackApi.js'
import {
    setBooks
} from '../../slices/bookSlice'
import {
    createComment
} from '../../slices/commentSlice'

import '../../styles/BookInfo.css';
import "../UI/button/CustomButton.module.css";

function FullBookInfo(props){
    const dispatch = useDispatch()
    let id = props.book_id;
    console.log(id)

    useEffect(() => {
        (async() => {
            const response = await fetch('http://127.0.0.1:8000/api/book')
            const books = await response.json()
            dispatch(setBooks(books))
        })()
    }, []);

    const { books } = useSelector(
        (state) => state.book
    )

    console.log(books)
    let book = books[id]
    console.log(book)

    return (
        <div className="book_info">
            <div className="base_book_info">
                <BookBaseInfo book_id={id} />
                <div className="add_button">
                    <Button title="Добавить" href="/my_books" />
                </div>
            </div>
            <div className="annotation">
                <div className="annotation_title"> Аннотация </div>
                <div className="annotation_text">
                    {book.annotation}
                </div>
            </div>
        </div>
    )
}

export function BookInfo() {
    const params = useParams();
    const { bookId } = params;

    const dispatch = useDispatch();

    const [value, setValue] = useState('')

    const handleSumbit = async function (event) {
        console.log("handleSumbit")
        event.preventDefault()
    
        const comment = await apiService('comment/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: value,
                book: bookId
            }),
        })
        setValue('')
    
        dispatch(createComment({ comment }))
    }
    

    return (
        <>
            <div className="full_book_info">
                <FullBookInfo book_id={bookId}/>
                <form>
                    <CustomInput
                        value={value}
                        placeholder="Оставить отзыв"
                        onChange={(event) => setValue(event.target.value)}
                        className="textarea"
                        name="text"
                    ></CustomInput>

                    <Button
                        title = "Опубликовать"
                        onClick={handleSumbit}
                    > </Button>
                </form>
                <GetAllBookComments book_id={bookId}/>
            </div>
        </>
    )
}
