import React, { useEffect, useState } from 'react';
import Spinner from 'react-spinkit';
import { useHistory } from 'react-router-dom';
import { IGalleryElement } from '../interfaces/IGalleryElement';
import AppBackend from '../backend/AppBackend';
import './Gallery.css';
import { srcUrl } from '../interfaces/IImage';
import CloseButton from './CloseButton';

type GalleryProp = {
  elements: IGalleryElement[];
  title: string;
  color: string;
  showClose?: boolean;
  showDates?: boolean;
};

function Gallery({
  title,
  elements,
  color,
  showClose = true,
  showDates = true,
}: GalleryProp) {
  const history = useHistory();

  function goTo(path: string): void {
    history.push(path);
  }

  const [urls, setUrls] = useState([{ src: '', url: '' }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const sizeMiniature = 400;

  useEffect(() => {
    async function loadAllImages() {
      setError(false);
      setLoading(true);
      try {
        const promises = elements.map(async e => {
          return e.image
            ? await AppBackend.getUrlSquared(e.image.src, sizeMiniature)
            : { src: 'None', url: 'NOT_FOUND' };
        });
        const listOfUrls = (await Promise.all(promises)).filter(
          (r: srcUrl) => r.url !== 'NOT_FOUND',
        );
        setUrls(listOfUrls);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    }
    loadAllImages();
  }, [elements]);

  const galleryTitle = (
    <span className="Gallery-title" style={{ color }}>
      {title}
    </span>
  );

  const renderGalleryElement = (element: IGalleryElement) => {
    // @ts-ignore
    const urlForSrc =
      element.image !== undefined
        ? urls.find((u: srcUrl) => u.src === element.image.src)
        : undefined;
    return (
      <div
        className="Gallery-img-parent"
        key={`parent-${element.id}`}
        onClick={() => goTo(element.route)}
        style={{
          marginTop: `em`,
          marginBottom: `3em`,
          color,
        }}
      >
        {showDates && (
          <div className={'Gallery-img-date'}>
            <span className={'Gallery-img-date-in'}>
              {element.image.dateLabel}
            </span>
          </div>
        )}
        {element.image && urlForSrc && (
          <img
            className="Gallery-img-child"
            src={urlForSrc.url}
            alt={element.image.src}
            key={element.image.src}
          />
        )}
        <span
          className={'Gallery-img-name'}
          style={{
            color,
          }}
        >
          {element.title}
        </span>
      </div>
    );
  };

  const loadingGallery = (
    <div className={'Gallery-placeholder'}>
      <Spinner name="ball-grid-pulse" color={color} />
      <span>Chargement en cours...</span>
    </div>
  );

  const errorGallery = (
    <div className={'Gallery-placeholder'}>
      Erreur, impossible de charger les images.
    </div>
  );

  return (
    <div>
      <div className={'Gallery'}>
        {galleryTitle}
        {loading && loadingGallery}
        {error && errorGallery}
        {!error && !loading ? elements.map(renderGalleryElement) : null}
      </div>
      {showClose ? <CloseButton onClick={() => goTo(`/`)} /> : null}
    </div>
  );
}

export default Gallery;
