import React from 'react'
import { withRouter } from 'react-router-dom'



export default withRouter(function ({ history, onLogout }) {


    const handleGoToFav = (event) => {
        event.preventDefault()
        history.push('/favorites')
    }

    const handleGoToSettings = (event) => {
        event.preventDefault()
        history.push('/settings')
    }


    return <>

        <nav className="nav-container">
            <ul className="nav-container__ul">
                <li className="nav-container__ul-li">
                    <a key={'a-favorite'} className="nav-container__ul-li--style" href="" onClick={handleGoToFav}>Favorite workouts</a>
                </li>
                <li className="nav-container__ul-li mid">
                    <a key={'a-setting'} className="nav-container__ul-li--style" href="" onClick={handleGoToSettings}>Settings</a>
                </li>
                <li className="nav-container__ul-li">
                    <a key={'a-signout'} className="nav-container__ul-li--style" href="" onClick={onLogout}>Sign out</a>
                </li>
            </ul>
        </nav>
    </>

})