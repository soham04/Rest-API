const Note = require('../models/Note')

module.exports = async function (req, res) {
    console.log(req.query.id);
    await Note.findById(req.query.id).then(async (note) => {

        console.log(note);
        res.send(note)
    }).catch(function (error) {
        next(error)
    });
}
