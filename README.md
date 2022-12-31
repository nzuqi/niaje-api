# niaje-api

Voice assistant app API powered by OpenAI API

## Getting Started

- Clone this repo
- Run `npm install` to install the dependencies
- Run `node app` or `nodemon app` to launch on your local server
- Test with POST request to `{url}:{port}/api/v1/openai/search` with a JSON body formatted like `{ "q": "Which is the healthiest breakfast ever?" }`
- Modify it however you want

## API status codes

Ignore these, implement your own

- 0 => Request unsuccessful
- 1 => Request successful
- 2 => Validation error
- 3 => Authentication token is required/invalid
- 4 => Application error
- 5 => Not found
- 6 => Account not verified

## References

- https://www.npmjs.com/package/openai-api
- https://github.com/amrrs/chatgpt-clone
