const Note = require('../Models/notes')

module.exports = async function (req, res) {
    console.log(req.query.id);
    await Note.findById(req.query.id).then(async (note) => {

        console.log(note);
        res.send(note)
    })
}
