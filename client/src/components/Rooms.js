import React, { useState } from 'react'

const Rooms = React.memo(({ rooms, socket }) => {
   const [activeRoom, setActiveRoom] = useState({})

   return (
      <ul className="room-list">
         {rooms.map(room =>
            <li
               key={room.roomId}
               onClick={e => {
                  alert(1)
                  socket.emit('joinRoom', room.roomTitle)
                  setActiveRoom(room)
               }}>
               {room.roomTitle}
            </li>
         )}
      </ul>
   )
})

export default Rooms
