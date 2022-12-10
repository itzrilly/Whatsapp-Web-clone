import React, { useEffect, useRef, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send'
// import ChatMessage from './ChatMessage';
import Picker from 'emoji-picker-react';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import firebase from 'firebase';
import ChatMessage from './ChatMessage';

import './ChatContainer.css';

const ChatContainer = ({ currentUser }) => {

    const [ message, setMessage ] = useState('');
    const [ openEmojiBox, setOpenEmojiBox ] = useState(false);
    const { emailID } = useParams();
    const [ chatUser, setChatUser ] = useState({});

    const chatBox = useRef(null);

    const [ chatMessages, setChatMessages ] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const data = await db.collection('users').doc(emailID).onSnapshot((snapshot) => {
                setChatUser(snapshot.data());
            });
        }

        const getMessages = async () => {
            const data = await db.collection('chats').doc(emailID).collection('messages').orderBy('timeStamp', 'asc').onSnapshot(
                (snapshot) => {
                    let messages = snapshot.docs.map((doc) => doc.data());

                    let newMessage = messages.filter((message) => message.senderEmail === (currentUser.email || emailID) || message.receiverEmail === (currentUser.email || emailID));

                    setChatMessages(newMessage);
                }
            )
        }

        getUser();
        getMessages();
    }, [emailID]);

    useEffect(() => {
        chatBox.current.addEventListener('DOMNodeInserted', (event) => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        })
    }, [chatMessages])

    const send = (e) => {
        e.preventDefault();

        if(emailID) {
            let payload = {
                text: message,
                senderEmail: currentUser.email,
                receiverEmail: emailID,
                timeStamp: firebase.firestore.Timestamp.now()
            }

            // SENDER
            db.collection('chats').doc(currentUser.email).collection('messages').add(payload);

            // RECEIVER
            db.collection('chats').doc(emailID).collection('messages').add(payload);

            db.collection('FriendList').doc(currentUser.email).collection('list').doc(emailID).set({
                email: chatUser.email,
                fullname: chatUser.fullname,
                photoURL: chatUser.photoURL,
                lastMessage: message
            });

            db.collection('FriendList').doc(emailID).collection('list').doc(currentUser.email).set({
                email: currentUser.email,
                fullname: currentUser.fullname,
                photoURL: currentUser.photoURL,
                lastMessage: message
            });

            setMessage('');
        }
    }

    return (
        <div className='chat-container'>
            <div className='chat-container-header'>
                <div className='chat-user-info'>
                    <div className='chat-user-img'>
                        <img src={chatUser?.photoURL} alt='' />
                    </div>
                    <p>{chatUser?.fullname}</p>
                </div>
                <div className='chat-container-header-btn'>
                    <MoreVertIcon/>
                </div>
            </div>

            {/* chat-display-container */}

            <div className='chat-display-container' ref={chatBox}>
                {
                    chatMessages.map((message) => (
                        <ChatMessage message={message.text} time={message.timeStamp} sender={message.senderEmail} />
                    ))
                }
                {/* <ChatMessage message="L'hiver vient! On doit secourir les sauvageons sinon ils rejoindront tous l'armée des morts 🥶." time='21-11-2022' />
                <ChatMessage message="L'armée de QUOI? Tu perds déjà la tête Jon Snow." time='21-11-2022' />
                <ChatMessage message="Je les ai vu de mes propres yeux cette armée des marcheurs blancs à Durlieu." time='21-11-2022' /> */}
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
                <form onSubmit={send}>
                    <input type='text' placeholder='Type a message' value={message} 
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }} 
                    />
                </form>
                {/* Send Button */}
                <div className='chat-input-send-btn' onClick={send}>
                    <SendIcon/>
                </div>
            </div>
        </div>
    );
};

export default ChatContainer;