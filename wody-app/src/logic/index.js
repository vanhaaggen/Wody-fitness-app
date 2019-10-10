import registerUser from './register-user'
import authenticateUser from './authenticate-user'
import isUserLoggedIn from './is-user-logged-in'
import logUserOut from './log-user-out'
import retrieveUser from './retrieve-user'
import updateUser from './update-user'
import claculateWorkout from './calculate-workout'
import retrieveFav from './retrieve-fav-workout'
import toogleFav from './toogle-fav-workout'
import timeDiff from './timeDiff'
import updateWorkout from './update-workout'

export default {
    set __token__(token) {
        sessionStorage.token = token
    },

    get __token__() {
        return sessionStorage.token
    },

    registerUser,
    authenticateUser,
    isUserLoggedIn,
    logUserOut,
    retrieveUser,
    updateUser,
    claculateWorkout,
    retrieveFav,
    toogleFav,
    timeDiff,
    updateWorkout
}