const connectToMongo = require('./db');

connectToMongo();

const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use(cors())
app.use(express.json()); //This is a middleware which is used to print the body

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook BackEnd is listening on port ${port}`)
})