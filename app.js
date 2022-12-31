const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config({ path: __dirname + '/.env' });
const Common = require("./app/utils/common");

const app = express();

app.use(cors());

// use middleware to check headers
app.use(Common.middleware.checkHeaders);

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// use middleware to check token
app.use(Common.middleware.checkToken);

const db = require("./app/models");
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database.");
}).catch(err => {
    console.log("Cannot connect to the database: ", err);
    process.exit();
});

require("./app/routes/openai.routes")(app);

const startServer = () => {
    const http = require('http');
    const https = require('https');
    const fs = require('fs');

    const PORT = process.env.NIAJE_PORT;
    if (process.env.NIAJE_ENV === 'prod') {
        const httpsOptions = {
            key: fs.readFileSync(process.env.NIAJE_API_PRIV_KEY, 'utf8'),
            cert: fs.readFileSync(process.env.NIAJE_API_CERT, 'utf8')
        };
        https.createServer(httpsOptions, app).listen(PORT, () => {
            console.log(`Niaje API is running on port '${PORT}', '${process.env.NIAJE_ENV}' environment.`);
        });
        return;
    }
    http.createServer(app).listen(PORT, () => {
        console.log(`Niaje API is running on port '${PORT}', '${process.env.NIAJE_ENV}' environment.`);
    });
};

startServer();