import React, {useEffect, useState} from 'react';
import Navbar from './Navbar';
import Button from "./Button";
import { IImage } from '../interfaces/IImage';
import { INavElement } from '../interfaces/INavElement';
import AppBackend from "../backend/AppBackend";
import './Focus.css';
import {useHistory} from "react-router";

type FocusProps = {
  image: IImage,
  previousId: number,
  nextId: number,
}

function Focus({ image, previousId, nextId }: FocusProps){
  const [fullImage, setFullImage] = useState(image);
  const history = useHistory();

  function goTo(path :string) :void {
    history.push('/' + path);
  }

  useEffect( () => {
    async function loadImage() {
      const fullImage :IImage = await AppBackend.getUrlFullSize(image);
      setFullImage(fullImage);
    }
    loadImage();
  }, [image])

  const navbarElements :INavElement[] = [
    { id : "gallery", title : "Retour"},
    { id : "about", title: "A propos"}
  ];

  return <div className={"Focus"}>
    <div className={"Focus-leftPanel"}>
      <Navbar elements={navbarElements} isOnTop={true} />
      <div className={"Focus-text"}>
        <h2>{image.dateLabel}</h2>
        <h1>{image.title}</h1>
        <p>{image.description}</p>
      </div>
      <div className={"Focus-prev-next"}>
        <Button
          text="< Précédent"
          fontSize="0.8em"
          visible={previousId > 0}
          paddingRight={false}
          onClick={() => goTo(`focus-${previousId}`)} />
        <Button
          text="Suivant >"
          fontSize="0.8em"
          visible={nextId > 0}
          onClick={() => goTo(`focus-${nextId}`)}
        />
      </div>
    </div>
    <div className={"Focus-rightPanel"}>
      <img className={"Focus-img"} src={fullImage.fullSizeURL} alt={image.src} />
    </div>
    <div className={"Focus-close"}>
      <Button text={"✕"}
              fontSize={"2em"}
              onClick={() => goTo("")}
              paddingRight={false}
              textShadow={true}
              outlined={false}
              style={{color:"white", border:"none"}}/>
    </div>
  </div>
}

export default Focus;