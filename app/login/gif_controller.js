'use client'
import React, { useRef, useEffect, useState } from 'react';



const VideoPlayer = ({ src, rev_src, play}) => {
    const forwardVid = useRef(null);
    const backwardVid = useRef(null);

    useEffect(() => {
        if(play === null) return;
        if(forwardVid.current || backwardVid.current){
            backwardVid.current.style.display = "none";
            forwardVid.current.style.display = "none";
        }
        if(play){
            backwardVid.current.style.display = "none"
            forwardVid.current.style.display = "block"
            forwardVid.current.play();
        }else{
            forwardVid.current.style.display = "none"
            backwardVid.current.style.display = "block"
            backwardVid.current.play();
        }
    }, [play])
    return (
        <div>
            <video ref={forwardVid} loop={false} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'none'}} src={src} muted />
            <video ref={backwardVid} loop={false} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'none'}} src={rev_src} muted />
        </div>
    );
};

export default VideoPlayer;