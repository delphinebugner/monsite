import React, { useEffect, useState, useCallback } from 'react';
import Spinner from 'react-spinkit';
import { CSSTransition } from 'react-transition-group';
import { IImage } from '../interfaces/IImage';
import './Focus.css';
import { useHistory } from 'react-router';
import CloseButton from './CloseButton';
import { IGallery } from '../interfaces/IGallery';
import { getUrl } from '../cloudinary/utils';

type FocusProps = {
  image: IImage;
  previousId: number;
  nextId: number;
  gallery: IGallery;
  color: string;
};

function Focus({ image, previousId, nextId, gallery, color }: FocusProps) {
  const [srcUrl, setSrcUrl] = useState({ src: image.src, url: 'NOT_FOUND' });
  const [visibleTextPanel, setVisibleTextPanel] = useState(
    window.innerWidth > 600,
  );
  const [loadingUrl, setLoadingUrl] = useState(true);
  const [loadingImg, setLoadingImg] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function loadUrl() {
      setError(false);
      setLoadingUrl(true);
      setLoadingImg(true);
      try {
        setSrcUrl({ url: getUrl(image.src), src: image.src });
      } catch (err) {
        setError(true);
      }
      setLoadingUrl(false);
    }
    loadUrl();
  }, [image]);

  const onKeyPress = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          history.push(`/gallery-${gallery.id}/focus-${nextId}`);
          break;
        case 'ArrowLeft':
          history.push(`/gallery-${gallery.id}/focus-${previousId}`);
          break;
        case 'Escape':
          history.push(`/gallery-${gallery.id}`);
          break;
        default:
          break;
      }
    },
    [gallery.id, previousId, nextId, history],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress, false);
    return () => {
      document.removeEventListener('keydown', onKeyPress, false);
    };
  }, [gallery.id, onKeyPress]);

  const textPanel = (
    <div
      className={'Focus-textPanel'}
      style={{
        borderColor: color,
        color: color,
        visibility: visibleTextPanel ? 'initial' : 'hidden',
      }}
      onClick={() => setVisibleTextPanel(false)}
    >
      <span style={{ backgroundColor: color }}>{gallery.title}</span>
      <h2>{image.dateLabel}</h2>
      <h1>{image.title}</h1>
      <p>{image.description}</p>
    </div>
  );

  const closeTextPanel = (
    <div
      className={'Focus-openTextPanel'}
      onClick={() => setVisibleTextPanel(true)}
      style={{
        textShadow: `0 1px 2px rgba(0, 0, 0, 0.3), 3px 2px 0 ${color}, 1px 2px 4px rgba(0, 0, 0, 0.3)`,
      }}
    >
      <span>+</span>
    </div>
  );

  const imagePanel = (
    <div className={'Focus-imagePanel'}>
      <CSSTransition
        in={!loadingUrl}
        timeout={750}
        classNames={'Focus-transition-opacity'}
      >
        <img
          className={'Focus-img'}
          src={srcUrl.url}
          alt={image.src}
          onLoad={() => setLoadingImg(false)}
        />
      </CSSTransition>
    </div>
  );

  const loadingPanel = (
    <div className={'Focus-placeholder'}>
      <span>Chargement ...</span>
      <Spinner name="ball-scale-ripple-multiple" color={color} />
    </div>
  );
  const errorPanel = (
    <div className={'Focus-placeholder'}>
      Erreur, impossible de charger l'image.
    </div>
  );

  return (
    <div>
      <div className={'Focus'}>
        {textPanel}
        {closeTextPanel}
        {error && errorPanel}
        {(loadingUrl || loadingImg) && loadingPanel}
        {!error && imagePanel}
        <div
          className={'Focus-prev-next Focus-prev Focus-button'}
          onClick={() =>
            history.push(`/gallery-${gallery.id}/focus-${previousId}`)
          }
          style={{ visibility: previousId > 0 ? 'visible' : 'hidden' }}
        >
          <span>❬</span>
        </div>
        <div
          className={'Focus-prev-next Focus-next Focus-button'}
          onClick={() => history.push(`/gallery-${gallery.id}/focus-${nextId}`)}
          style={{ visibility: nextId > 0 ? 'visible' : 'hidden' }}
        >
          <span>❭</span>
        </div>
      </div>
      <CloseButton onClick={() => history.push(`/gallery-${gallery.id}`)} />
    </div>
  );
}

export default Focus;
