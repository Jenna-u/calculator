
const { json } = require('micro')

let id = 0
let records = []

module.exports = async (req, res) => {
  if (req.url === '/add') {
    console.log('request--------', req)
    const record = await json(req)
    records[id++] = record
    return { id }
  } else {
    return records
  }
}
