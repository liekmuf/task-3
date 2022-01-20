const yup = require('yup')
const storage = require('../repositories/storage')
const minNameLength = 3
const minContentLength = 6

const newNoteSchema = yup.object({
    name: yup.string().required().min(minNameLength),
    content: yup.string().required().min(minContentLength),
    category: yup.string().required().oneOf(storage.getCategories())
})

const editNoteSchema = yup.object({
    name: yup.string().required().min(minNameLength),
    content: yup.string().required().min(minContentLength),
    category: yup.string().required().oneOf(storage.getCategories()),
    isActive: yup.boolean().required()
})

module.exports = { newNoteSchema, editNoteSchema }