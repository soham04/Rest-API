const mongoose = require('mongoose');

var Schema = mongoose.Schema;


/**
 * Schema for the saving the Notes to the Database
 * database name = ''
 * the table name = ''
 */
const notesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    updationTime: {
        type: Date,
        default: Date.now(),
    }
},
    {
        collection: 'Todos'
    }
);

module.exports = mongoose.model('Note', notesSchema);