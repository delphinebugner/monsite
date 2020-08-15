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

  static async getUrl(i :IImage, size :number) :Promise<string> {
    let path = process.env.REACT_APP_SERVER_BASE_URL + "/" + AppBackend.cloudinaryControllerEntrypoint + "/url/" + i.src;
    path += size > 0 ? "/" + size : "";
    const response = await fetch(path);
    const url = await response.text();
    const testUrlResponse = await fetch(url);
    return testUrlResponse.status === 200 ? url : "NOT_FOUND";
  }

  static async getUrlFullSize(i :IImage) :Promise<IImage> {
    const fullSizeURL :string = await AppBackend.getUrl(i, -1);
    i = {...i, fullSizeURL};
    return i;
  }

  static async getUrlResized(i :IImage, size :number) :Promise<IImage>{
    const miniatureURL :string = await AppBackend.getUrl(i, size);
    i = {...i, miniatureURL}
    return i;
  }
}

export default AppBackend;