import React, {useEffect, useState} from 'react';
import { IImage } from '../interfaces/IImage';
import AppBackend from "../backend/AppBackend";
import './Focus.css';

type FocusProps = {
  image: IImage,
}

function Focus({ image }: FocusProps){
  const [fullImage, setFullImage] = useState(image);
  useEffect( () => {
    async function loadImage() {
      const fullImage :IImage = await AppBackend.getUrlFullSize(image);
      setFullImage(fullImage);
    }
    loadImage();
  }, [image])
  return <div className={"Focus"}>
    <img src={fullImage.fullSizeURL} alt={image.src} />
    <a href={"/"}>Retour</a>
  </div>
}

export default Focus;