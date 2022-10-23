const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const movieRoute = require('./routes/movieRoute');

const PORT = 3000;

app.use(bodyParser.json());

//Route
app.use('/api/user', userRoute);
app.use('/api/movie', movieRoute);

app.use(express.json());

app.listen(PORT, () => console.log("Server running on " + PORT));