const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;


// middleware of packages
app.use(morgan("dev"));
// work with body parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// Define Routes
app.use('/districts', require('./routes/api/Districts'));
app.use('/pillars', require('./routes/api/Pillars'));
app.use('/users', require('./routes/api/Users'));




app.get('/', (req, res) => res.send('API Running'));



app.listen(PORT, () => {
    console.log(`🖥️ Server started 🚀  on port ${PORT}`);
});