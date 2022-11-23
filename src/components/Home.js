import React from 'react';
import '../components/Home.css'
import Sidebar from './Sidebar';

function Home({ currentUser, signOut }){
    return (
        <div className='home'>
            <div className='home-container'>
                {/*Sidebar*/}
                <Sidebar currentUser={currentUser} signOut={signOut} />
                {/*a container with whatsapp logo*/}
                <div className='home-bg'>
                    <img src='./whatsAppbg.png' alt='' />
                </div>
            </div>
        </div>
    );
}

export default Home;