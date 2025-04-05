const connectToMongo = require('./db');
const path = require("path")

connectToMongo();

const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000
const _dirname = path.resolve(); 

app.use(cors())
app.use(express.json()); //This is a middleware which is used to print the body

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.use(express.static(path.join(_dirname,"/frontend/build")));
app.get('*', (_, res)=>{
  res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`iNotebook BackEnd is listening on port ${port}`)
})