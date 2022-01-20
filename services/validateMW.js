const storage = require("../repositories/storage")

const validateResourceMW = (resourceSchema) => async(req, res, next) => {
    const resource = req.body
    try {
        await resourceSchema.validate(resource)
        next()
    } catch (e) {
        res.status(400).json({ error: e.errors.join(', ') });
    }
}

const validateIdMW = (req, res, next) => {
    const id = req.params.id
    if (storage.getNoteById(id)) {
        next()
    } else res.status(404).json({ error: "Note not found" });
}


module.exports = { validateResourceMW, validateIdMW }