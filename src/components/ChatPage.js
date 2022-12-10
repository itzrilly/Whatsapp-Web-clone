import React from 'react';
import ChatContainer from './ChatContainer';
import Sidebar from './Sidebar';
import './ChatPage.css';

function ChatPage({ currentUser, signOut }){
    return (
        <div className='chatpage'>
            <div className='chatpage-container'>
                {/* Sidebar */}
                <Sidebar currentUser={currentUser} signOut={signOut} />
                {/* Chat Container */}
                <ChatContainer currentUser={currentUser} />
            </div>
        </div>
    );
}

export default ChatPage;