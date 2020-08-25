import React, {useEffect, useState} from 'react';
import { CSSTransition } from 'react-transition-group';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IImage, srcUrl } from '../interfaces/IImage';
import AppBackend from "../backend/AppBackend";
import './Focus.css';
import {useHistory} from "react-router";

type FocusProps = {
  image: IImage,
  previousId: number,
  nextId: number,
  galleryId: string,
  color: string
}

function Focus({ image, previousId, nextId, galleryId, color }: FocusProps){
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

  return <div className={"Focus"}>
    <div className={"Focus-textPanel"} style={{borderColor:color, color:color}}>
      <h2>{image.dateLabel}</h2>
      <h1>{image.title}</h1>
      <p>{image.description}</p>
    </div>
    <div className={"Focus-imagePanel"}>
      <CSSTransition
        in={inImage}
        timeout={300}
        classNames={"Focus-transition-opacity"}
      >
        <img className={"Focus-img"} src={srcUrl.url} alt={image.src} />
      </CSSTransition>
    </div>
    <div className={"Focus-prev-next Focus-button"}>
      <span
        style={{visibility:(previousId > 0 ? "visible" : "hidden")}}
        onClick={() => goTo(`gallery-${galleryId}/focus-${previousId}`)}
      >
        ❬
      </span>
      <span
        style={{visibility:(nextId > 0 ? "visible" : "hidden")}}
        onClick={() => goTo(`gallery-${galleryId}/focus-${nextId}`)}
      >
        ❭
      </span>
    </div>
    <div className={"Focus-close Focus-button"}>
      <span onClick={() => goTo(`gallery-${galleryId}`)}>
        ✕
      </span>
    </div>
  </div>
}

export default Focus;