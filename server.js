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
app.use('/academic', require('./routes/api/Accademic_year'));
app.use('/indicator', require('./routes/api/Indicator'));
app.use('/province', require('./routes/api/Province'));
app.use('/district', require('./routes/api/Districts'));




app.get('/', (req, res) => res.send('API Running'));



app.listen(PORT, () => {
    console.log(`🖥️ Server started 🚀  on port ${PORT}`);
});