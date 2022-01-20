const storage = require("../repositories/storage")

const getStats = () => {
    const stats = storage.categories.map(category => [category, {
        active: storage.getNotesCount(category, true),
        archive: storage.getNotesCount(category, false)
    }])
    return Object.fromEntries(stats)

}
module.exports = getStats