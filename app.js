const express = require("express")
const notesRouter = require("./routes/notes")
const app = express()
const PORT = 3000
app.use(express.json())

app.use('/notes', notesRouter);

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`)
})