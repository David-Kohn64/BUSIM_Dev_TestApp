const express = require('express')
const http = require('http')
const { clearInterval } = require('timers')
const { WebSocketServer } = require('ws')

const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server })

let counter = 0
let randomCounter = 0
let increment = 0
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
        else if(m.toString() == "random"){
            console.log("Random")
            random(-10, 10)
        }
        else if(m.toString() == "increment"){
            console.log("Increment")
            incrementValue()
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
        client.send(JSON.stringify({ type: "counter", value: counter }))
    })
}

function random(min, max){
    randomCounter += Math.floor(Math.random() * (max - min + 1) + min)
    wss.clients.forEach((client) => {
        client.send(JSON.stringify({ type: "random", value: randomCounter}))
    })
}

function incrementValue(){
    increment += counter
    wss.clients.forEach((client) =>{
        client.send(JSON.stringify({ type: "increment", value: increment}))
    })
}

const PORT = 3001
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

