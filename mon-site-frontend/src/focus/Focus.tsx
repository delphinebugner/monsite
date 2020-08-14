import React from 'react';
import { IImage } from '../interfaces/IImage';
import './Focus.css';

type FocusProps = {
  image: IImage,
}

function Focus({ image }: FocusProps){
  return <div className={"Focus"}>
    <img src={image.URL} alt={image.src} />
    <a href={"/"}>Retour</a>
  </div>
}

export default Focus;