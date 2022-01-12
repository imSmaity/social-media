import React from 'react'
import {Header, Navbar} from '../../components/components'


function Home() {
    return (
        <div className='row'>
            <div className='col-12'>
                <Header/>
            </div>
            <div className='col-3'>
                <Navbar/>
            </div>
            <div className='col-md-6 col-12'>
                News Feed
            </div>
            <div className='col-3'>
                Followers
            </div>
        </div>
    )
}

export default Home
