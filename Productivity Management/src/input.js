import React from "react";
import {useState} from "react"
import styled from "styled-components";

const StyledInput=styled.input`
background-color:transparent;
background:none;
border:none;

`;


export default function Input(props){
    const [text,setText]=useState(props.value);
    // let now = new Date().toISOString().split('T')[0];
    // let nowArr = now.split('-');
    // now = nowArr[1] + '-' + nowArr[2] + '-' +nowArr[0]

    const handleChange = (value) => {
        setText(value)
        props.handleChange(value, props.index)
    };

    return (
    <div>
        {props.first} : 
        <StyledInput 
            type={props.type} 
            onChange={(e)=> handleChange(e.target.value)} 
            value={text} 
            // defaultValue={now}
        />
        {/* <StyledInput_date type='date' onChange={(e)=> handleChange(e.target.value)} value={date}/> */}
    </div>
    )
}