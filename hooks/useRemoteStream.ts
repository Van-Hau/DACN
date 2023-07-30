import React, { useState, useCallback } from 'react';

export default function useRemoteStreams() {

    const [remoteStreams, setRemoteStreams] = useState<any>([]);

    const addRemoteStream = useCallback(
        (stream, peerId) => {
            setRemoteStreams((remoteStreams:any) => {
                if (!stream || !peerId) return [...remoteStreams];
                if (remoteStreams.some((remote:any) => remote.peerId === peerId)) return [...remoteStreams];
                return [...remoteStreams, { peerId: peerId, stream: stream }]
            })
        },
        [remoteStreams],
    )

    const removeRemoteStream = useCallback(
        peerId => {
            setRemoteStreams((remoteStreams:any) => {
                let index = remoteStreams.findIndex((remote:any) => remote.peerId === peerId);
                if (index < 0) return [...remoteStreams];
                remoteStreams.splice(index, 1);
                return [...remoteStreams]
            })
        },
        [remoteStreams],
    )
    return [remoteStreams, addRemoteStream, removeRemoteStream];
};