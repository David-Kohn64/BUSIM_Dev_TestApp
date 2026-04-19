const express = require('express')
const http = require('http')
const { clearInterval } = require('timers')
const { WebSocketServer } = require('ws')

const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server })

let counter = 0
let interval

wss.on('connection', (ws) => {
    console.log("User connected")

    ws.on('message', (m) => {
        if(m.toString() == "start"){
            console.log("Started counter")
            interval = setInterval(count, 1000)
        }
        else if(m.toString() == "stop"){
            console.log("Stoppped counter")
            clearInterval(interval)
        }
    })

    ws.on('close', () => {
        console.log("User closed")
    })
})

function count() { //increments counter and send updated data to all clients
    counter++
    console.log(counter)
    wss.clients.forEach((client) => {
        client.send(counter)
    })
}

const PORT = 3001
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

