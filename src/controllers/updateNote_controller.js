const Note = require('../models/Note')

module.exports = function (req, res) {
    console.log(req.body);
    console.log("PATCH /updateNote/" + req.params.id)

    let id = req.params.id
    let update = req.body
    console.log(update);

    Note.findByIdAndUpdate(id, update, { upsert: false }, function (err, doc) {
        if (err) {
            console.log(err);
        }
    })

    res.send("note updated")
}