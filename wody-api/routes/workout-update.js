const logic = require('../logic')

module.exports = function (req, res) {
    const { params: { workoutId }, body } = req

    try {
        logic.updateWorkout(workoutId, body)
            .then(() => res.json({ message: 'workout correctly updated' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}