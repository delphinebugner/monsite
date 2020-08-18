import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {IGalleryElement} from "../interfaces/IGalleryElement";
import AppBackend from "../backend/AppBackend";
import './Gallery.css';
import {srcUrl} from "../interfaces/IImage";

type GalleryProp = {
  elements : IGalleryElement[],
  title : string,
  color: string,
}

function Gallery({title, elements} :GalleryProp){
  const history = useHistory();

  function goTo(path :string) :void {
    history.push(path);
  }

  const [urls, setUrls] =  useState([{src:"", url:""}]);

  const sizeMiniature = 400;

  console.log("elements", elements);

  useEffect( () => {
    async function loadAllImages() {
      const promises = elements.map( async (e) => {
        console.log(e);
        return e.image ? await AppBackend.getUrlResized(e.image.src, sizeMiniature) : {src : "None", url: "NOT_FOUND"} ;
      });
      const listOfUrls = (await Promise.all(promises)).filter( (r :srcUrl) => r.url !== "NOT_FOUND");
      setUrls(listOfUrls);
    }
    loadAllImages();
    }, [elements]
  )

  return <div className={"Gallery"}>
    <span className="Gallery-title">{title}</span>
    {elements.map((element :IGalleryElement) => {
      const margin = 0.5 + Math.random() * 10 ;
      // @ts-ignore
      const urlForSrc = element.image !== undefined ? (urls.find((u :srcUrl) => u.src === element.image.src)) : undefined;
      return <div
        className="Gallery-img-parent"
        key={`parent-${element.id}`}
        style={{
          marginTop: `${margin}em`,
          marginBottom: `${margin}em`, // TODO couleur + direction ombre
        }}
        onClick={() => goTo(element.route)}
      >
        {element.image && urlForSrc ? <img
          className="Gallery-img-child"
          src={urlForSrc.url}
          alt={element.image.src}
          key={element.image.src}
          /> : null}
        <span className={"Gallery-img-title"}>{element.title}</span>
      </div>})}
  </div>;}

export default Gallery;