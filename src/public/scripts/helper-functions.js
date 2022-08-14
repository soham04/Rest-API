/**
 * Returns the string in format DAY | DD/MM/YYYY | HH:MM
 * @param {String} updationTime - date in <YYYY-mm-ddTHH:MM:ssZ> format 
 */
 function getDateFormatted(updationTime) {
    console.log(typeof(updationTime));
    let date = new Date(updationTime)

    let Week = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ]
    return Week[date.getDay()] + " | " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " | " + date.getHours() + ":" + date.getMinutes()
}

/**
 * disables the edit note interface of a note
 * @param {String} id - the id of the note to cancel update interface 
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
                updationTime: getDateFormatted(note.updationTime)
            });

            $('#note_list_Container').prepend($(cardHTML))
            console.log(note._id);
            let pHTML = new EJS({ url: '/templates/description' }).render({
                description: note.description,
                id: note._id,
            })

            $(pHTML).insertAfter($('#' + note._id + "-note-preview-header"))

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

/** 
 * Enables the edit interface for an already existing note.
 * @param {String} id - the id of the note to enable edit interface
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
 * Expands the description of the note to view the full description
 * @param {String} id - the id of the note to expand its description
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
