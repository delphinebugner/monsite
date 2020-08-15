import React, {useEffect, useState} from 'react';
import Navbar from './Navbar';
import AppBackend from "../backend/AppBackend";
import {INavElement} from "../interfaces/INavElement";
import {IImage} from "../interfaces/IImage";
import about from "../config/about.json";
import './About.css';

function About() {
  const navbarElements :INavElement[] = [
    { id : "gallery", title : "Retour"}
  ];

  const [image, setImage] = useState<IImage>({src:about.photo.src, id:about.photo.id, miniatureSize:200});

  useEffect( () => {
    async function loadImage() {
      const newImage :IImage = await AppBackend.getUrlResized(image, 300);
      // @ts-ignore
      setImage(newImage);
    }
    loadImage();
  }, [image])

  return <div className="About">
    <Navbar elements={navbarElements} isOnTop={true} />
    <div className={"About-content"}>
      <h5>A propos</h5>
      <div className={"About-img"}>
        <img alt={about.photo.src} src={image.miniatureURL}/>
        <div className={"About-shadow"}></div>
      </div>
      <p>{about.bio}</p>
      <p className="About-contact">{about.contact}</p>
    </div>
  </div>
}

export default About;