import React from 'react';
import "./Tooltip.css";

function Tooltip({type, message}) {
  return (
    <span className={`tooltip tooltip__${type}_active`}>{message}</span>
  )
}

export default Tooltip;
