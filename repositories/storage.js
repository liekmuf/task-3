const { v4 } = require("uuid")
const initialState = require("./initialstate")

class Storage {
    constructor(initialState = []) {
        this.notes = initialState
        this.categories = ["Task", "Idea", "Random Thought"]
    }

    addNote(name, category, content) {
        const id = v4()
        const created = new Date()
        const newNote = {
            id,
            name,
            created,
            category,
            content,
            isActive: true
        }
        this.notes.push(newNote)
        return newNote
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id)
    }

    editNote(id, name, category, content, isActive) {
        this.notes = this.notes.map(note => {
            if (note.id === id) return {
                ...note,
                name,
                category,
                content,
                isActive
            }
            else return note
        })
        return this.getNoteById(id)
    }

    getNotes() {
        return this.notes
    }

    getCategories() {
        return this.categories
    }

    getNoteById(id) {
        return this.notes.find(note => note.id === id)
    }

    getNotesCount(category, isActive) {
        return this.notes.filter(note => note.category === category)
            .filter(note => note.isActive === isActive).length
    }
}
const storage = new Storage(initialState)
module.exports = storage