import React, { useState, useEffect } from 'react';
import { getRandomId } from '@/ultis/meeting';

const audioOnlyConfig = { audio: true, video: false };
const userMediaConfig = {
    audio: { echoCancellation: true, noiseSuppression: true },
    video: { facingMode: 'user' },
};

const config = { iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }] };

const localConfig = {
    secure: true,
    config,
    debug: 0, // from 0 up to 3
};

export default function usePeer(addRemoteStream: any, removeRemoteStream: any) {
    const [myPeer, setPeer]: any = useState(null);
    const [myPeerID, setMyPeerID] = useState(null);

    const cleanUp = () => {
        if (myPeer) {
            myPeer.disconnect();
            myPeer.destroy();
        }
        setPeer(null);
        setMyPeerID(null);
    };

    useEffect(() => {
        import('peerjs')
            .then(({ default: Peer }) => {
                const peer = myPeer ? myPeer : new Peer(getRandomId(), localConfig);

                peer.on('open', () => {
                    console.log('peer open', peer);
                    setPeer(peer);
                    setMyPeerID(peer.id);
                });

                peer.on('call', (call: any) => {
                    console.log('receiving call from ' + call.peer);

                    navigator.mediaDevices
                        .getUserMedia(userMediaConfig)
                        .then((stream) => {
                            // Answer the call with an A/V stream.
                            call.answer(stream);

                            // Play the remote stream
                            call.on('stream', (remoteStream: any) => {
                                addRemoteStream(remoteStream, call.peer);
                            });

                            call.on('close', () => {
                                console.log('The call has ended');
                                removeRemoteStream(call.peer);
                            });

                            call.on('error', (error: any) => {
                                console.log(error);
                                removeRemoteStream(call.peer);
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });

                peer.on('disconnected', () => {
                    console.log('Peer desconnected');
                    cleanUp();
                });

                peer.on('close', () => {
                    console.log('Peer closed remotetly');
                    cleanUp();
                });

                peer.on('error', (error: any) => {
                    console.log('peer error', error);
                    cleanUp();
                });
            })
            .catch((error) => {
                console.log(error);
            });

        return () => {
            cleanUp();
        };
    }, []);

    return [myPeer, myPeerID];
}
