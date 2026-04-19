# BUSIM_Dev_TestApp
Small test app to familiarize the team with web apps and react

Hey everyone!
Welcome to the dev team! I'm excited to get started with you, and welcome to our test app!

1. server.js
    - This is our backend. It creates a WebSocket server that listens for "start" and "stop" messages from connected clients. When started, it increments a shared counter every second and broadcasts the updated value to all connected browser tabs in real time.
2. App.js
    - This is our frontend (React). It connects to the WebSocket server on port 3001 and sends "start" or "stop" when the button is held or released. The counter updates in real time as the server broadcasts new values.
