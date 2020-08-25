import React, {useEffect} from 'react';
import {Switch, Route, useHistory } from 'react-router-dom';
import './MonSite.css';
import AppBackend from "./backend/AppBackend";
import ConfigUtils from "./config/ConfigUtils";
import Focus from "./components/Focus";
import Gallery from "./components/Gallery";
import About from "./components/About";
import jsonConfigImages from './config/images.json';
import jsonConfigGalleries from './config/galleries.json';
import {IImage} from "./interfaces/IImage";
import {IGallery} from "./interfaces/IGallery";
import {IGalleryElement} from "./interfaces/IGalleryElement";

function MonSite() {
  const history = useHistory();

  function goTo(path :string) :void {
    history.push(path);
  }

  useEffect(() => {
    AppBackend.testServeur();
  }, [])

  const defaultImage :IImage = {
    id: 19930424,
    title: "Par défaut",
    src: "sample.jpg"
  }

  const colorLandingGallery = "cornflowerblue";
  const titleLandingGallery = "Portfolio";

  // Init portfolio with json and interface
  let jsonPortfolio :IImage[] = jsonConfigImages.map(i => {
    const j :IImage = {
      src: i.src,
      id: i.id,
      title: i.title,
      description: i.description,
      tags: i.tags,
      dateLabel: ConfigUtils.getDateLabelFromId(i.id),
      year: ConfigUtils.getYearFromId(i.id),
    };
    return j;
  })
  jsonPortfolio.sort((i :IImage, j:IImage) => j.id - i.id);

  // Init galleries from json (keep json order)
  const jsonGalleries :IGallery[] = jsonConfigGalleries.map( g => {
    const h :IGallery = {
      id: g.id ? g.id : "notfound",
      color: g.color ? g.color : "cornflowerblue",
      miniature: g.miniature ? g.miniature : "notfound",
      title: g.title ? g.title : "notfound"
    };
    return h;
  });

  // Compute elements for individual galleries
  function galleryOfImages(g :IGallery) :IGalleryElement[]{
    return jsonPortfolio
      .filter(image => (image.tags && image.tags.includes(g.id)) || g.id === "all")
      .map(image => {
        const element :IGalleryElement = {
          id: 'element-' + image.id,
          title: image.title,
          route: '/gallery-' + g.id + '/focus-' + image.id,
          image: image
        };
        return element;
    })
  }

  // Compute elements for global gallery of galleries
  const galleryOfGalleries :IGalleryElement[] = jsonGalleries.map(gallery => {
      const image = jsonPortfolio.find(image => image.src === gallery.miniature);
      const galleryElement :IGalleryElement = {
        id: gallery.id,
        title: gallery.title,
        route: '/gallery-' + gallery.id,
        image: image ? image : defaultImage,
      }
      return galleryElement;
  });

  // Map over one gallery to have the routes to images
  const routesToEveryImageOfGallery = (gallery :IGallery) => {
    return galleryOfImages(gallery).map((galleryElement :IGalleryElement, k :number, array:IGalleryElement[]) => (
      <Route path={galleryElement.route} key={galleryElement.image.src}>
        <Focus
          image={galleryElement.image}
          previousId={(k > 0 ? array[k - 1].image.id : -1)}
          nextId={(k < array.length - 1 ? array[k + 1].image.id : -1)}
          galleryId={gallery.id}
          color={gallery.color}
        />
      </Route>));
  };

  // @ts-ignore
  const routesToEveryImage = jsonGalleries.reduce((routes, g) => [...routes, ...routesToEveryImageOfGallery(g)], []);

  // Map over jsonGalleries to have the routes to galleries
  const routesToEveryGallery = jsonGalleries.map(g =>
    <Route path={`/gallery-${g.id}`} key={g.id} exact>
      <Gallery
        title={g.title}
        elements={galleryOfImages(g)}
        color={g.color}
        fontSizeTitle={"8vw"}
        fontSizeImage={"2.5vw"}
      />
    </Route>
  )

  return (
    <div className="MonSite">
      <div className="MonSite-header">
        <span className="MonSite-Delphine" onClick={(e) => goTo("/")}>DelphineBugner</span>
        <span onClick={(e) => goTo("/About")}>A propos</span>
      </div>
      <Switch>
        <Route path={"/"} exact >
          <Gallery elements={galleryOfGalleries} title={titleLandingGallery} color={colorLandingGallery} showClose={false} showDates={false}/>
        </Route>
        <Route path={"/about"}>
          <About />
        </Route>
        {routesToEveryGallery}
        {routesToEveryImage}
      </Switch>
      <div className={"MonSite-footer"}>
        <span>Design dbugner - Eté 2020</span>
      </div>
    </div>
  );
}

export default MonSite;
