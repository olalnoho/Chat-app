import React, { useEffect, useState, useContext } from 'react'
import io from 'socket.io-client'
import { SocketContext } from '../context/SocketContext'
import Chat from './Chat'
const Namespace = () => {
   const [socket, setSocket] = useState()
   const [currentNamespace, setCurrentNamespace] = useState('/wiki')
   const [roomData, setRoomData] = useState([])
   const { namespaceData } = useContext(SocketContext)
   const [activeRoom, setActiveRoom] = useState({})

   useEffect(() => {
      let skt = io(`http://localhost:4000${currentNamespace}`, {
         query: {
            username: localStorage.getItem('name')
         }
      })
      skt.on('roomList', setRoomData)
      setSocket(skt)
      return () => skt.close()
   }, [currentNamespace])

   let savedNS = localStorage.getItem('currNS')
   let savedRoom = localStorage.getItem('currRoom')

   useEffect(() => {
      if (savedNS) {
         setCurrentNamespace(savedNS)
      }
   }, [savedNS])

   useEffect(() => {
      if (savedRoom && socket) {
         socket.emit('initJoin', savedRoom, room =>
            setActiveRoom(room)
         )
      }
   }, [socket, savedRoom])

   return (
      <>
         <div className="namespaces">
            {namespaceData && namespaceData.map(ns => {
               return <img
                  className={`namespaces--img ${savedNS === ns.endpoint ? 'active-ns' : ''}`}
                  src={ns.img}
                  alt="ns avatar"
                  key={ns.endpoint}
                  onClick={e => {
                     const imgs = Array.from(document.querySelectorAll('.namespaces--img'))
                     imgs.forEach(imgs => {
                        imgs.classList.remove('active-ns')
                     })
                     e.target.classList.add('active-ns')
                     setCurrentNamespace(ns.endpoint)
                     localStorage.setItem('currNS', ns.endpoint)
                     localStorage.removeItem('currRoom')
                     setActiveRoom({})
                  }}
               />
            })}
         </div>
         <div className="rooms">
            {roomData.length && <>
               <ul className="room-list">
                  {roomData.map(room =>
                     <li
                        key={room.roomId}
                        onClick={e => {
                           localStorage.setItem('currRoom', room.roomTitle)
                           socket.emit('joinRoom', room.roomTitle, room =>
                              setActiveRoom(room)
                           )
                        }}>
                        {room.roomTitle}
                     </li>
                  )}
               </ul>
            </>}
         </div>
         <div className="chat-window">
            {socket && <Chat socket={socket} activeRoom={activeRoom} />}
         </div>
      </>
   )
}

export default Namespace
