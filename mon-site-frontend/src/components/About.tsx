import React, {useEffect, useState} from 'react';
import AppBackend from "../backend/AppBackend";
import about from "../config/about.json";
import './About.css';

function About() {

  const defaultImage :string = "BUGNER_Delphine.jpg";

  const [url, setUrl] = useState("NOT_FOUND");

  useEffect( () => {
    async function loadImage() {
      const loadUrl : { src:string, url: string } = await AppBackend.getUrlResized(about.photo.src ? about.photo.src : defaultImage, 300);
      setUrl(loadUrl.url);
    }
    loadImage();
  }, [])

  return <div className="About">
    <div className={"About-content"}>
      <h5>A propos</h5>
      <div className={"About-img"}>
        <img alt={about.photo.src} src={url}/>
        <div className={"About-shadow"} />
      </div>
      <p>{about.bio}</p>
      <p className="About-contact">{about.contact}</p>
    </div>
  </div>
}

export default About;