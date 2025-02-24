import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/Search.css';
import CustomButton from "../UI/button/CustomButton"
import { Book } from "./Book"
import { Button } from "../UI/button/CustomButton"
import CustomInput from "../UI/input/CustomInput"
import { useDispatch, useSelector } from 'react-redux'

export function SearchResult(){
    const params = useParams();
    const { value } = params;

    const { books, booksList } = useSelector(
        (state) => state.book
    )

    let good_books = booksList.filter(
        (bookId) => books[bookId].title.toLowerCase().includes(value.toLowerCase())
            || books[bookId].author.toLowerCase().includes(value.toLowerCase())
    );
    console.log(good_books)

    return (
        <div className='main_body'>
            <div>
                <Search />
            </div>
            {good_books.length ? (
                <div>
                {good_books.map(
                    (bookId) => <Book key={bookId} book={books[bookId]}></Book>
                )}</div>
            )
            : (<div className='not_found'>
                    Ничего не найдено
                </div>)
            }
        </div>
    )
}

function Search(){
    const [value, setValue] = useState('')

    return (
        <form>
            <CustomInput
                value={value}
                placeholder="Поиск книг"
                onChange={(event) => setValue(event.target.value)}
                className="textarea"
                name="text"
            ></CustomInput>

            <Button
                title = "Поиск"
                href = {"/search/" + value}
            > </Button>
        </form>
    )
}

export default Search;