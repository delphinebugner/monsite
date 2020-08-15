import React from 'react';
import Button from "./Button";
import {INavElement} from '../interfaces/INavElement';
import './Navbar.css';
import {useHistory} from "react-router";

type NavbarProps = {
  elements : INavElement[],
  isOnTop : boolean,
}

function Navbar({elements, isOnTop} :NavbarProps){

  const history = useHistory();

  function goTo(path :string) :void {
    history.push('/' + path);
  }

  function actionOnClick(n :INavElement) :void {
    switch (n.id){
      case "about":
        goTo("about");
        break;
      case "filter":
        filter();
        break;
      case "gallery":
      default :
        goTo("gallery");
    }
  }

  function filter() :void{
    //TODO
  }

  return <div className="Navbar" style={{position : (isOnTop ? "absolute" : "sticky"), marginTop : (isOnTop ? "0" : "35vh")}}>
      <span style={{fontSize : (isOnTop ? "1em" : "2.5em")}}>Delphine Bugner</span>
      <div className="Navbar-list">
         {elements.map((n) =>
           <Button key={n.id} text={n.title} fontSize={isOnTop ? "1rem" : "1rem"} onClick={() => actionOnClick(n)} visible={true}/>
         )}
      </div>
  </div>

}

export default Navbar ;