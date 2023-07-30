import React, { useEffect, useRef } from 'react'
// import "./remoteStream.scss"

export default function RemoteStream({ remoteStreams }:any) {

  const refsArray:any = useRef([]);

  useEffect(() => {
    remoteStreams.map((streamData:any) =>
      refsArray.current[streamData.peerId].srcObject = streamData.stream)
  }, [remoteStreams])

  return (
    <div className="remote">
      {remoteStreams.map((dataStream:any, i:any, arr:any) =>
        (
          <div key={dataStream.peerId} className={"remote-stream" + `${arr.length > 1 ? " multiple" : " single"}`}>
            <video onContextMenu={event => event.preventDefault()}
              ref={ref => refsArray.current[dataStream.peerId] = ref}
              autoPlay playsInline />
          </div>
        )
      )}
    </div>
  )
}