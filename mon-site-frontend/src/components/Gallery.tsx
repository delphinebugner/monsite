import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {IGalleryElement} from "../interfaces/IGalleryElement";
import AppBackend from "../backend/AppBackend";
import './Gallery.css';
import {srcUrl} from "../interfaces/IImage";
import CloseButton from "./CloseButton";

type GalleryProp = {
  elements : IGalleryElement[],
  title : string,
  color: string,
  showClose?:boolean,
  showDates?:boolean
}

function Gallery({title, elements, color, showClose=true, showDates=true} :GalleryProp){
  const history = useHistory();

  function goTo(path :string) :void {
    history.push(path);
  }

  const [urls, setUrls] =  useState([{src:"", url:""}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const sizeMiniature = 400;

  useEffect( () => {
    async function loadAllImages() {
      setError(false);
      setLoading(true);
      try {
        const promises = elements.map(async (e) => {
          return e.image ? await AppBackend.getUrlSquared(e.image.src, sizeMiniature) : {src: "None", url: "NOT_FOUND"};
        });
        const listOfUrls = (await Promise.all(promises)).filter((r: srcUrl) => r.url !== "NOT_FOUND");
        setUrls(listOfUrls);
      }
      catch (err) {
        setError(true);
      }
      setLoading(false);
    }
    loadAllImages();
    }, [elements]
  )

  const galleryTitle = <span
    className="Gallery-title"
    style={{color}}>
      {title}
    </span>;

  const renderGalleryElement = (element :IGalleryElement) => {
    const margin = 0.5 + Math.random() * 10 ;
    // @ts-ignore
    const urlForSrc = element.image !== undefined ? (urls.find((u :srcUrl) => u.src === element.image.src)) : undefined;
    return <div
      className="Gallery-img-parent"
      key={`parent-${element.id}`}
      onClick={() => goTo(element.route)}
      style={{
        marginTop: `${margin}em`,
        marginBottom: `${margin}em`,
        color,}}
    >
      {element.image && urlForSrc ? <img
        className="Gallery-img-child"
        src={urlForSrc.url}
        alt={element.image.src}
        key={element.image.src}
      /> : null}
      <div className={"Gallery-img-title"}>
        {showDates ? <span className={"Gallery-img-date"}>{element.image.dateLabel}</span> : null}
        <p
          className={"Gallery-img-name"}
          style={{
          textShadow: `-1px 0 ${color}, 0 1px 2px rgba(0, 0, 0, 0.3), 3px 1px 0 ${color}`
        }}>{element.title}</p>
      </div>
    </div>
  }

  return <div>
    <div className={"Gallery"}>
      {galleryTitle}
      {loading
        ? <div className={"Gallery-placeholder"}>Chargement en cours...</div>
        : (error
          ? <div className={"Gallery-placeholder"}>Erreur, impossible de charger les images.</div>
          : elements.map(renderGalleryElement))
      }
    </div>
    {showClose ? <CloseButton onClick={() => goTo(`/`)} /> : null}
  </div>
  ;}

export default Gallery;