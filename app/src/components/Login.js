import React from 'react';
import { useState } from 'react'
import '../styles/Login.css';
import Header from './Header/Header.js';
import EndOfPage from './EndOfPage.js';
import { Button } from "./UI/button/CustomButton";
import { apiService } from '../services/BackApi.js'


function Auth() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleAuth = async () => {
        const response = await apiService(
            'token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: login, password }),
            },
            false
        )
    
        if (response.detail) {
            setError(response.detail)
        } else {
            const { access, refresh } = response
            window.localStorage.setItem('ACCESS', access)
            window.localStorage.setItem('REFRESH', refresh)
            window.location.href = '/'
        }
    }
    

    return (
        <form className="RegistrationForm" style={{marginTop: '3%'}}>
            <div className="RegName">
                Вход
            </div>
            <div className="Text">
                <div>Логин:</div>
                <input type='username' name='username' value={login} onChange={(e) => setLogin(e.target.value)} />
            </div>
            <div className="Text">
                <div>Пароль:</div>
                <input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <a className='header_titles' style={{margin: 0, fontSize: '20px'}} href='/registration'>
                Нет аккаунта? Зарегистрироваться.
            </a>
            <div className="Enter">
                <div className='button'>
                    <Button
                        title = "Войти в аккаун"
                        onClick={handleAuth} 
                    > </Button>
                </div>
                {error && <div className="error">{error}</div>}
            </div>
        </form>
    );
}


export function Login() {
    return (
        <div className='reg_page'>
            <Header />
            <div className='auth'>
                <Auth />
            </div>
            <EndOfPage />
        </div>
    );
}
