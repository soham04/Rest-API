# w3dev-intern-task



API endpoints : 

1) POST : /addNote - data to be stored in Body of the request 
2) GET : /getNotes - fetch all the notes in the DB
3) GET : /getNote - store note id in the params - fetch note details of a particular note
4) PATCH : /updateNote - store note id in the params and update data in body - update a particular note
5) DELETE : /deleteNote - store note id in the params - delete a particular note

Packages used : 

1) "dotenv": "^16.0.1"
2) "ejs": "^3.1.8",
3) "express": "^4.18.1",
4) "mongoose": "^6.5.1",
5) "mongoose-delete": "^0.5.4"
