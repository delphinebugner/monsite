import React, {useEffect, useState} from 'react';
import { Transition } from 'react-transition-group';
import Button from "./Button";
import { IImage, srcUrl } from '../interfaces/IImage';
import AppBackend from "../backend/AppBackend";
import './Focus.css';
import {useHistory} from "react-router";

type FocusProps = {
  image: IImage,
  previousId: number,
  nextId: number,
}

function Focus({ image, previousId, nextId }: FocusProps){
  const [srcUrl, setSrcUrl] = useState({src:image.src, url:"NOT_FOUND"});
  const [inImage, setInImage] = useState(false);
  const history = useHistory();

  function goTo(path :string) :void {
    history.push('/' + path);
  }

  useEffect( () => {
    async function loadImage() {
      const u :srcUrl = await AppBackend.getUrlFullSize(image.src);
      setSrcUrl(u);
      setInImage(true);
    }
    loadImage();
  }, [image])

  const duration = 1000;

  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    opacity: 0,
    transform: "translate(0.5em, 0.2em)",
    height: "100vh",
  }

  const transitionStyles = {
    entering: { opacity: 1, transform: "none" },
    entered:  { opacity: 1, transform: "none" },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
    unmounted: { opacity : 0}
  };

  return <div className={"Focus"}>
    <div className={"Focus-leftPanel"}>
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
      <Transition in={inImage} timeout={duration}>
        {state  => (
          <div style={{...defaultStyle, ...transitionStyles[state]}}>
            <img className={"Focus-img"} src={srcUrl.url} alt={image.src} />
          </div>
        )}
      </Transition>
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