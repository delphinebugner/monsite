import React, { useEffect, useState } from 'react';
import AppBackend from '../backend/AppBackend';
import about from '../config/about.json';
import { useHistory } from 'react-router';
import './About.css';
import CloseButton from './CloseButton';

function About() {
  const history = useHistory();

  const defaultImage: string = 'BUGNER_Delphine.jpg';

  const [url, setUrl] = useState('NOT_FOUND');

  useEffect(() => {
    async function loadImage() {
      const loadUrl: {
        src: string;
        url: string;
      } = await AppBackend.getUrlSquared(
        about.photo.src ? about.photo.src : defaultImage,
        300,
      );
      setUrl(loadUrl.url);
    }
    loadImage();
  }, []);

  return (
    <div>
      <div className="About">
        <div className={'About-content'}>
          <h3>A propos</h3>
          <div className={'About-img'}>
            <img alt={about.photo.src} src={url} />
            <div className={'About-shadow'} />
          </div>
          <p>{about.bio}</p>
          <p className="About-contact">{about.contact}</p>
        </div>
      </div>
      <CloseButton
        onClick={() => {
          history.push(`/`);
        }}
      />
    </div>
  );
}

export default About;
