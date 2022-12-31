const Promise = require('promise');
const Common = require('../utils/common');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.NIAJE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.search = async (req, res) => {
    const { q } = req.body;
    // validate request
    if (!q) return res.status(400).send({
        status: 2,
        message: "Required parameter missing",
        data: null,
    });
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: q,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
    });
    // console.log(completion.data.choices[0].text);

    res.status(200).send({
        status: 1,
        message: "Success",
        data: completion.data.choices[0].text || '',
        // data: completion.data,
    });
}