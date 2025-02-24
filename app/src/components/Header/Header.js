import React from 'react'
import { useEffect, useState } from 'react'
import '../../styles/Header.css'
import { apiService } from '../../services/BackApi.js'


function Header(){
    const [user, setUser] = useState(null)

    const accessToken = window.localStorage.getItem('ACCESS')

    useEffect(() => {
        if (accessToken) {
        ;(async () => {
            const user = await apiService('user/current/')
            setUser(user)
        })()
    }}, [])

    return (
        <header className='header'>
            <div className='header_start'>
                <a className='title' href='/'> BookList </a>
            </div>
            <div className='header_end'>
                <p className='header_titles'></p>
                <a className='header_titles' href='/'> Главная </a>
                <a className='header_titles' href='/my_books'> Мои книги </a>
                {accessToken ?
                    <a className='header_titles' href='/login' onClick={() => {
                                    window.localStorage.removeItem('ACCESS')
                                    window.location.reload()
                                }}
                        > Выход </a>
                    : <a className='header_titles' href='/login'> Вход </a>
                }
                {accessToken ?
                    <></>
                    : <a className='header_titles' href='/registration'> Регистрация </a>
                }
            </div>
        </header>
    )
}

export default Header;