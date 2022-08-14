
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
                    updationTime: note.updationTime
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
 * Expands the description of the note to view the full description
 */
function readMore(id) {
    var dots = document.getElementById(id + "-dots");
    var moreText = document.getElementById(id + "-more");
    var btnText = document.getElementById(id + "-readMore");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}

/** 
 * Enables the user to edit an already existing note.
*/
function editNote(id) {

    axios.get('/getNote', {
        params: {
            id: id,
        }
    })
        .then(function (response) {
            // handle success
            console.log(response.data);

            let note = response.data;
            console.log($('#newNoteTitle'));

            $("#" + id + "-title").remove()
            $("#" + id + "-description").remove()
            $("#" + id + "-readMore").remove()
            $("#" + id + "-edit-button").remove()


            var $titleInput = $("<input>", { id: id + "-title", val: note.title });
            var $descriptionInput = $("<textarea>", { id: id + "-description", val: note.description, cols: '40', rows: '5' });
            var $updateButton = $("<button>", { id: id + "-update-button", onclick: "updateNote('" + id + "')", html: "UPDATE" })
            var $cancelButton = $("<button>", { id: id + "-cancel-button", onclick: "cancelUpdate('" + id + "')", html: "CANCEL" })

            $titleInput.insertBefore("#" + id + "-updationTime")
            $descriptionInput.insertBefore("#" + id + "-updationTime")
            $updateButton.insertBefore("#" + id + "-updationTime")
            $cancelButton.insertBefore("#" + id + "-updationTime")

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

/**
 * Updates the notes edited by the user in the Database by calling
 * the PATCH Method of the Backend API
 * @PATCH /updateNote/$id
 * where id = ID of the note to be updated
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
 * disables the edit note option
 */
function cancelUpdate(id) {
    $('#' + id).remove()

    axios.get('/getNote', {
        params: {
            id: id,
        }
    })
        .then(function (response) {
            // handle success
            console.log(response.data);

            let note = response.data;
            let cardHTML = new EJS({ url: '/templates/note-preview' }).render({
                id: note._id,
                title: note.title,
                updationTime: note.updationTime
            });

            $('#note_list_Container').prepend($(cardHTML))
            console.log(note._id);
            let pHTML = new EJS({ url: '/templates/description' }).render({
                description: note.description,
                id: note._id,
            })

            $(pHTML).insertBefore($('#' + note._id + "-updationTime"))

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

/**
 * Delete the note with given ID
 * It is called by a specific note
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


