const express = require('express')
const storage = require('../repositories/storage')
const getStats = require('../services/stats')
const { validateResourceMW, validateIdMW } = require('../services/validateMW')
const { editNoteSchema, newNoteSchema } = require('../services/validators')
const router = express.Router();

router.patch('/:id', validateResourceMW(editNoteSchema), validateIdMW, (req, res) => {
    const { name, category, content, isActive } = req.body
    const editedNote = storage.editNote(req.params.id, name, category, content, isActive)
    res.json(editedNote)
})

router.post('/', validateResourceMW(newNoteSchema), (req, res) => {
    const { name, category, content } = req.body
    const newNote = storage.addNote(name, category, content)
    res.json(newNote)
})

router.get('/stats', (req, res) => {
    const stats = getStats()
    res.json(stats)
})

router.get('/:id', validateIdMW, (req, res) => {
    const note = storage.getNoteById(req.params.id)
    res.json(note)
})

router.delete('/:id', validateIdMW, (req, res) => {
    storage.deleteNote(req.params.id)
    res.send("Note was deleted sucessfully")
})

router.get('/', (req, res) => {
    const notes = storage.getNotes()
    res.json(notes)
})

module.exports = router