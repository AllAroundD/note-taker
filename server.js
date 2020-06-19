const express = require("express")
const fs = require("fs")

const app = express()
const PORT = process.env.PORT || 3000

// look in 'html' FIRST and serve any static file
app.use(express.static('public'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const fileName = 'db/db.json'
let noteList = loadNotes()

function loadNotes(){
    const loadNotes = JSON.parse( fs.readFileSync( fileName, 'utf8') )
    return loadNotes
}

// API routes
app.get('/api/notes/', function(req, res) {
    console.log('[GET /api/notes/]')
    res.send( noteList )
})

// app.post()

// listen to port
app.listen( PORT, function(){
    console.log( `App listening on port: ${PORT}`)
})