const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const thread = require('./routes/threadRoute')
const comment = require('./routes/commentRoute')
const path = require('path')

require('dotenv').config()
const PORT = process.env.PORT || 3001

mongoose.Promise = global.Promise
dbURL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.u079k.mongodb.net/forum-app?retryWrites=true&w=majority`

mongoose.connect(dbURL)
 .catch((err) => console.log(err.message))

app.use(cors())
app.use(express.json()) //parse the request coming from the front-end
app.use('/api/thread', thread)
app.use('/api/comment', comment)

if(process.env.NODE_ENV === 'production'){
        app.use(express.static('client/build'))
        app.get('*', (req,res) =>{
                res.sendFile(path.resolve(__dirname, 'client' , 'build', 'index.html'))
        })
}



app.listen(PORT, () =>{
        console.log(`Server is listening on port ${PORT}`);
})