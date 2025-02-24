import React from 'react';
import { useState } from 'react';
import Header from './Header/Header.js';
import EndOfPage from './EndOfPage.js';
import '../styles/Registration.css';
import { Button } from "./UI/button/CustomButton";
import { apiService } from '../services/BackApi.js';

function RegistrationForm() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = React.useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [error, setError] = useState('')

    const handleRegister = async () => {
        if (!login) {
            setError('Введите логин')
            return
        }

        if (!password) {
            setError('Введите пароль')
            return
        }
    
        if (!firstName) {
            setError('Введите имя')
            return
        }
    
        if (!lastName) {
            setError('Введите фамилию')
            return
        }
    
        setError('')
    
        const formData = new FormData()
    
        formData.set('username', login)
        formData.set('password', password)
        formData.set('first_name', firstName)
        formData.set('last_name', lastName)
        const { result } = await apiService(
            'user/', {
                method: 'POST',
                body: formData,
            },
            false
        )
    
        if (result) {
            setError(result[0])
        }
    }
    

    return (
        <form className="RegistrationForm">
            <div className="RegName">
                Регистрация
            </div>
            <div className="Text">
                <div>Логин:</div>
                <input type='login' name='login' value={login} onChange={(e) => setLogin(e.target.value)} />
            </div>
            <div className="Text">
                <div>Пароль:</div>
                <input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="Text">
                <div>Имя:</div>
                <input type="firstName" name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="Text">
                <div>Фамилия:</div>
                <input type="lastName" name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="Enter">
                <div className='button'>
                    <Button
                        title = "Зарегистрироваться"
                        onClick={handleRegister} 
                    > </Button>
                </div>
                {error && <div className="error">{error}</div>}
            </div>
        </form>
    );
}


export function Registration() {
    return (
        <div className='reg_page'>
            <Header />
            <div className="auth">
                <RegistrationForm />
            </div>
            <EndOfPage />
        </div>
    );
}
