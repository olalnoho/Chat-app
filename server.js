const express = require('express')

const app = express()

const server = app.listen(4000)
const namespaces = require('./data')
const io = require('socket.io')(server)

io.on('connection', socket => {
   const namespaceData = namespaces.map(ns => {
      return {
         img: ns.img,
         endpoint: ns.endpoint
      }
   })

   socket.emit('namespaceData', namespaceData)
})

namespaces.forEach(namespace => {
   io.of(namespace.endpoint).on('connection', nsSocket => {
      nsSocket.emit('roomList', namespace.rooms)
      nsSocket.on('joinRoom', (room, fn) => {
         const prevRoom = Object.keys(nsSocket.rooms)[1]
         if (prevRoom) {
            nsSocket.leave(prevRoom)
         }
         nsSocket.join(room)
         const roomIn = namespace.rooms.find(nsroom => nsroom.roomTitle === room)
         fn(roomIn)
         nsSocket.emit('history', roomIn.history)
      })

      nsSocket.on('initJoin', (room, fn) => {
         nsSocket.join(room)
         const roomIn = namespace.rooms.find(nsroom => nsroom.roomTitle === room)
         fn(roomIn)
         nsSocket.emit('history', roomIn.history)
      })

      nsSocket.on('newMessage', text => {
         const currRoom = Object.keys(nsSocket.rooms)[1]
         const nsRoom = namespace.rooms.find(room => room.roomTitle === currRoom)
         const fullMsg = {
            text,
            time: Date.now(),
            username: nsSocket.handshake.query.username,
            avatar: 'https://via.placeholder.com/30',
            id: nsRoom.history.length * Math.random()
         }
         nsRoom.addMessage(fullMsg)
         io.of(namespace.endpoint).to(currRoom).emit('messageToClients', fullMsg)
      })
   })
})