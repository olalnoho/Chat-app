import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:4000')

export const SocketContext = React.createContext({
   namespaceData: [],
   currentNamespace: '/wiki'
})

export default props => {
   const [namespaceData, setNamespaceData] = useState([])
   const [currentNamespace, setCurrentNamespace] = useState('/wiki')
   useEffect(() => {
      socket.on('namespaceData', getNameSpaceList)
      return () => socket.off('namespaceData', getNameSpaceList)
   }, [])

   const getNameSpaceList = data => {
      setNamespaceData(data)
   }

   return <SocketContext.Provider value={{ namespaceData, currentNamespace, setCurrentNamespace, setNamespaceData }}>
      {props.children}
   </SocketContext.Provider>
}