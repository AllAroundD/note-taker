const express = require("express")
const fs = require("fs")
const path = require("path");
const app = express()
const PORT = process.env.PORT || 3000
const fileName = 'db/db.json'
// look in 'public' FIRST and serve any static file
app.use(express.static('public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// function to read JSON note file
function loadNoteList(){
    const loadNotes = JSON.parse( fs.readFileSync( fileName, 'utf8') )
    return loadNotes
}

// function to write back to the JSON file
function saveNoteList(){
    fs.writeFileSync( fileName, JSON.stringify( noteList ) )
}

// load the Note list from file
let noteList = loadNoteList()

// API routes
// GETs
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})
app.get('/api/notes', function(req, res) {
    console.log('[GET /api/notes/]')
    res.send( noteList )
})
// If no matching route is found default to index
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
// POST
app.post('/api/notes', function(req, res) {
    let newNote = req.body
    // Create unique id by using date
    newNote.id = Date.now()
    // Add the note to the array
    noteList.push(newNote)
    saveNoteList()
    console.log( `[POST /api/notes/] Saved Note id:${newNote.id}` )
    res.send( newNote )
})
// DELETE
app.delete( '/api/notes/:id', function( req, res ){
    const noteId = req.params.id
    noteList = noteList.filter( note=>note.id != noteId )
    saveNoteList()
    console.log(`[DELETE /api/notes/] deleted Note id:${noteId}` )
    res.send( { id: noteId, message: 'Delete successful', statue: true } )
})

// listen to port
app.listen( PORT, function(){
    console.log( `App listening on PORT: ${PORT}`)
})