import React, { useState, useEffect } from 'react'

const Chat = ({ socket, activeRoom }) => {
   const [messageText, setMessageText] = useState('')
   const [allMessages, setAllMessages] = useState([])

   const addMessage = msg => {
      setAllMessages(prev => {
         return [...prev, msg]
      })
   }

   useEffect(() => {
      socket.on('history', setAllMessages)
      socket.on('messageToClients', addMessage)
      return () => {
         socket.off('history', setAllMessages)
         socket.off('messageToClients', addMessage)
         setAllMessages([])
      }
   }, [socket])

   const onSubmit = e => {
      e.preventDefault()
      socket.emit('newMessage', messageText)
      setMessageText('')
   }

   const img = document.querySelector('.active-ns')

   return (
      <>
         <div className="chat-window--header">
            {img && <img alt="currentNS" src={img.getAttribute('src')} />}
            Current Room: {activeRoom.roomTitle ? activeRoom.roomTitle : 'None, select one in the list below'}
         </div>
         {JSON.stringify(activeRoom) !== '{}' && <> <ul className="chat-window--messages">
            {allMessages.map(msg => <li key={msg.id}> <strong> {msg.username} </strong> {msg.text} </li>)}
         </ul>
            <div className="chat-window--chat">
               <form className="chatform" onSubmit={onSubmit}>
                  <input type="text" placeholder="Message goes here..." required value={messageText} onChange={e => setMessageText(e.target.value)} />
                  <input type="submit" value="Send message" />
               </form>
            </div>
         </>}
      </>
   )
}

export default Chat
