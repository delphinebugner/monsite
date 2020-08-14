import {IImage} from "../interfaces/IImage";

export class AppBackend {

  static cloudinaryControllerEntrypoint :string = "cloud";

  static getUrlServeur() :string {
    return  process.env.REACT_APP_SERVER_BASE_URL ? process.env.REACT_APP_SERVER_BASE_URL : "http://localhost:5000";
  };

  static async testServeur() :Promise<void> {
    const response = await fetch(AppBackend.getUrlServeur());
    console.log("Statut de la connection au serveur : ", response.status) ;
  }

  static async getUrlImage(i :IImage) :Promise<IImage>{
    const response = await fetch(process.env.REACT_APP_SERVER_BASE_URL + "/" + AppBackend.cloudinaryControllerEntrypoint + "/url/" + i.src);
    i.URL = await response.text();
    return i;
  }

}

export default AppBackend;