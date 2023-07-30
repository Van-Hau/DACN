import React, { useEffect } from 'react';
import "./callButton.module.css"

export default function callButton({ disconnect }:any) {

    return (
        <div className="callme" onClick={disconnect}>
            <div className="callmeMain"></div>
        </div>
    )
}