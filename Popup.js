import React from "react";


export default function Popup(props){
    return(
        props.visible?<div>
            <input type='text' placeholder="New Username" onChange={
                (e)=>props.setSignupId(e.target.value)} value={props.signupId}/>
            <input type='text' placeholder="New Password" onChange={
                (e) =>props.setSignupPassword(e.target.value)} value={props.signupPassword}/>
            <button onClick={(e) => props.handleSignup()}> signup</button>
        </div>
        :<></>
    )
}