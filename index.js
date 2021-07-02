
require('dotenv').config()

const dbConnect = require('./src/lib/db')
const server = require('./src/server')

const listenServer = function () {
  return new Promise((resolve, reject) => {
    server.listen(8080, () => {
        console.log('Server Up')
        resolve()
    })
  })
}

async function main () {
  await dbConnect()
  await listenServer()
}

main()
.then(() => {
    console.log('API Ready')
})
.catch(error => {
    console.error('Error: ', error)
})
