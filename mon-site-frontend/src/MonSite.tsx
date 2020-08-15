import React, {useEffect, useState} from 'react';
import {Switch, Route, useHistory, Redirect} from 'react-router-dom';
import './MonSite.css';
import AppBackend from "./backend/AppBackend";
import Focus from "./components/Focus";
import Navbar from "./components/Navbar";
import About from "./components/About";
import jsonConfigImages from './config/images.json';
import {IImage} from "./interfaces/IImage";
import {INavElement} from "./interfaces/INavElement";

function MonSite() {
  const [portfolio, setPortfolio] = useState([{src:"sample.jpg", id:19932404, miniatureSize:200}]);
  const history = useHistory();

  const MaxImageSize = 400;
  const MinImageSize = 150;

  function goToImage(i :IImage) :void {
    history.push(`/focus-${i.id}`);
  }

  useEffect(() => {
    AppBackend.testServeur();
  }, [])

  useEffect( () => {
    // tools
    function getYearFromId(id :number) :number {
      return Math.floor(id / 10000 );
    }
    function getDateLabelFromId(id :number) :string {
      const year = getYearFromId(id);
      const month = Math.floor(( id % 10000 ) / 100) - 1 ; // month are from 0 to 11 in DateFormat
      const date = new Date(year, month);
      const s = date.toLocaleDateString('fr', {"year":"numeric", "month":"long"});
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
    // Init portfolio with json and interface
    let jsonPortfolio :IImage[] = jsonConfigImages.map(i => {
      const j :IImage = {src: i.src, id: i.id, title: i.title, description:i.description, tags:i.tags, dateLabel:getDateLabelFromId(i.id), year:getYearFromId(i.id), miniatureSize:200};
      return j;
    })
    // Sort by id
    jsonPortfolio.sort((i :IImage, j:IImage) => j.id - i.id);
    // Get URLs : create an scoped async function in the hook
    async function loadAllImages() {
      const promises = jsonPortfolio.map( async (i) => {
        const size = Math.floor(MinImageSize + Math.random() * (MaxImageSize - MinImageSize)) ;
        i.miniatureSize = size;
        return await AppBackend.getUrlResized(i, size);
        }
      );
      jsonPortfolio = await Promise.all(promises);
      // Only images found
      jsonPortfolio = jsonPortfolio.filter( (i) => i.miniatureURL !== "NOT_FOUND");
      // @ts-ignore
      setPortfolio(jsonPortfolio);
    }
    // Execute the created function directly
    loadAllImages();
    }, []
  )

  const navbarElements :INavElement[] = [
    {id: "gallery", title: "Galerie"},
    {id: "about", title: "A propos"},
    {id:"filter", title: "Filtrer par thème ..."}
    ];

  const routesToEveryImage :object = portfolio.map((image :IImage, k :number) => (
    <Route path={`/focus-${image.id}`} key={image.src}>
      <Focus
        image={image}
        previousId={(k > 0 ? portfolio[k - 1].id : -1)}
        nextId={(k < portfolio.length - 1 ? portfolio[k + 1].id : -1)}
      />
    </Route>));

  const galleryOfMiniatures :object = portfolio.map((image :IImage) => (
    <div
      className="App-img-parent"
      key={`parent-${image.id}`}
      style={{
        width:image.miniatureSize,
        height:image.miniatureSize,
        margin:(MaxImageSize - image.miniatureSize)/4
      }}
    >
      <img src={image.miniatureURL} className="App-img-child" alt={image.src} key={image.src} onClick={() => goToImage(image)}/>
    </div>));

  return (
    <div className="MonSite">
      <Switch>
        <Route path={"/gallery"} >
          <div className="MonSite-header">
            <Navbar elements={navbarElements} isOnTop={false} />
          </div>
          <div className={"MonSite-body"}>
            {galleryOfMiniatures}
          </div>
        </Route>
        <Route path={"/"} exact>
          <Redirect to={"gallery"} />
        </Route>
        <Route path={"/about"}>
          <About />
        </Route>
        {routesToEveryImage}
      </Switch>
    </div>
  );
}

export default MonSite;
