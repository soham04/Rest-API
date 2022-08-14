const mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

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
const NoteSchema = new Schema({
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

NoteSchema.plugin(mongoose_delete);

module.exports = mongoose.model('Note', NoteSchema);