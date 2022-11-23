import React from 'react';
import db, { auth, googleProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';

import './Login.css';

const Login = ({ setUser }) => {

    const navigate = useNavigate();

    const signInWithGoogle = () => {
        auth.signInWithPopup(googleProvider)
        .then((result) => {
            const newUser = {
                fullname: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL
            }
            navigate('/');
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            db.collection('users').doc(result.user.email).set(newUser);
            // console.log(newUser);
        })
        .catch((error) => alert(error.message));
    }

    return (
        <div className='login'>
            <div className='login-container'>
                <img src='./whatsapp-icon.png' alt='' className='login-logo' />
                <p className='login-name'>Whatsapp Web</p>
                <button className='login-btn' onClick={signInWithGoogle}>
                    <img src='google-logo.png' alt='login with google'/> Se connecter avec Google
                </button>
            </div>
        </div>
    );
};

export default Login;