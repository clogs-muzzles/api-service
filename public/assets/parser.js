// parser.js
const Ajv = require('ajv');
const ajv = new Ajv();

const expect = require('expect.js');
const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath));

const validate = (data) => {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    console.error('Validation failed:', ajv.errors);
    throw new Error('Invalid data');
  }
};

const parse = (data) => {
  validate(data);
  return ajv.compile(schema);
};

module.exports = { parse };