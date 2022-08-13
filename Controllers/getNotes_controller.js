const Note = require('../Models/Note')

module.exports = async function (req, res) {

    function reducer(currentValue, index, arr) {
        let id = currentValue._id.valueOf()
        console.log(id);
        currentValue.dd = null
        console.log(currentValue);

    }

    let new_list = []

    await Note.find({}).then(async (tmp) => {
        // await tmp.map(reducer)

        tmp.forEach(element => {
            new_list.push({
                id: element._id.valueOf(),
                title: element.title,
                description: element.description,
                updationTime: element.updationTime,
            })
        });
        console.log(new_list);

    })

    res.send(new_list)
}
