const Note = require('../Models/notes')

module.exports = function (req, res) {
    console.log(req.body);
    console.log("POST /addNote")

    var sample_note = new Note(req.body);

    // save entry to database
    sample_note.save(function (err, book) {
        if (err) {
            res.send("500 Internal Server Error")
            res.status(500)
        } else {
            console.log("Entry interted in DB succesfully");
        }
    });

    res.send("Note saved successfully")
}