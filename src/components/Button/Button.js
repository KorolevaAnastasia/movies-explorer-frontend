import React from "react";
import "./Button.css";

function Button (props){
  return (
    <>
      <button
        className={`button ${props.className ? props.className : ''}`}
        type={props.type}
        onClick={props.event}
        disabled={props.disabled}
        aria-label={props.name ? props.name : ''}
      >
        {props.name}
      </button>
    </>
  );
}

export default Button;
