const mongoose = require('mongoose');

var Schema = mongoose.Schema;


/**
 * Schema for the saving the Notes to the Database
 * database name = 'ToDo'
 * the table name = 'Todos'
 * columns 
 * title @string - Title of the note
 * description @string - Complete Note
 * updationTime @Datetime - The last time is was modified
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