import React from 'react';
import './styles/App.css';
import Header from './components/Header/Header.js';
import { MainPage } from './components/MainPage.js';
import { MyBooks } from './components/MyBooks.js';
import { Registration } from './components/Registration.js';
import { Login } from './components/Login.js';
import { BookInfo } from './components/BookInfo/BookInfo.js';
import { SearchResult } from './components/MainBody/Search.js';
import {Route, Routes, BrowserRouter} from 'react-router-dom';

function App(){
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='' element={<MainPage />}></Route>
                <Route path='/search/:value' element={<SearchResult />}></Route>
                <Route path='registration' element={<Registration />}></Route>
                <Route path='login' element={<Login />}></Route>
                <Route path='my_books' element={<MyBooks />}></Route>
                <Route path='my_books/:Id' element={<MyBooks />}></Route>
                <Route path='book_info/:bookId' element={<BookInfo />}></Route>
            </Routes>
        </BrowserRouter>
    )
}


export default App;
