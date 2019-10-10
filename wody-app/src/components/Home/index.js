import React, { useState, useEffect } from 'react'

import Countdown from 'react-countdown-now'
import './index.sass'
import logic from '../../logic'
import { Route, withRouter } from 'react-router-dom'
import GenerateWorkout from '../GenerateWorkout'
import HomeNavigation from '../HomeNavigationBar'
import ReactPlayer from 'react-player'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import isUserLoggedIn from '../../logic/is-user-logged-in'



export default withRouter(function ({ history, onLogout }) {
    const [storedWorkout] = useState(JSON.parse(sessionStorage.getItem("my-current-workout")))
    const [user, setUser] = useState()
    const [navBar, setNavBar] = useState(false)
    const [timer, setTimer] = useState('noTimer')
    const [home, setHome] = useState(true)
    const [workoutButton, setWorkoutButton] = useState('start-workout')
    const [favorite, setFavorite] = useState(false)
    const [startTime, setStartTime] = useState()
    const [tSpent, setTSpent] = useState()



    useEffect(() => {
        (async () => {
            const userdata = await logic.retrieveUser()
            setUser(userdata)
        })()
    }, [history.location])

    useEffect(() => {
        (async () => {
            if (storedWorkout) {
                setHome(false)
                const workoutIdSession = String(JSON.parse(sessionStorage.getItem("my-current-workout")).user._id)
                const response = await logic.retrieveFav()
                const favInHistoric = response.find(item => String(item._id) === workoutIdSession)
                favInHistoric !== undefined && setFavorite(true)
            }
        })()
    }, [])

    const handleSaveWorkout = async () => {
        try {

            if (!user.current.length) {
                await logic.toogleFav(JSON.parse(sessionStorage.getItem("my-current-workout")).user._id)
                setFavorite(true)

            } else if (user.current.length > 0) {
                const workoutId = user.current[0]._id.toString()
                await logic.toogleFav(workoutId)
                setFavorite(true)
            }

        } catch ({ message }) {
            console.log(message)
        }
    }

    const handlegoBackHome = () => {
        setHome(true)
        setFavorite(false)
        setTimer('noTimer')
        setWorkoutButton('start-workout')
        sessionStorage.removeItem('my-current-workout')
    }

    const handleNavClick = (event) => {
        event.preventDefault()
        setNavBar(!navBar)

    }

    const handleCalculateWorkout = (event) => {
        event.preventDefault()
        setHome(false)

    }

    //timer function
    const startClock = ({ seconds, completed }) => {
        setTimer('timer')
        setWorkoutButton('workout-done')
        if (completed) {
            {
                setTimeout(() => {
                    setTimer('start')
                }, 1500)
            }
            return <span className="time-go">GO</span>

        } else {
            return <span className="time-red">{seconds}</span>
        }
    }

    const Finished = () => {
        return <div className="time-container">
            <p className="time">Finished</p>
            <p className="time-info">{`in ${tSpent} min`}</p>
        </div>
    }


    const timeRemain = ({ minutes, seconds, completed }) => {
        if (completed) {
            setTimeout(() => {
                setHome(false)
            }, 1000)
            return <Finished />

        } else {
            return <span className="time">{minutes}:{seconds}</span>
        }
    }

    const stopClock = async () => {

        const endTime = new Date().toString().slice(19, 24).split(':')
        const timeSpent = logic.timeDiff(startTime, endTime)
        const workoutId = JSON.parse(sessionStorage.getItem("my-current-workout")).user._id
        const data = { timefinish: timeSpent }
        setTSpent(timeSpent)
        setTimer('finish')

        try {
            await logic.updateWorkout(workoutId, data)
        } catch ({ message }) {
            console.log(message)
        }
    }

    return <>
        <header className="home-header">
            <div>
                <div className="home-header--logo"></div>
            </div>
            <div>
                <span className="home-header--user-name">Hi, {user && user.name}</span>
            </div>

            {navBar === false && <>
                <div className="iconContainer">
                    <FontAwesomeIcon className="home-header--icon" icon={faBars} onClick={handleNavClick} />
                </div>
            </>}

            {navBar === true && <>
                <div className="iconContainer">
                    <FontAwesomeIcon className="home-header--icon" icon={faTimes} onClick={handleNavClick} />
                </div>
            </>}
        </header>
        {navBar === true && <HomeNavigation onLogout={onLogout} />}

        <section className="mid-container">
            {timer === 'noTimer' && <>
                <div className="text-container">
                    <div className="left-stripe">
                        <h2 className="left-stripe--text">Today is the day you are going to change your path</h2>
                    </div>
                </div>
            </>}

            {timer === 'timer' && <Countdown date={Date.now() + 3000} renderer={startClock} />}
            {timer === 'start' && <Countdown
                date={Date.now() + JSON.parse(sessionStorage.getItem("my-current-workout")).time[0] * 60000}
                onStart={() => {
                    const date = new Date()
                    setStartTime(date.toString().slice(19, 24).split(':'))
                }}
                renderer={timeRemain} />}
            {timer === 'finish' && <Finished />}
        </section>


        <section className="home">
            {home === true && <>
                <div className="warmup-container">
                    <p>THE WARMUP</p>
                    <p>{user && user.name}, it's important to warm up before each workout. Take your time to check this video to get a grasp of what a good warm up could look like.</p>
                    <div className="vid">
                        <ReactPlayer className='react-player' url={'https://youtu.be/9fo-_b_Du5w'} width='100%' height='100%' />
                    </div>
                </div>
                <button className="wody-bttn" onClick={handleCalculateWorkout}>Generate wody</button>
            </>}
            {home === false && <>
                <div className="start-container" >
                    {workoutButton === 'start-workout' ? <button className="workout-bttn" onClick={startClock}>Start workout</button> : <button className={timer === 'finish' ? "no-event" : "event"} onClick={stopClock}>End workout</button>}
                    <div className="saved-bttn__container">
                        {favorite === false && <button className="saved-bttn__container--off" onClick={handleSaveWorkout}>Save wody</button>}
                        {favorite === true && <button className="saved-bttn__container--on">saved</button>}
                    </div>

                </div>
                <GenerateWorkout />
            </>}

        </section>
        <section className="footer-container">
            {home === false ? <FontAwesomeIcon onClick={handlegoBackHome} icon={faTimes} className="cross" /> : ''}
        </section>
    </>
})