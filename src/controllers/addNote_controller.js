const Note = require('../models/Note')

module.exports = function (req, res, next) {
    console.log(req.body);
    console.log("POST /addNote")

    var sample_note = new Note(req.body);

    // save entry to database
    sample_note.save(function (err, book) {
        if (err) {
            next(err)
        } else {
            res.send("Note saved successfully")
            console.log("Entry interted in DB succesfully");
        }
    });

    
}