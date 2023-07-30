import * as React from 'react';
import usePeer from '@/hooks/usePeer';
import useRemoteStreams from '@/hooks/useRemoteStream';
import useUserMedia from '@/hooks/useUserMedia';
import Live from '@/components/live/live';
import { useCallback } from 'react';
import Lobby from '@/components/lobby/lobby';

export interface IMeetingPageProps {
}

export default function MeetingPage (props: IMeetingPageProps) {
    const localstream = useUserMedia();

    const [remoteStreams, addRemoteStream, removeRemoteStream] = useRemoteStreams();

    const [myPeer, myPeerID] = usePeer(addRemoteStream, removeRemoteStream);

    const [yourID, setYourID] = React.useState<string>("");

    const hangUp = async () => {
        
      } 
      const sendMessage = useCallback(
        (message: string) => {
        },
        [myPeer]
    )

    const joinMetting =  () => {

         let call = myPeer.call(yourID, localstream);
         call.on('stream', (remoteStream:any) => {
            addRemoteStream(remoteStream, call.peer);
            console.log('Connected to ' + call.peer);
          });
      
          call.on('close', () => {
            console.log("call closed");
            removeRemoteStream(call.peer);
            call.close();
          });
      
          call.on('error', (error:any) => {
            console.log("call error", error);
            removeRemoteStream(call.peer);
            call.close();
          });
      }
    

  return (
    <div>
            <Live disconnect={hangUp} messages={""} myPeerId={myPeerID} myStream={localstream} remoteStreams={remoteStreams} sendMessage={sendMessage} />
            {/* <Lobby myStream={localstream} peersOnlineCount={5} myPeerId={myPeerID} join={joinMetting} /> */}
           <input  type="text" value={yourID} onChange={event => setYourID(event.target.value)} />
              <button onClick={joinMetting}>Join</button>
    </div>
  );
}
