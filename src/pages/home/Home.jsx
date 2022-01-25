import React from 'react'
import {Navbar, PostWrite, UserList} from '../../components/components'
import './home.css'
import WhatsHappening from './WhatsHappening'


function Home() {
    return (
        <div className='row'>
            <div className='col-3 '>
                <img id='icon' src={require('../../Assets/images/dove.png')} alt="Logo" />
                <Navbar/>
            </div>
            <div className='col-md-6 col-12 bsh'>
                <h4>Home</h4>
                <PostWrite/>
                <WhatsHappening/>
            </div>
            <div className='col-3'>
                <UserList/>
            </div>
        </div>
    )
}

export default Home
