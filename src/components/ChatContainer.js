import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send'
import ChatMessage from './ChatMessage';
import './ChatContainer.css';
import Picker from 'emoji-picker-react';

const ChatContainer = () => {

    const [ message, setMessage ] = useState('');
    const [ openEmojiBox, setOpenEmojiBox ] = useState(false);

    return (
        <div className='chat-container'>
            <div className='chat-container-header'>
                <div className='chat-user-info'>
                    <div className='chat-user-img'>
                        <img src='./user.jpeg' alt='' />
                    </div>
                    <p>Jon Snow</p>
                </div>
                <div className='chat-container-header-btn'>
                    <MoreVertIcon/>
                </div>
            </div>

            {/* chat-display-container */}

            <div className='chat-display-container'>
                <ChatMessage message="L'hiver vient! On doit secourir les sauvageons sinon ils rejoindront tous l'armée des morts 🥶." time='21-11-2022' />
                <ChatMessage message="L'armée de QUOI? Tu perds déjà la tête Jon Snow." time='21-11-2022' />
                <ChatMessage message="Je les ai vu de mes propres yeux cette armée des marcheurs blancs à Durlieu." time='21-11-2022' />
            </div>

            {/* chat-input */}
            <div className='chat-input'>
                {/* Buttons */}
                { openEmojiBox && <Picker onEmojiClick={(event, emojiObject) => setMessage(message + emojiObject.emoji)} /> }
                <div className='chat-input-btn'>
                    <InsertEmoticon onClick={ () => setOpenEmojiBox(!openEmojiBox) } />
                    <AttachFileIcon/>
                </div>
                {/* Text input element */}
                <form>
                    <input type='text' placeholder='Type a message' value={message} 
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }} 
                    />
                </form>
                {/* Send Button */}
                <div className='chat-input-send-btn'>
                    <SendIcon/>
                </div>
            </div>
        </div>
    );
};

export default ChatContainer;