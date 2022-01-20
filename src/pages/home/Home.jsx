import React from 'react'
import {Navbar, PostWrite, Search} from '../../components/components'
import './home.css'

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
            </div>
            <div className='col-3'>
                <Search/>
                <p>Who to follow</p>
            </div>
        </div>
    )
}

export default Home
