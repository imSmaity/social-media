import React from 'react'
import {PostWrite} from '../../components/components'
import './home.css'
import WhatsHappening from './WhatsHappening'


function Home() {
    return (
        <>
            <div className='col-lg-6 col-12 bsh'>
                <h4>Home</h4>
                <PostWrite/>
                <WhatsHappening/>
            </div>
        </>
    )
}

export default Home
