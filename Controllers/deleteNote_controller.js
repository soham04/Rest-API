const Note = require('../models/Note')

module.exports = function (req, res) {

    console.log(req.body);
    console.log("DELETE /updateNote/")

    let id = req.body.id
    console.log(id);

    Note.deleteOne({ id: id }).then(function () {
        console.log("Data deleted"); // Success
        res.send("Note Deleted")

    }).catch(function (error) {
        console.log(error); // Failure
    });

}