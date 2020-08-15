import React from 'react';
import './Button.css';

type ButtonProp = {
  text: string,
  fontSize: string,
  onClick: () => void,
  visible?: boolean,
  paddingRight?: boolean,
  textShadow? : boolean,
  outlined? : boolean,
  style?: object,
}

function Button({ text, fontSize, onClick, visible=true, paddingRight=true, style={}, textShadow=false, outlined=true} :ButtonProp)
{
  return <button
    className="Button"
    style={{
      visibility : visible ? "visible" : "hidden",
      paddingRight : paddingRight ? "3em" : "0",
      paddingLeft : paddingRight ? "0" : "3em",
      textShadow :  textShadow ? "1px 1px 2px grey" : "none",
      fontSize,
      ...style
    }}
    onClick={(e) => onClick()}>
     {text}
  </button>
}

export default Button;