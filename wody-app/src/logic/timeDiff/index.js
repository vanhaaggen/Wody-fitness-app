/**
 * Returns difference between two times
 * 
 * @param {Array} start
 * @param {Array} end
 * 
 * @returns {string}
 */
export default function (start, end) {
    const diffMin = ((end[0] * 1) - (start[0] * 1)) - 1
    let diffSec = end[1] > start[1] ? ((end[1] * 1) - (start[1] * 1)) : ((-end[1] * 1) + (start[1] * 1))
    return `${diffMin < 0 ? 0 : diffMin}:${diffSec <= 9 ? '0' + diffSec : diffSec}`
}
