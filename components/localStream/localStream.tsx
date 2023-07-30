import useStream from '@/hooks/useStream';
import React, { useEffect } from 'react'
// import "./localStream.scss"

export default function LocalStream({ userMedia, classStyle }:any) {

  const [setLocalStream, localVideoRef, handleCanPlayLocal] = useStream();

  useEffect(() => {
    if (userMedia)
      setLocalStream(userMedia);
  }, [userMedia])

  return (
    <div className={classStyle}>
      <video onContextMenu={event => event.preventDefault()} ref={localVideoRef} onCanPlay={handleCanPlayLocal} autoPlay playsInline muted />
    </div>
  )
}