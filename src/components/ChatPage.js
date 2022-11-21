import React from 'react';
import ChatContainer from './ChatContainer';
import Sidebar from './Sidebar';
import './ChatPage.css';

function ChatPage(){
    return (
        <div className='chatpage'>
            <div className='chatpage-container'>
                {/* Sidebar */}
                <Sidebar/>
                {/* Chat Container */}
                <ChatContainer/>
            </div>
        </div>
    );
}

export default ChatPage;