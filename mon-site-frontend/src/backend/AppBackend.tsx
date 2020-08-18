class AppBackend {

  static cloudinaryControllerEntrypoint :string = "cloud";

  static getUrlServeur() :string {
    return  process.env.REACT_APP_SERVER_BASE_URL ? process.env.REACT_APP_SERVER_BASE_URL : "http://localhost:5000";
  };

  static async testServeur() :Promise<void> {
    const response = await fetch(AppBackend.getUrlServeur());
    console.log("Statut de la connection au serveur : ", response.status) ;
  }

  static async getUrl(src :string, size :number) :Promise<string> {
    let path = process.env.REACT_APP_SERVER_BASE_URL + "/" + AppBackend.cloudinaryControllerEntrypoint + "/url/" + src;
    path += size > 0 ? "/" + size : "";
    const response = await fetch(path);
    const url = await response.text();
    const testUrlResponse = await fetch(url);
    return testUrlResponse.status === 200 ? url : "NOT_FOUND";
  }

  static async getUrlFullSize(src :string) :Promise<{ src: string, url: string }> {
    const url :string = await AppBackend.getUrl(src, -1);
    return { src, url };
  }

  static async getUrlResized(src :string, size :number) :Promise<{ src: string, url: string }>{
    const url :string = await AppBackend.getUrl(src, size);
    return {src, url};
  }
}

export default AppBackend;