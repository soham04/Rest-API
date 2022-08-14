const Note = require('../models/Note')

module.exports = function (req, res) {

    console.log(req.query.query);
    console.log("DELETE /updateNote")

    let id = req.query.id
    console.log(id);

    Note.findByIdAndDelete(id).then(function () {
        console.log("Data deleted"); // Success
        res.send("Note Deleted")

    }).catch(function (error) {
        console.log(error); // Failure
    });

}