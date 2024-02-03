import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import './PendingCover.css'

export default function PendingCover({pending}) {
    return (
        <div className={`loader ${pending ? "" : "hidden"}`}>
            <img src="/public/images/loading.gif" alt="loading gid" />
        </div>
    )
}

