import React, {useEffect, useState} from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import './MonSite.css';
import AppBackend from "./backend/AppBackend";
import Focus from "./focus/Focus";
import jsonConfigImages from './config/images.json';
import {IImage} from "./interfaces/IImage";

function MonSite() {
  const [portfolio, setPortfolio] = useState([]);
  const history = useHistory();
  console.log("history", history);
  const goToFocus = (i :IImage) => {
    history.push(`/${i.id}`);
  };

  useEffect(() => {
    AppBackend.testServeur();
  })

  useEffect( () => {
    // Init portfolio with json and interface
    let jsonPortfolio :IImage[] = jsonConfigImages.map(i => {
      const j :IImage = {src: i.src, id: i.id};
      return j;
    })
    // Sort by id
    jsonPortfolio.sort((i :IImage, j:IImage) => j.id - i.id);
    // Create an scoped async function in the hook
    async function loadAllImages() {
      const promises = jsonPortfolio.map( async (i) => await AppBackend.getUrlImage(i) );
      jsonPortfolio = await Promise.all(promises);
      console.log(jsonPortfolio);
      // @ts-ignore
      setPortfolio(jsonPortfolio);
    }
    // Execute the created function directly
    loadAllImages();
    }, []
  )

  return (
      <div className="App">
        <h1 className="App-header">
          Delphine Bugner
        </h1>
        <div className="App-body">
          <Switch>
            <Route path={"/"} exact>
              {portfolio.map((i :IImage) =>
                <div className="App-img-parent">
                  <img src={i.URL} className="App-img-child" alt={i.src} key={i.src} onClick={() => goToFocus(i)}/>
                </div>
                )}
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
