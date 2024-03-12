'use client'

import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
import ChatBox from './ChatBox';

export default function Chat() {

  //const client = new Ably.Realtime.Promise({ authUrl: '/api/ably' })

  //COLOCAR O CHAT BOX DENTRO DDO ABLY PROVIDER NO RETURN
  //<AblyProvider client={ client }>}        
    //</AblyProvider>
  return (
    <ChatBox></ChatBox>
 
  )
}