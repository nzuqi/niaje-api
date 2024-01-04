const { OpenAI } = require("openai");
const Common = require('../utils/common');

const openai = new OpenAI({ apiKey: process.env.NIAJE_OPENAI_API_KEY, });

exports.search = async (req, res) => {
    let { q } = req.body;
    // validate request
    if (!q) return res.status(400).send({
        status: 2,
        message: "Required parameter missing, please check & try again.",
        data: null,
    });

    if (!Common.defaults.sentence_suffixes.includes(q.slice(-1))) q = `${q}.`;

    openai.chat.completions.create({
        messages: [
            // { role: "system", content: q },
            { role: "user", content: q }
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.2,
        max_tokens: 2048,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
        top_p: 1,
    }).then(response => {
        return res.status(200).send({
            status: 1,
            message: "Success",
            data: response.choices[0].message.content || '',
            // raw: response,
        })
    }).catch(err => {
        return res.status(400).send({
            status: 0,
            message: err?.message || "Request failed, please check query & try again.",
            data: null,
        })
    });

}