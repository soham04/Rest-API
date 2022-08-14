/**
* Function that saves the Note on clicking the 'Add Note' button
* Send a POST request to the backend API to save the Note with 
* the note in Body of requst as JSON.
* @POST /addNote
*/

$("#newNoteSubmit").click(function () {
    if ($("#newNoteTitle").val() == '' || $("#newNoteDescription").val() == '') {
        $("#newNoteSubmit").after('<br>Title or Description empty')
    }
    else {

        let note = {
            title: $("#newNoteTitle").val(),
            description: $("#newNoteDescription").val(),
            updationTime: Date.now()
        }

        axios.post('/addNote', note)
            .then(function (response) {
                console.log(response);
                $('#note_list_Container').empty()
                fillNotes()
            })
            .catch(function (error) {
                console.log(error);
            });

        $('#newNoteTitle').val("");
        $('#newNoteDescription').val("");


    }


})


/**
* Function that loads the existing Notes from Database 
* immediately after a page has been loaded
*
* # Step 1: Get all the existing Notes from database.
* # Step 2: Loop through data array and render the 'note-preview' 
* template for each note and prepend to the container.
* # Step 3: During each iteration we are also rendering the paragraph template seperately.
* 
* sends a GET request to the backend API
* @GET /getNotes returns JSON Array containing all the saved notes
*
*/
function fillNotes() {
    axios.get('/getNotes')
        .then(function (response) {

            response.data.forEach(note => {

                let cardHTML = new EJS({ url: '/templates/note-preview' }).render({
                    id: note.id,
                    title: note.title,
                    updationTime: getDateFormatted(note.updationTime)
                });

                $('#note_list_Container').prepend($(cardHTML))

                let pHTML = new EJS({ url: '/templates/description' }).render({
                    description: note.description,
                    id: note.id,
                })

                $(pHTML).insertAfter($('#' + note.id + "-note-preview-header"))
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

/**
 * Updates the notes edited by the user in the Database by calling
 * the PATCH Method of the Backend API
 * @PATCH /updateNote/$id
 * where id = ID of the note to be updated
 * @param {String} id - the id of the note to update
 */
function updateNote(id) {
    // alert("updating" + id)
    console.log({
        "title": $("#" + id + "-title").val(),
        "description": $("#" + id + "-description").val()
    });
    axios.patch('/updateNote/' + id,
        {
            "title": $("#" + id + "-title").val(),
            "description": $("#" + id + "-description").val()
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error)
        })
}

/**
 * Delete the note with given ID
 * It is called by a specific note
 * @param {String} id - the id of the note to delete
 */
function deleteNote(id) {

    console.log("hi");
    axios.delete('/deleteNote', { params: { id: id } }).then(function (response) {
        console.log(response);
        $('#note_list_Container').empty()
        fillNotes()
    }).catch(function (error) {
        // handle error
        console.log(error);
    })

}