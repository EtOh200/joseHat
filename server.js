const express = require ("express");

const app = express();

const PORT = process.env.PORT || 3000;

const Router = require('./routes');

/* 
Regular body request would require parser.
Since project is strictly server side, not required.  

app.use(express.json());
app.use(express.urlencoded());
*/

app.use('/', Router);

//set as error message for all invalid path
app.use('/', (req, res) => {
  res.sendStatus(404);
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})