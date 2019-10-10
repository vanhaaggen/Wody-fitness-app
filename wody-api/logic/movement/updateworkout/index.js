const { validate } = require('wody-utils')
const { models: { Workout } } = require('wody-data')

/**
 * Updates workout data.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (workoutId, data) {

    validate.string(workoutId, 'id')

    return (async () => {
        const workout = await Workout.findByIdAndUpdate(workoutId, { $set: data }, { useFindAndModify: false })
        if (!workout) throw new Error(`workout with id ${workoutId} does not exist`)
    })()
}