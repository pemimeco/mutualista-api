const express = require('express')
const path = require('path')
const morgan = require('morgan')

//initializations
const app = express()
require('./database') //conexion a la bd 

//settings
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use('/', require('./routes/routes'))
// app.use('/photos', express.static(__dirname + '/photos'))

//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})