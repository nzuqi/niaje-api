module.exports = app => {
    const openai = require("../controllers/openai.controller.js");

    var router = require("express").Router();

    router.post("/search", openai.search);

    app.use('/api/v1/openai', router);
};