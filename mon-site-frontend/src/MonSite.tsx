import React, {useEffect, useState} from 'react';
import {Switch, Route, useHistory, Redirect} from 'react-router-dom';
import './MonSite.css';
import AppBackend from "./backend/AppBackend";
import Focus from "./focus/Focus";
import jsonConfigImages from './config/images.json';
import {IImage} from "./interfaces/IImage";
import {INavElement} from "./interfaces/INavElement";

function MonSite() {
  const [portfolio, setPortfolio] = useState([]);
  const history = useHistory();

  const MaxImageSize = 400;
  const MinImageSize = 150;

  function go(path :string) :void {
    history.push('/' + path);
  }

  function goToImage(i :IImage) :void {
    history.push(`/${i.id}`);
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

  const navbar = <div className="MonSite-navbar">
    {navbarElements.map((n) => <button className="MonSite-navbarElement" key={n.id} onClick={(e) => go(n.id)} >{n.title}</button>)}
  </div>

  return (
      <div className="MonSite">
        <div className="MonSite-header">
          <div className="MonSite-title">
            <span>Delphine Bugner</span>
            {navbar}
          </div>
        </div>
        <div className="MonSite-body">
          <Switch>
            <Route path={"/gallery"} >
              {portfolio.map((i :IImage) =>
                <div className="App-img-parent" style={{width:i.miniatureSize, height:i.miniatureSize, margin:(MaxImageSize - i.miniatureSize)/4}}  key={`parent-${i.id}`}>
                  <img src={i.miniatureURL} className="App-img-child" alt={i.src} key={i.src} onClick={() => goToImage(i)}/>
                </div>
                )}
            </Route>
            <Route path={"/"} exact>
              <Redirect to={"gallery"} />
            </Route>
            {portfolio.map((i :IImage) => (
              <Route path={`/${i.id}`} key={i.src}>
                <Focus image={i}/>
              </Route>))}
          </Switch>
        </div>
      </div>
  );
}

export default MonSite;
