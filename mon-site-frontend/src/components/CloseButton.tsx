import React from 'react';
import './CloseButton.css';

type CloseButtonProps = {
  onClick: () => void
}

function CloseButton ({onClick} :CloseButtonProps){
  return <div className={"CloseButton"}>
      <span onClick={onClick}>
        ✕
      </span>
  </div>
}

export default CloseButton;