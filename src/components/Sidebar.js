import React from 'react';
import TollIcon from '@mui/icons-material/Toll';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import './Sidebar.css';
import UserProfile from './UserProfile';

function Sidebar({ currentUser, signOut }) {
    return (
        <div className='sidebar'>
            <div className='sidebar-header'>
                <div className='sidebar-header-img' onClick={signOut}>
                    <img src={currentUser?.photoURL} alt='' />
                </div>
                <div className='sidebar-header-btn'>
                    <TollIcon/>
                    <InsertCommentIcon/>
                    <MoreVertIcon/>
                </div>
            </div>

            <div className='sidebar-search'>
                <div className='sidebar-search-input'>
                    <SearchIcon/>
                    <input type='text' name='Search' placeholder='Search...' />
                </div>
            </div>

            <div className='sidebar-chat-list'>
                <UserProfile name='John Snow' photoURL='./Jon_Snow.png'/>
                <UserProfile name='Arya Stark' photoURL='./Arya_Stark.jpeg'/>
                {/* <UserProfile name='Sandor Clegane' photoURL='./Sandor_Clegane.jpeg'/>
                <UserProfile name='Khal Drogo' photoURL='./Khal_Drogo.jpeg'/>
                <UserProfile name='Missandei' photoURL='./missandei.jpeg'/>
                <UserProfile name='Daenerys Targaryen' photoURL='./daenerys.jpeg'/>
                <UserProfile name='Stannis Baratheon' photoURL='./Stannis.jpeg'/>
                <UserProfile name='Alisser Thorne' photoURL='./Alliser_Thorne.jpeg'/>
                <UserProfile name='Tyrion Lannister' photoURL='./Tyrion-lannister.jpeg'/>
                <UserProfile name='Karl le Tanner' photoURL='./Karl-Tanner.jpeg'/>
                <UserProfile name='Samwel Tarly' photoURL='./Samtarly.jpeg'/> */}
            </div>
        </div>
    );
}

export default Sidebar;