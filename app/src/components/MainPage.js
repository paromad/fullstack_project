import React from 'react';
import '../styles/MainPage.css';
import Header from './Header/Header.js';
import MainBody from './MainBody/MainBody.js';
import EndOfPage from './EndOfPage.js';

export function MainPage(){
    return (
        <div className='main_page'>
            <MainBody />
            <EndOfPage />
        </div>
    )
}
